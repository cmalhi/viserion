const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var items = require('./config/database.js');
var routes = require('./app/routes/routes');

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

app.listen(8080, () => {
  console.log('listening on port 8080!');
});