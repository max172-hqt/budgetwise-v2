<?php

namespace App\Http\Controllers\BudgetWise;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TripsController extends Controller
{
    public function index() {
        return Inertia::render('Trips');
    }
}
