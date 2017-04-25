routes.$inject = ['$stateProvider','$urlRouterProvider', '$locationProvider'];

export default function routes($stateProvider, $urlRouterProvider, $locationProvider) {
  // Define routes
  $stateProvider
     .state('Home', {
      url: '/',
      template: require('../views/home.html'),
      controller: 'homeController',
      controllerAs: 'vm'
  })
      .state('Add', {
      url: '/addMovie',
      template: require('../views/addMovie.html'),
      controller: 'addMovieController',
      controllerAs: 'vm'
  })
      .state('Edit', {
      url: '/editMovie/:id',
      template: require('../views/editMovie.html'),
      controller: 'editMovieController',
      controllerAs: 'vm'
  })
      .state('notFound', {
      url: '/notFound',
      template: require('../views/notFound.html')
  });
  // Handle request for non-existent route
  $urlRouterProvider.otherwise('/notFound');
  // Enable HTML5 navigation
  $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
  });
}
