$(document).ready(function(){
  var gen = [], newGen = [];
  var nextClicks = 0;
  var cellWidth = 50, cols = 10;
  var rows = cols;
  var liveCells = 0, deadCells =0;
  var canvas = document.getElementById('myCanvas');
  canvas.width = cols*cellWidth;
  canvas.height = cols*cellWidth;
  var context = canvas.getContext('2d');
  var compare = [ [-1,-1],
                  [-1, 0],
                  [-1, 1],
                  [0, -1],
                  [0, 1],
                  [1,-1],
                  [1, 0],
                  [1,1]];


$('#start').click(function(){
  $(this).hide();
  $('#header').hide();
  $('#generation').text("Generation 0");
  $('.hidden').show();
  generateFirstGen();
});

$('#next').click(function(){
  nextClicks++;
  $('#generation').text("Generation "+nextClicks);
  checkNeighbors();
});

$('#skip23').click(function(){
  nextClicks += 23;
  $('#generation').text("Generation "+nextClicks);
  for(var i=0;i<23;i++){
    checkNeighbors();
  }
});

$('#reset').click(function(){
    generateFirstGen();
});

function generateFirstGen(){
  var x, y;
  for(var i=0; i<rows; i++){
    gen[i] = [];
    newGen[i]=[];
    for(var j=0; j<cols;j++){
      gen[i][j] = Math.floor(Math.random()*2);
      x = i*cellWidth;
      y = j*cellWidth;
      //fill cell if it's alive
      if(gen[i][j]==0){
        deadCells++;
        context.fillStyle = "white";
        context.fillRect(y,x,cellWidth-1,cellWidth-1);
      }else{
        liveCells++;
      }
    }

  }
  $('#liveCells').text("Live cells: "+liveCells);
  $('#deadCells').text("Dead cells: "+deadCells);

}



//This function checks neighbors of all cells, counts # live and # dead deadNeighbors
//it then generates a new grid containing the new generation
function checkNeighbors(){
  liveCells = 0;
  deadCells =0;
  var cell;
  var x, y;
  var aliveNeighbors, deadNeighbors;
  context.fillStyle= "black";
  context.fillRect(0,0,canvas.width, canvas.width);

  for(var i = 0; i<rows; i++){
    for(var j=0; j< cols; j++){
      cell = gen[i][j]; // getting current cell
      aliveNeighbors = 0;
      deadNeighbors = 0;
      //checking current cell's neighbors
      compare.forEach(function(value, index, array){
          y = value[0]+i;
          x = value[1]+j;
          //making sure index is not out of bounds
          if(y >=0 && y <= (rows-1) && x>=0 && x <= (cols-1)){
            //counting alive / dead neighbors
            if(gen[y][x] == 1){ aliveNeighbors++; }
            else{ deadNeighbors++; }
          }
        });

        if(cell == 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)){
          newGen[i][j] = 0; //cell dies
        }else if(cell == 0 && aliveNeighbors == 3){
          newGen[i][j] = 1;
        }else{
          newGen[i][j] = cell;
        }
        x = i*cellWidth;
        y = j*cellWidth;
        //fill cell if it's alive
        if(newGen[i][j]==0){
          deadCells++;
          context.fillStyle = "white";
          context.fillRect(y,x,cellWidth-1,cellWidth-1);
        }else{
          liveCells++;
        }

    }
  }
  gen = newGen;
  $('#liveCells').text("Live cells: "+liveCells);
  $('#deadCells').text("Dead cells: "+deadCells);
}



});
