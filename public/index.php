<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Quiz Builder</title>
  <?php wp_head(); ?>
  <link rel="stylesheet" href="/bundle.css" />
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

</head>
<body>
  <div id="root"></div>
  <script type="text/javascript">
    window.quiz_url = "http://local.2020.com/sodtheme/wp-json/magic-quiz/v1/";
    window.quiz_id = 3;
  </script>
  <script src="/bundle.js"></script>
</body>
include( ABSPATH . 'wp-admin/admin-footer.php' );