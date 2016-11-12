export default (req, res) => res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>TodoList with relay</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
      <style>
        html, body, #container {
          width: 100%;
          min-height: 100%;
          height: auto;
          background-color: #EEE;
        }
      </style>
    </head>
    <body>
      <div id="container"></div>
      <script src="bundle.js"></script>
    </body>
  </html>
`)
