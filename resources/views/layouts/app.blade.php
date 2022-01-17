<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Forum front-end with React JS"
    />
    <title>Forum React</title>
    <meta name="csrf-token" value="{{ csrf_token() }}" />
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="{{ mix('js/app.js') }}" type="text/javascript"></script>
  </body>
</html>