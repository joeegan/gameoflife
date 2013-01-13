mergeShape(glider, 70, 45);
mergeShape(glider, 20, 20);
mergeShape(glider2, 10, 10);
mergeShape(glider2, 0, 0);
mergeShape(lightweightSpaceship, 30, 30);

var params = getParams();

for (patternName in params) {
   getPattern('./patterns/' + params[patternName] + '.cells');
}

function getPattern(url){
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//         mergeShape(translatePattern(xmlhttp.responseText),100,100);
      }
   }
   xmlhttp.open("GET",url,true);
   xmlhttp.send();
}

function translatePattern(response) {
   var arrs = response.split("\n").splice(3);
   arrs.pop();
   var resultArr = [];
   var patternLength = 0;
   for (var i=0; i<arrs.length; i++) {
      var row = arrs[i].trim()
                     .replace(/O/g,1)
                     .replace(/(\.)/g,0)
                     .split('')
                     .map(function(el){
                        return parseInt(el) || 0;
                     });
      if (row.length > patternLength) {
         patternLength = row.length;
      }
      resultArr.push(row);
   }
   for (var j=0; j<resultArr.length; j++) {
      var row = resultArr[j];
      var missing = patternLength - row.length;
      if (missing) {
         row = row.concat(new Array(missing+1).join(0).split('').map(function(el){
                                 return parseInt(el);
                              }));
      }
      resultArr[j] = row;
   }
   return resultArr;
}

