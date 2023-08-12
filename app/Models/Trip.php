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

    /**
     * @return array
     */
    public function getBudgetTable(): array
    {
        $contributionAmount = $this->getContributionAmount();

        $groupedTransactions = $this->transactions()
            ->select("user_id", DB::raw('sum(amount) as amount'))
            ->groupBy('user_id')->get();

        $table = [];

        foreach ($groupedTransactions as $key => $value) {
            $value->amount = $value->amount->subtract($contributionAmount);
            $table[$key] = [...$value->toArray(), 'amount' => $value->amount];
        }

        dd($table);

        return $table;
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

                $resolveTable[$table[$start]['user_id']]['debts'][] = [
                    'user_id' => $table[$end]['user_id'],
                    'amount' => $amount,
                    'payee' => $table[$end]['payer']
                ];

                $resolveTable[$table[$start]['user_id']]['payer'] = $table[$start]['payer'];

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
