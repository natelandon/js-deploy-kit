/** Main Client Module Loader for basic SPA
/* create the main angular app module and config*/
//import in styles
import './public/styles/styles.less';
//import in images
//import bootstrap and font awesome

import angular from 'angular';
import 'angular-resource';
import 'angular-ui-router';
//load movie app resources
import {default as _movieService} from './app/services/service';
import {default as  _movieControllers} from './app/controllers/controller';
//import {default as _movieInfo} from './app/widgets/movieInfo';
import routes from  './app/router/uiroute';
let app = angular.module('movieApp',['ui.router','ngResource']).config(routes);

  _movieService(app);
  _movieControllers(app);


//load movie app resources
