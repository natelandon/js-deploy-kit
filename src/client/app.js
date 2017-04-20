/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
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
import {default as _movieInfo} from './app/widgets/movieInfo';

let app = angular.module('movieApp',['ui.router','ngResource']).config(($stateProvider, $urlRouterProvider, $locationProvider) => {

      // Define routes
      $stateProvider
         .state('Home', {
          url: '/',
          templateUrl: '/app/views/home.html',
          controller: 'homeController',
          controllerAs: 'vm'
      })
          .state('Add', {
          url: '/addMovie',
          templateUrl: '/app/views/addMovie.html',
          controller: 'addMovieController',
          controllerAs: 'vm'
      })
          .state('Edit', {
          url: '/editMovie/:id',
          templateUrl: '/app/views/editMovie.html',
          controller: 'editMovieController',
          controllerAs: 'vm'
      })
          .state('notFound', {
          url: '/notFound',
          templateUrl: 'app/views/notFound.html'
      });
      // Handle request for non-existent route
      $urlRouterProvider.otherwise('/notFound');
      // Enable HTML5 navigation
      $locationProvider.html5Mode({
   enabled: true,
   requireBase: false
 });
  });

  _movieService(app);
  _movieControllers(app);
  _movieInfo(app);

//load movie app resources
