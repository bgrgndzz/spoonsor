// require modules
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const expressBrute = require('express-brute');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const socketio = require('socket.io');
const morgan = require('morgan');

// require files
const logger = require('./utils/logger');

// dotenv config
dotenv.config(path.join(__dirname, '.env'));

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
const store = new expressBrute.MemoryStore();
const bruteforce = new expressBrute(store);
app.use(bruteforce.prevent);
app.use(helmet());

// listen to connections
const server = app.listen(PORT);

// setup socket.io
const io = socketio.listen(server);