// require modules
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const expressBrute = require('express-brute');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const socketio = require('socket.io');

// dotenv config
dotenv.config(path.join(__dirname, '.env'));

// require utils
const logger = require('./utils/logger');
// require routes
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const appRoute = require('./routes/app');

// constants
const {
  MONGO_URI,
  PORT,
  SESSION_SECRET
} = process.env;

// mongoose connection
mongoose.connect(MONGO_URI, {useNewUrlParser: true});

// express setup
const app = express();
app.set('trust proxy', 1);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {secure: true}
}));

// logging
app.use(morgan('combined', {'stream': logger.stream}));

// security
// const store = new expressBrute.MemoryStore();
// const bruteforce = new expressBrute(store);
// app.use(bruteforce.prevent);
app.use(helmet());

// routing
app.use('/', indexRoute);
app.use('/auth/', authRoute);
app.use('/app/', appRoute);

// listen to connections
const server = app.listen(PORT);

// setup socket.io
const io = socketio.listen(server);