const express = require('express');
const ejs = require('ejs');
const routes = require('./routes.js');
const socket = require('socket.io');

const app = express();

app.use(express.static('src/public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

const server = app.listen(process.env.port || 8080, function() {
  console.log('Listening to port ' + server.address().port);
});

const io = socket(server);
app.set('socket.io', io);

routes(app);
