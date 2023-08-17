<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@huytran172" />
        <meta name="twitter:creator" content="@huytran172" />
        <meta name="twitter:title" content="Budget Wise" />
        <meta name="twitter:description" content="An easy way to manage trips, track and settle up expenses among members in the trip." />
        <meta name="twitter:image:src" content="{{URL::asset('/images/app-interface.png')}}" />
        <meta name="twitter:image:alt" content="Beautiful user interface of the site" />
    
        <meta property="og:url" content="https://budgetwisev2-ea97746c1dac.herokuapp.com" />
        <meta property="og:site_name" content="Budget Wise" />
        <meta property="og:title" content="Budget Wise" />
        <meta property="og:description" content="An easy way to manage trips, track and settle up expenses among members in the trip." />
        <meta property="og:image" content="{{URL::asset('/images/app-interface.png')}}" />
        <meta property="og:image:alt" content="Beautiful user interface of the site" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
