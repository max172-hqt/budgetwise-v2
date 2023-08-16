<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BudgetWise\TransactionsController;
use App\Http\Controllers\BudgetWise\TripsController;
use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get(
    '/trips',
    [TripsController::class, 'index']
)->middleware(['auth', 'verified'])->name('trips');

Route::get(
    '/trips/create',
    [TripsController::class, 'create']
)->middleware(['auth', 'verified'])->name('trip.create');

Route::post(
    '/trips/',
    [TripsController::class, 'store']
)->middleware(['auth', 'verified'])->name('trip.store');

Route::get(
    '/trips/{id}',
    [TripsController::class, 'show']
)->middleware(['auth', 'verified'])->name('trip.show');

Route::post(
    '/transactions',
    [TransactionsController::class, 'store']
)->middleware(['auth', 'verified'])->name('transaction.store');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->get('/users', function () {
    if (request('search')) {
        $users = User::latest()->filter(
            request(['search'])
        )->paginate(5);
    } else {
        $users = [];
    }
    return $users;
})->name('users');

require __DIR__ . '/auth.php';
