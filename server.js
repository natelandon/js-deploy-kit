/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _compression = __webpack_require__(3);

	var _compression2 = _interopRequireDefault(_compression);

	var _cookieParser = __webpack_require__(4);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _bodyParser = __webpack_require__(5);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _methodOverride = __webpack_require__(6);

	var _methodOverride2 = _interopRequireDefault(_methodOverride);

	var _movie = __webpack_require__(7);

	var _movie2 = _interopRequireDefault(_movie);

	var _logger = __webpack_require__(10);

	var _logger2 = _interopRequireDefault(_logger);

	var _db = __webpack_require__(9);

	var _db2 = _interopRequireDefault(_db);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//Add logger info


	//import other routes
	/** This is disables error in eslint for the next parameter in the error route below */
	/* eslint-disable no-unused-vars */

	var logger = new _logger2.default();

	// sets config options on winston
	logger.cfg({ consoleLevel: 'debug', fileLevel: 'error' });

	// Import Database Connection here


	//Database Connection go here
	_db2.default.connect('mongodb://api:!AgileRules4#@ds062059.mlab.com:62059/mic-pro').then(function () {
	  logger.log("Database is connected");
	}).catch(function (error) {
	  logger.log(error, 'error');
	});

	// use process.env.PORT to set port when in production
	var port = process.env.PORT || 3000;
	var app = (0, _express2.default)();

	app.use((0, _compression2.default)());

	//Set Up app folders
	app.use(_express2.default.static('dist'));
	app.use('/app', _express2.default.static('./src/client/app'));

	app.use(_bodyParser2.default.urlencoded({
	  extended: true
	}));
	app.use(_bodyParser2.default.json());

	app.use((0, _methodOverride2.default)());

	app.use(logger.dev);

	//Configure ejs vies
	app.set('view engine', 'ejs');
	app.set('views', _path2.default.join(__dirname, '../src/server/views/'));

	/** Mount Routes Here */
	//mount movie store module here
	app.use('/movies', _movie2.default);

	//cause error to occur
	app.use('/errortest', function (req, res, next) {
	  var err = { message: 'Test route is Testing Error Route', status: 509, stack: [{ message: 'An error test', status: 505 }, { message: 'From the Movie test error page', status: 501 }] };
	  next(err);
	});

	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	  logger.log(err, 'error');
	  res.status(err['status'] || 500);
	  res.render('pages/error.ejs', {
	    message: err.message,
	    error: {}
	  });
	});

	app.listen(port, function (err) {
	  logger.log('application started on Port:' + port, 'info');
	  if (err) {
	    logger.log(err);
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("method-override");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _movies = __webpack_require__(8);

	var _movies2 = _interopRequireDefault(_movies);

	var _logger = __webpack_require__(10);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router(); /* eslint-disable no-unused-vars */
	/* eslint-disable no-case-declarations */
	/** Restful Movie API routes */

	var movieService = new _movies2.default();
	var logger = new _logger2.default();

	// GET MOVIES
	router.get('/', movieService.get);

	// ADD
	router.post('/', movieService.save);

	//EDIT MOVIE
	router.put('/', movieService.save);

	//get movie details
	router.get('/:id', movieService.getbyId);

	// DELETE MOVIE
	router.delete('/:id', movieService.remove);

	exports.default = router;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _db = __webpack_require__(9);

	var _db2 = _interopRequireDefault(_db);

	var _logger = __webpack_require__(10);

	var _logger2 = _interopRequireDefault(_logger);

	var _mongodb = __webpack_require__(16);

	var _mongodb2 = _interopRequireDefault(_mongodb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var logger = new _logger2.default();

	var MovieService = function MovieService() {
	  _classCallCheck(this, MovieService);

	  logger.log('Starting Movie AP', 'debug');
	  // ADD OR EDIT MOVIE


	  // GET MOVIES
	  var getMovieCollection = function getMovieCollection(req, res, next) {
	    _db2.default.db.collection('movies').find().toArray().then(function (movies) {
	      res.json(movies);
	    }).catch(function (error) {
	      logger.log('Mongo has a problem: ' + error, 'debug');
	      next(error);
	    });
	  };

	  var save = function save(req, res, next) {
	    var movie = req.body;
	    if (movie._id) movie._id = new _mongodb2.default.ObjectID(movie._id.trim());
	    _db2.default.db.collection('movies').save(req.body).then(function (result) {
	      if (result === null) {
	        logger.log('Errror on Save adding Movie to the database', 'debug');
	        next('Result was null');
	      } else {
	        res.json(result);
	      }
	    }).catch(function (error) {
	      logger.log('Mongo has a problem: ' + error, 'debug');
	      next(error);
	    });
	  };

	  // DELETE MOVIE
	  var remove = function remove(req, res, next) {
	    var movieId = new _mongodb2.default.ObjectID(req.params['id'].trim());
	    _db2.default.db.collection('movies').remove({ _id: movieId }).then(function () {
	      res.sendStatus(200);
	    }).catch(function (error) {
	      logger.log('Mongo has a problem: ' + error, 'debug');
	      next(error);
	    });
	  };
	  var getMoviebyId = function getMoviebyId(req, res, next) {
	    var movieId = new _mongodb2.default.ObjectID(req.params['id']);
	    _db2.default.db.collection('movies').findOne(movieId).then(function (result) {
	      logger.log('the movie is ' + JSON.stringify(result), 'debug');
	      if (result === null) {
	        logger.log('No record Found', 'debug');
	        next('Result was null');
	      } else {
	        res.json(result);
	      }
	    }).catch(function (error) {
	      logger.log('Mongo has a problem: ' + error, 'debug');
	      next(error);
	    });
	  };
	  var service = {
	    get: getMovieCollection,
	    getbyId: getMoviebyId,
	    save: save,
	    remove: remove
	  };
	  //return service
	  return service;
	};

	exports.default = MovieService;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /** This file is where tjhe backend database goes  */


	var _logger = __webpack_require__(10);

	var _logger2 = _interopRequireDefault(_logger);

	var _mongodb = __webpack_require__(16);

	var _mongodb2 = _interopRequireDefault(_mongodb);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var logger = new _logger2.default();
	var connectionString = '';

	var Database = function () {
	    function Database() {
	        _classCallCheck(this, Database);
	    }

	    _createClass(Database, null, [{
	        key: 'connect',
	        value: function connect() {
	            var _this = this;

	            var dbconnection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mongodb://apiuser:!Agile$@ds117839.mlab.com:17839/live-exam-practice';

	            connectionString = dbconnection;
	            return _mongodb2.default.MongoClient.connect(connectionString).then(function (db) {
	                logger.log('successful db connection', 'info'); /* eslint-disable no-console */
	                _this.db = db;
	            }).catch(function (err) {
	                logger.error(err, 'error');
	            });
	        }
	    }]);

	    return Database;
	}();

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Database;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fs = __webpack_require__(11);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _rotatingFileStream = __webpack_require__(12);

	var _rotatingFileStream2 = _interopRequireDefault(_rotatingFileStream);

	var _morgan = __webpack_require__(13);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _winston = __webpack_require__(14);

	var _winston2 = _interopRequireDefault(_winston);

	var _moment = __webpack_require__(15);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var s_logger = Symbol('winston');
	var instance = null;
	//If cfg is not set then these values will be used
	//you can add other options if you would like to expand what can be configured
	//@todo add a way to email error logs and custom log type
	var defaultcfg = {
	    consoleLevel: 'info',
	    fileLevel: 'error'
	};
	//module service with singleton pattern

	var loggerService = function () {
	    _createClass(loggerService, [{
	        key: 'timeStamp',
	        get: function get() {
	            return this._timeStamp;
	        }
	        /** @cfg = {consoleLevel: 'info', fileLevel = 'error'}
	           pass in a config object to change the level of the server only set this once in the system
	           It will apply to all loggers on the entire server the last one in wins here */

	    }]);

	    function loggerService() {
	        var _this = this;

	        _classCallCheck(this, loggerService);

	        if (!instance) {

	            //Setup Logger
	            // to test whether we have singleton or not
	            this._timeStamp = this.time;
	            var time = function time() {
	                return (0, _moment2.default)().format('YYYY-MM-DD h:mm:ss a');
	            };

	            //set up custom token for req:id and log with Morgan
	            _morgan2.default.token('id', function getId(req) {
	                return req.id;
	            });
	            //Make Morgan Write to a file
	            var logDirectory = _path2.default.join(__dirname, 'log');

	            // ensure log directory exists
	            _fs2.default.existsSync(logDirectory) || _fs2.default.mkdirSync(logDirectory);

	            // create a rotating write stream this keep our log files from getting to big
	            var accessLogStream = (0, _rotatingFileStream2.default)('request.log', {
	                interval: '1d', // rotate daily
	                path: logDirectory
	            });

	            //set up winston
	            /** @todo: remove config options if they are being Set
	                using the defaultcfg let updateConfig handle this. */
	            this[s_logger] = new _winston2.default.Logger({
	                transports: [new _winston2.default.transports.File({
	                    level: defaultcfg.fileLevel,
	                    filename: 'app.log',
	                    handleExceptions: true,
	                    json: true,
	                    maxsize: 5242880, //5MB
	                    maxFiles: 5,
	                    colorize: false,
	                    timestamp: true,
	                    prettyprint: true
	                }), new _winston2.default.transports.Console({
	                    level: defaultcfg.consoleLevel,
	                    handleExceptions: true,
	                    json: false,
	                    colorize: true
	                })],
	                exitOnError: false
	            });
	            /** @todo change this to loop through cfg properties and only assign if properties match  */
	            var updateConfig = function updateConfig(cfg) {
	                defaultcfg = cfg;
	                _this[s_logger].transports.console.level = cfg.consoleLevel;
	                _this[s_logger].transports.file.level = cfg.fileLevel;
	            };

	            var logger = {
	                timeStamp: this._timeStamp,
	                time: time,
	                log: function log(message) {
	                    var category = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
	                    _this[s_logger].log(category, message);
	                },
	                cfg: updateConfig,
	                dev: (0, _morgan2.default)(':id :method :status :url :response-time[3]', { stream: accessLogStream })
	            };

	            instance = logger;
	        }

	        return instance;
	    }

	    return loggerService;
	}();

	exports.default = loggerService;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("rotating-file-stream");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("winston");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("mongodb");

/***/ }
/******/ ]);