const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = app.listen(process.env.PORT || 8080, () => {
  console.log(`Listening on ${server.address().port}`)
});
const io = require('socket.io').listen(server);
const routes = require('./app/routes/routes')(io);
var socket = require('./app/sockets.js')(io);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);
app.use('/webpages', express.static(path.join(__dirname, '/app/webpages')));
app.use('/public', express.static(path.join(__dirname, '/app/public')));
app.use(express.static(path.join(__dirname, '/app/public')));

app.get('/', (req, res) => {
  res.send(path.join(__dirname, '/app/public/index.html'));
});
