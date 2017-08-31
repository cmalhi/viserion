const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const server = app.listen(process.env.PORT || 8080, () => console.log(`Listening on ${process.env.PORT}`));
const io = require('socket.io').listen(server);
const routes = require('./app/routes/routes')(io);

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

// app.listen(process.env.PORT || 8080, function() {
//   console.log('Express server is up and running!');
// });