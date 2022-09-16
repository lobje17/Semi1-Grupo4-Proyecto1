const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

//settings
app.set('port', process.env.PORT || 3005);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '100mb' }))
//app.use(express.urlencoded({limit: '100mb'}));

//routes
app.use(require('./routes/crear'));

module.exports = app;