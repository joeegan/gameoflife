(function(){

   Environment.init(200, 200);
   createPatternFromUrlList();

   function createPatternFromUrlList(){
      var urlList = window.location.search.substr(1).split(',');
      var xPos = 10,
          yPos = 10;

      for (var i =0; i<urlList.length; i++) {
         if (xPos >= (Environment.gridSize-20)) {
            xPos = 10;
            yPos += 40;
         }
         getPattern('./patterns/' + urlList[i] + '.cells', xPos, yPos);
         xPos += 40;
      }
   }

   function getPattern(url, xPos, yPos){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            Environment.mergeShape(translatePattern(xmlhttp.responseText),xPos,yPos);
         }
      }
      xmlhttp.open("GET",url,true);
      xmlhttp.send();
   }

   function translatePattern(response) {
      var resultArr = [];
      var patternLength = 0;
      var arrs = response.split("\n").filter(function(line){
         return !line.match(/^!/);
      });
      arrs.pop(); // last line is always blanks, remove it

      for (var i=0; i<arrs.length; i++) {
         var row = convertChars(arrs[i]);
         if (row.length > patternLength) {
            patternLength = row.length;
         }
         resultArr.push(row);
      }
      return fillBlanksWithZeros(resultArr, patternLength);
   }

   function convertChars(str){
      return str.trim()
                .replace(/O/g,1)
                .replace(/(\.)/g,0)
                .split('')
                .map(function(el){
                  return parseInt(el) || 0;
                });
   }

   function fillBlanksWithZeros(resultArr, patternLength){
      var j;
      for (j=0; j<resultArr.length; j++) {
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

})();
