var ticTacToe = angular.module('myApp', []);
    

  ticTacToe.controller('myController', function($scope) {
   
  
    let duplicate=[];
    $scope.board = [];
    $scope.won = '';
    $scope.letter='';
    var player = 'O';
    var move = {};
    
    move['X'] = 0;
    move['O'] = 0;
      
    for(let x = 0; x < 3; x++)
    {
      $scope.board[x] = [];
      duplicate[x]=[];
      $scope["col" + x] = false;
      $scope["row" + x] = false;
      $scope["diag" + x] = false;
    }  
    
    //for not repeating
    $scope.play = function(x,y) {
      if($scope.won === ''){
        
        if(!duplicate[x][y])
        {
          if(player === 'X'){
            player = 'O';
          } else {
            player = 'X';
          }
          $scope.board[x][y] = player;
          duplicate[x][y]= player;
          move[player] += 1;
          
        }
        //move
        if(move[player] >= 3){
          if(checkWin(x,y)){
            $scope.won = player ;
            $("#myModal").modal('show');
          } else if((move['X'] + move['O']) === 9){
            $scope.won = 'Game is a tie.';
            $("#myModal2").modal('show');
          }
        }
      }
    }
    //win
    function checkWin(x,y) {
      if(checkRowColumn(x,y,'column')){
        $scope["col" + y] = true;
        return true;
      } else if(checkRowColumn(x,y,'row')){
        $scope["row" + x] = true;
        return true;
      } else if(checkDiagonals()) {
        return true;
      } else {
        return false;
      }  
    }
      //check
    function checkRowColumn(x,y,check) {  
      var flag = '';
      var row = x;
      var column = y;
      for(var i = 0; i < 3; i++){
        if(check === 'row'){
          column = i;
        } else {
          row = i;
        }
        if($scope.board[row][column] !== player){
          flag = false;
        }
      }
      if(flag === ''){
        flag = true;
      }
      if(flag==true){
        if(check=='row'){
          $scope.r00={"color":"red","font-size":"50px"}
        }
        if(check=='column'){
          $scope.r00={"color":"red","font-size":"50px"}
        }
      }
      return flag;
    }
  //function for diagonals
    function checkDiagonals(){
      var temp=false;
      var diag="";
      if($scope.board[0][0] === player &&
          $scope.board[1][1] === player &&
         $scope.board[2][2] === player)
         {
          $scope.diag1=true;
        diag="left";
        temp=true;   
        $scope.r00={"color":"red","font-size":"50px"}  
      }
      else if($scope.board[0][2] === player &&
        $scope.board[1][1] === player &&
        $scope.board[2][0] === player){
          $scope.diag2=true;
          diag="right";
          temp=true;
          $scope.r00={"color":"red","font-size":"50px"}
        }
      else{
        temp=false;
      }
     
      return temp;
    }
    //Refresh the game
  $scope.refresh = function() {
    for(var x = 0; x < 3; x++){
      for(var y = 0; y < 3; y++){
        $scope.board[x][y] = '';
        duplicate[x][y]='';
        $scope["col" + x] = false;
        $scope["row" + x] = false;
        $scope["diag" + x] = false;
      }
    }
    player = 'O';
    $scope.won = '';
    move['X'] = 0;
    move['O'] = 0;
    $scope.r00={"color":"black","font-size":"40px"}
  }
  });