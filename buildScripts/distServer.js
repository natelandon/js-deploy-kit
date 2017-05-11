/** This is disables error in eslint for the next parameter in the error route below */
/* eslint-disable no-unused-vars */

import express from 'express';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

//import other routes
import moviesRoute from '../src/server/routes/movie';
import {default as log} from '../src/server/core/logger';
const pid =process.pid;
//Add logger info
let logger = new log();

// sets config options on winston
logger.cfg({consoleLevel: 'debug',fileLevel: 'error'});

// Import Database Connection here
import {default as Database} from  "../src/server/data/db";

//Database Connection go here
Database.connect('mongodb://api:!AgileRules4#@ds062059.mlab.com:62059/mic-pro').then(() => {
logger.log(`Database is connected using the worker is ${pid}`)
}).catch((error)=>{
  logger.log(error, 'error')
});

// use process.env.PORT to set port when in production
const port = (process.env.PORT || 3000);
const app = express();
logger.log(module,'error');
app.use(compression());

//Set Up app folders
app.use(express.static('dist'));
app.use('/app', express.static('./src/client/app'));

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(methodOverride())

app.use(logger.dev);

//Configure ejs vies
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../src/server/views/'));

 /** Mount Routes Here */
//mount movie store module here
app.use('/movies', moviesRoute);

//cause error to occur
app.use('/errortest', function (req, res, next) {
let err = {message: 'Test route is Testing Error Route', status: 509, stack: [{message: 'An error test', status: 505}, {message: 'From the Movie test error page',status: 501}]}
  next(err)
});


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  logger.log(err ,'error');
  res.status(err['status'] || 500);
  res.render('pages/error.ejs', {
    message: err.message,
    error: {}
  });
  })

app.listen(port, function(err) {
  logger.log(`application started on Port:${port}` ,'info');
  if (err) {
    logger.log(err);
  }
});


