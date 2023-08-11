<?php

namespace App\Http\Controllers\BudgetWise;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Inertia\Inertia;

class TripsController extends Controller
{
    public function index()
    {
        $trips = Trip::withCount('members')->get();

        return Inertia::render('Trips/Trips', [
            'trips' => $trips
        ]);
    }

    public function show(Trip $trip)
    {
        return Inertia::render('Trips/TripDetail', [
            'trip' => $trip
        ]);
    }
}
