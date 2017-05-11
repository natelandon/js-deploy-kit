export default function getBaseUrl() {
  return getApiurl();
}

let testLocalhost= (string)=>
{

  let host = "localhost";	// Variable Name 1

      let mHost = string.match(host);
      return (mHost !== null ) ?  true : false;

}
let testHTPPS= (string)=>
{
  let https ="https:";	// Variable Name 1
  let m = string.match(https);
  return (m !== null ) ?  true : false;
}
function getApiurl() {
  let url = window.location.href;
  if (testLocalhost(url))
  {
    return  `http://localhost:3000`;
  }
  else return (testHTPPS(url)) ?   `https://codercamps-mic.azurewebsites.net` : `http://codercamps-mic.azurewebsites.net`;

}




/**
function getQueryStringParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
**/
