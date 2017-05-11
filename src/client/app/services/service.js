/* eslint-disable no-unused-vars */
/** Movie service
*   This class will be where the you put Client side services
*
*/
import getBaseUrl from '../../../../src/server/core/baseUrl'
let baseUrl = getBaseUrl();
let movieService = (app)=>
{

    app.factory('movieService',['$resource', function ($resource) {
      var data = $resource(`${baseUrl}/movies/:id`, {id: '@id'}, {
      update:{
          method:'PUT'
          }
      });
      return data;
  }]);

};
export default movieService;
