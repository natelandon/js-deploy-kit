/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/** Service for Movie App
/* Here is where you build the MovieApp service */
//import in template

import view from '../views/info.html';

let MovieInfo =  (app)=>
{
  app.directive('movieInfo', ['movieService', (movieService)=>
{
  return {
     template: view ,
     restrict:'E',
     controller: ['$scope','$window','movieService',
      function HomeController($scope, $window, movieService) {
        let self = this;
        self.movies = movieService.getMovies();
        self.log = (log) =>{console.log(log)};
        self.deleteMovie = (id) => {
          movieService.delete({ id: id });
            $window.location.reload();
          };

        }
      ],
      controllerAs: 'vm'
  }
}]);
}

export default MovieInfo;
