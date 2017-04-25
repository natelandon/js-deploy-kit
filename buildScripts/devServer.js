/* eslint-disable no-unused-vars */
/** Note this file was designed for front end loading
/* to a server side application file and load express there */
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import open from 'open';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import moment from 'moment';//import routes
import moviesRoute from '../src/server/routes/movie';
import errorHandler from '../src/server/routes/utils/errorHandler'
//import other libs
import {default as log} from '../src/server/core/logger';
//Add logger info
let logger = new log();
// sets config options on winston
logger.cfg({consoleLevel: 'debug',fileLevel: 'error'});

//Import Web Pack Here
import webpack from 'webpack';
import config from '../webpack.config.dev';

//Database
import {default as Database} from  "../src/server/data/db";

//Database Connection go here
Database.connect().then(() => {
logger.log("Database is connected")
}).catch((error)=>{
  logger.log(error, 'error')
});

//Constants go Here
const port = 3000;
const app = express(() => {
logger.log("Database is connected")
});

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(methodOverride())

app.use(logger.dev);

//Configure ejs vies
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../src/server/views/')); //set as default path for views
app.set("view options", { layout: false });

//Set Up app folders
app.use('/css', express.static('src/client/public/styles'));
app.use('/app', express.static('src/client/app'));

//Get complier for webpack-dev-middleware
const compiler = webpack(config);
//pass complier to
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

/** Mount Api's Here */
//mount movie api module here
app.use('/movies', moviesRoute);

//cause error to occur
app.use('/errortest', function (req, res, next) {
let err = {message: 'Test route is Testing Error Route', status: 509, stack: [{message: 'An error test', status: 505}, {message: 'From the Movie test error page',status: 501}]}
  next(err)
});

// dev error handler catch all
app.use(function (err, req, res, next) {
  res.status(err['status'] || 500);
  if (err.message) {
    logger.log(err.message,'error');
    res.render('pages/error', {
    message: err.message,
    error: err,
    stack: err.stack

  });
}
else {
  logger.log(err,'error');
  res.render('pages/error', {
  message: err,
  error: err
});
}

})

app.listen(port, function(err) {
  if (err) {
    logger.log(err,'error');
  } else {
    open('http://localhost:' + port);
  }
});
