/* eslint-disable no-unused-vars */
/** Movie service
*   This class will be where the you put Client side services
*
*/

let movieService = (app)=>
{
    app.factory('movieService',['$resource', ($resource) =>
    {
      class MovieService {
          constructor($resource) {
              this.$resource = $resource;
              this.MovieResource = $resource('/movies/:id');
          }
          saveMovie(movie) {
              return this.MovieResource.save(movie).$promise;
          }
          getMovies() {
              return this.MovieResource.query();
          }
          get(id) {
              return this.MovieResource.get({ id: id });
          }
          deleteMovie(id) {
              return this.MovieResource.delete({ id: id }).$promise;
          }
        }
      return new MovieService($resource);
      }]);
};
export default movieService;
