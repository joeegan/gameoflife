function getParams(){
   var prmstr = window.location.search.substr(1);
   var prmarr = prmstr.split ("&");
   var params = {};

   for (var i = 0; i < prmarr.length; i++) {
       var tmparr = prmarr[i].split("=");
       params[tmparr[0]] = tmparr[1];
   }
   return params;
}

