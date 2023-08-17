<p align="center">
  Budget Wise (v2) is a PHP/Laravel application that provides an easy way to manage trips, 
  track expenses and provide suggestions on settling up debts among members in the trip.
</p>

## Introduction

This application is built with Laravel framework. This is an improvement version from [v1](https://github.com/max172-hqt/budgetwise) which is built from
scratch with with Composer autoload features, DI container and various PHP packages.

View [DEMO](https://budgetwisev2-ea97746c1dac.herokuapp.com/).

## Screenshots

## Features

- Authentication with sessions
- A user can add trips and invite other users to the trips
- A user can log transactions to a trip
- Users can see the trip expense summary via visual graphs and how to settly debts with other members in the trip

## Installation

```
composer install

# Migrate and seed database
php artisan migrate --seed

# Run local server
php artisan serve
```

## Database Design

### Tables

- users: User information and credentials, used for authentication
  - name
  - email
  - password
- trips: Trip expenses
  - name
  - slug
- transaction
  - name
  - amount
  - currency

### Table Relationships

- One user can belong to many trips
- One user can create many trip
- One trip can have many users (members)
- One trip can have many transactions
- One transaction belongs to one user

## TODO

- PUT - Invite members to existing trips
- DELETE - Delete trips
- DELETE / PUT - User can update / delete own transactions

## License

MIT
