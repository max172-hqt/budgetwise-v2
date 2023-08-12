<?php

namespace App\Http\Controllers\BudgetWise;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Inertia\Inertia;
use Inertia\Response;

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

        $table = $trip->resolvedTable();

        return Inertia::render('Trips/TripDetail', [
            'trip' => $this->mapTrip($trip),
            'transactions' => $trip->transactions,
            'table' => $table
        ]);
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
        ];
    }
}
