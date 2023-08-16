<?php

namespace App\Models;

use Cknow\Money\Money;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Trip extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['admin'];

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function getContributionAmount(): Money
    {
        $total = money($this->transactions()->sum('amount'));
        return $total->divide($this->members()->count());
    }

    public function getAmountByCategory()
    {
        $res = $this->transactions()
            ->select('category', DB::raw('sum(amount) as amount'))
            ->groupBy('category')->get();
        return $res;
    }

    /**
     * @return array
     */
    public function getBudgetTable()
    {
        $contributionAmount = $this->getContributionAmount();

        $users = User::join('trip_user', 'users.id', '=', 'trip_user.user_id')
            ->leftJoin(
                'transactions',
                fn ($join) =>
                $join
                    ->on('transactions.user_id', '=', 'users.id')
                    ->on('trip_user.trip_id', '=', 'transactions.trip_id')
            )
            ->select("users.id", 'users.name', 'users.email', DB::raw('sum(transactions.amount) as amount'))
            ->where('trip_user.trip_id', '=', $this->id)
            ->groupBy('users.id')
            ->get();

        foreach ($users as $user) {
            $user->amount = money($user->amount)->subtract($contributionAmount);
        }

        return $users->toArray();
    }

    public function resolvedTable(): array
    {
        $table = $this->getBudgetTable();

        // Sort by the 'own' property, those who owe most will come first
        usort($table, function ($a, $b) {
            return $a['amount']->compare($b['amount']);
        });

        $start = 0;
        $end = count($table) - 1;

        $resolveTable = [];

        while ($start < $end) {
            $owe = $table[$start]['amount'];
            $own = $table[$end]['amount'];

            $oweAbs = $owe->absolute();
            $ownAbs = $own->absolute();

            if ($oweAbs->isZero()) {
                $start++;
            } else if ($ownAbs->isZero()) {
                $end--;
            } else {
                $amount = Money::min($oweAbs, $ownAbs);

                $table[$start]['amount'] = $table[$start]['amount']->add($amount);
                $table[$end]['amount'] = $table[$end]['amount']->subtract($amount);

                $resolveTable[$table[$start]['id']]['debts'][] = [
                    ...$table[$end],
                    'amount' => $amount,
                    'isDebt' => true
                ];

                $resolveTable[$table[$end]['id']]['debts'][] = [
                    ...$table[$start],
                    'amount' => $amount,
                    'isDebt' => false
                ];

                if ($table[$start]['amount']->isZero() || $table[$start]['amount']->isPositive()) {
                    $start++;
                }

                if ($table[$end]['amount']->isZero() || $table[$end]['amount']->isNegative()) {
                    $end--;
                }
            }
        }

        return $resolveTable;
    }
}
