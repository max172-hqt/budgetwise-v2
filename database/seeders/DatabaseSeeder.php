<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Transaction;
use App\Models\Trip;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Huy Tran',
            'email' => 'huytran172@gmail.com',
            'password' => '123456aA'
        ]);

        $users = User::factory(3)->create();

        $trips = Trip::factory(5)
            ->create([
                'user_id' => $user
            ]);


        foreach ($trips as $trip) {
            $trip->members()->attach($user);
            $trip->members()->syncWithoutDetaching($users);
        }

        Transaction::factory(2)->create([
            'user_id' => $user,
            'trip_id' => $trips[0]
        ]);

        foreach ($users as $user) {
            Transaction::factory(2)->create([
                'user_id' => $user,
                'trip_id' => $trips[0]
            ]);
        }
    }
}
