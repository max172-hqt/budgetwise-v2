<?php

namespace App\Http\Controllers\BudgetWise;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class TripsController extends Controller
{
    public function index(): Response
    {
        $trips = Trip::withCount('members')
            ->withSum('transactions', 'amount')
            ->get();

        return Inertia::render('Trips/Trips', [
            'trips' => $trips->map(fn ($trip) => $this->mapTrip($trip))
        ]);
    }

    public function show(int $id): Response
    {
        $trip = Trip::with('members')
            ->withSum('transactions', 'amount')
            ->findOrFail($id);

        return Inertia::render('Trips/TripDetail', [
            'trip' => $this->mapTrip($trip),
            'transactions' => $trip->transactions()->paginate(6)->onEachSide(2),
            'transactionsByCategory' => $trip->getAmountByCategory(),
            'debtTable' => $trip->resolvedTable(),
            'balanceTable' => $trip->getBudgetTable(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Trips/CreateTrip');
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required', 'max:50'],
            'description' => ['required', 'max:255'],
            'members' => ['array']
        ]);

        $trip = Trip::create([
            'name' => $request->name,
            'slug' => str_slug($request->name),
            'description' => $request->description,
            'user_id' => auth()->id(),
        ]);

        $trip->members()->sync($request->members);

        return to_route('trip.show', ['id' => $trip->id]);
    }

    private function mapTrip($trip)
    {
        return [
            'id' => $trip->id,
            'name' => $trip->name,
            'slug' => $trip->slug,
            'userId' => $trip->user_id,
            'memberCount' => $trip->members_count,
            'totalExpenses' => money($trip->transactions_sum_amount),
            'description' => $trip->description,
            'members' => $trip->members,
            'contribution' => $trip->getContributionAmount(),
        ];
    }
}
