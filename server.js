const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var items = require('./config/database.js');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Connected!');
});

app.get('/items', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(8080, () => {
  console.log('listening on port 8080!');
});