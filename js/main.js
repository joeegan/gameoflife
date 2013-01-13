//(function(){

   var canvas, context;
   var canvasW = document.body.clientWidth;
   var canvasH = document.documentElement.clientHeight;
   var xPositions = [];
   var yPositions = [];
   var data = [];
   var gridSize = 160;
   var glider = [[0,0,1],
                 [1,0,1],
                 [0,1,1]];

   var glider2 = [[0,1,0],
               [0,0,1],
               [1,1,1]];

   var lightweightSpaceship = [[0,1,0,0,1],
                               [1,0,0,0,0],
                               [1,0,0,0,1],
                               [1,1,1,1,0],
                               [0,0,0,0,0]];

   createGrid();

   var trueColour = 'rgb(255,255,255)';
   var falseColour = 'rgb(000,000,000)';
   var rowLength = data.length;
   var colLength = data[0].length;
   var cellWidth = canvasW/rowLength;
   var cellHeight = canvasH/colLength;

   prepareCanvas();
   calculateGridPositions();
   populateGrid(data);
   animate();

   function prepareCanvas(){
      canvas = document.createElement('canvas');
      canvas.width = canvasW;
      canvas.height = canvasH;
      context = canvas.getContext( '2d' );
      document.body.appendChild( canvas );
   }

   function animate() {
      setInterval(function(){
         data = getNewData(data);
         populateGrid(data);
      }, 500);
   }

   function createGrid(){
      var i, j;
      for (i=0; i<gridSize; i++) {
         var rowArr = [];
         for (j=0; j<gridSize; j++) {
            rowArr.push(0);
         }
        data.push(rowArr);
      }
   }

   function getNewData(data){
      var cell;
      var newData = [];
      var neighbours = [];
      var i, j, trueCount;
      for (i = 0; i<rowLength; i++) {
         var rowData = [];
         for (j = 0; j<colLength; j++) {
            cell = data[i][j];
            trueCount = 0;
            neighbours = [getCell(i-1,j-1),
                          getCell(i-1,j),
                          getCell(i-1,j+1),
                          getCell(i,j-1),
                          getCell(i,j+1),
                          getCell(i+1,j-1),
                          getCell(i+1,j),
                          getCell(i+1,j+1)]
            for (var k = 0; k<neighbours.length; k++) {
               trueCount += neighbours[k];
            }
            if (cell && (trueCount >= 2 && trueCount < 4)) {
               rowData.push(1);
            } else if (!cell && trueCount == 3) {
               rowData.push(1);
            } else {
               rowData.push(0);
            }
         }
         newData.push(rowData)
      }
      return newData;
   }

   function mergeShape(shape, y, x){
      var i, j;
      for(i=0; i<shape.length; i++) {
         for(j=0; j<shape.length; j++) {
            data[y+i][x+j] = shape[i][j];
         }
      }
   }

   function getCell(y,x) {
      if (typeof data[y] == "undefined") {
         data[y] = data[rowLength-(Math.abs(y))];
      }
      if (typeof data[y][x] == "undefined") {
         data[y][x] = data[y][rowLength-(Math.abs(x))];
      }
      return data[y][x];
   }

   function calculateGridPositions(){
      var i, j;
      for (i = 0; i < rowLength; i++) {
         xPositions.push(i * cellWidth);
      }
      for (j = 0; j < colLength; j++) {
         yPositions.push(j * cellHeight);
      }
   }

   function populateGrid(data){
      var cellWidth = xPositions[1];
      var cellHeight = yPositions[1];
      var i, j;
      context.strokeStyle = '#000'; // red
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvasW, canvasH);
      context.fill();

      for (i = 0; i<colLength; i++) {
         for (j = 0; j<rowLength; j++) {
            context.fillStyle = (data[i][j]) ? trueColour : falseColour;
            context.fillRect(xPositions[j], yPositions[i], cellWidth, cellHeight);
         }
      }
      context.fill();
   }

//})();