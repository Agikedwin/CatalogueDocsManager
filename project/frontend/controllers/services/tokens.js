angular
  .module('mylogin', ['angular-jwt'])
  .controller('TestController1', function Controller(jwtHelper) {
    var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';  
      var date = jwtHelper.getTokenExpirationDate(expToken);
    var tokenPayload = jwtHelper.decodeToken(expToken);
    console.log('deconding token');
    console.log(date);
  });
