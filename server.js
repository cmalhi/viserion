const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./app/routes/routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);
app.use('/pages/templates', express.static('./app/pages/templates'));
app.use('/file-templates', express.static('./app/pages/files'));

app.get('/', (req, res) => {
  res.send('Connected!');
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Express server is up and running!');
});