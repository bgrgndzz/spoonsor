// require modules
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const expressBrute = require('express-brute');
const expressSession = require('express-session');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const socketio = require('socket.io');

// dotenv config
dotenv.config(path.join(__dirname, '.env'));

// require utils
const logger = require('./utils/logger');

// require routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const appRoute = require('./routes/app');

// require sockets
const sockets = require('./sockets/sockets');

// constants
const {
  MONGO_URI,
  PORT,
  SESSION_SECRET
} = process.env;

// mongoose connection
mongoose.connect(MONGO_URI, {useNewUrlParser: true});

// server setup
const app = express();
const server = http.Server(app);
const io = socketio(server);

// app.set('trust proxy', 1);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const session = expressSession({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
});
app.use(session);
app.use((req, res, next) => {
  req.io = io;
  next();
})

// logging
app.use(morgan('combined', {'stream': logger.stream}));

// security
// const store = new expressBrute.MemoryStore();
// const bruteforce = new expressBrute(store);
// app.use(bruteforce.prevent);
// app.use(helmet());

// routing
app.use('/auth', authRoute);
app.use('/app', appRoute);
app.use('/', indexRoute);

// setup socket.io
sockets(io, session);

// listen to connections
server.listen(PORT);