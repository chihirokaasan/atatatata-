<html>
<head>
  <title>App Name - @yield('title')</title>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, viewport-fit=cover">
  <meta name="robots" content="noindex,nofollow">
  <script src="https://cdn.tailwindcss.com"></script>
  @vite(['resources/js/app.js'])
  <meta name="csrf-token" content="{{ csrf_token() }}">

</head>
<body class="h-screen overflow-hidden flex justify-center">
<div class="w-full h-screen">
  <!-- Chatting -->
  @yield('content')
</div>
</body>
</html>
