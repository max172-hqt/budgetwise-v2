<?php

namespace App\Http\Controllers\BudgetWise;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    public function store(Request $request)
    {
        $attributes = $request->validate([
            'name' => ['required', 'max:50'],
            'amount' => ['required', 'decimal:0,2', 'numeric', 'between:1,10000'],
            'category' => ['required', 'in:transportation,food,accomodation,miscellaneous'],
        ]);

        Transaction::create([...$attributes, 'user_id' => auth()->id(), 'trip_id' => $request->tripId]);
        $request->session()->flash('message', $attributes['name'] . ' is created successfully.');

        return to_route('trip.show', ['id' => $request->tripId]);
    }
}
