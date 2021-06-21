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
      
    for(var x = 0; x < 3; x++){
      $scope.board[x] = [];
      duplicate[x]=[];
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
        return true;
      } else if(checkRowColumn(x,y,'row')){
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
          $("#rc"+row+"0, #rc"+row+"1, #rc"+row+"2").css({"color":"red","font-size":"50px"});
        }
        else if(check=='column'){
          $("#rc0"+column+", #rc1"+column+", #rc2"+column).css({"color":"red","font-size":"50px"});
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
        diag="left";
        temp=true;     
      }
      else if($scope.board[0][2] === player &&
        $scope.board[1][1] === player &&
        $scope.board[2][0] === player){
          diag="right";
          temp=true;
        }
      else{
        temp=false;
      }
      if(temp==true){
        if(diag=="left")
        $("#rc00, #rc11, #rc22").css({"color":"red","font-size":"50px"});
        else
        $("#rc02, #rc11, #rc20").css({"color":"red","font-size":"50px"});
      }
      return temp;
    }
    //Refresh the game
  $scope.refresh = function() {
    for(var x = 0; x < 3; x++){
      for(var y = 0; y < 3; y++){
        $scope.board[x][y] = '';
        duplicate[x][y]='';
      }
    }
    player = 'O';
    $scope.won = '';
    move['X'] = 0;
    move['O'] = 0;
    $("td").css({"color":"black","font-size":"40px","font-family":"cursive","font-weight":"bold"});
  }
  });