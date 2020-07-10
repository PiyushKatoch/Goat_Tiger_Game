import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      let testx = 0;
      let testy = 0;
      let whichPiece = 0;
      let midRow = 0;
      let midCol = 0;
      let canvas: HTMLCanvasElement;
      let ctx: CanvasRenderingContext2D;
      const dim = 100;
      const tigerRadius = 20;
      const goatRadius = 15;
      let whichPieceX = -1;
      let whichPieceY = -1;
      const leftPad = 15;
      const topPad = 15;
      let pieces = new Array(23);
      for (let i = 0; i < pieces.length; ++ i) {
          pieces[i] = 0;
      }
      let pos = new Array(23);
      for (let i = 0; i < pos.length; ++ i) {
        pos[i] = new Array(2);
        for (let j = 0; j < 2; ++ j) {
              pos[i][j] = 0;
        }
      }
      pieces[0] = 1;
      pieces[19] = 1;
      pieces[17] = 1;
      let whichGame = 1;
      let winner = 0;
      let goatsEaten = 0;
      let goatsOnhand = 15;
      let goatOnhand = 0;
      let goatOnhandRow = 0;
      let goatOnhandCol = 0;
      let tigerOnhand = 0;
      let tigerOnhandRow = 0;
      let tigerOnhandCol = 0;
      let turn = 2;
      let trc = new Array(2);

      const boardLeft = leftPad + tigerRadius;
      const boardTop = topPad + tigerRadius;
       // function game() {
       // canvas = (document.getElementById('cnvs') as HTMLCanvasElement);
       // ctx =  canvas.getContext('2d');
       // drawPieces();
       // drawBoard();
      // }
      function drawBoard() {
        ctx.fillStyle = 'green';
        ctx.fillRect(boardLeft - tigerRadius * 3, boardTop - tigerRadius * 3, dim * 5.5 + tigerRadius * 3, dim * 4.5 + tigerRadius * 3);
        ctx.strokeStyle = 'white';
        ctx.moveTo(boardLeft, boardTop);
        pos[0][0] = boardLeft + 2.5 * dim;
        pos[0][1] = boardTop ;
        pos[1][0] = boardLeft;
        pos[1][1] = boardTop + dim;
        pos[7][0] = boardLeft;
        pos[7][1] = boardTop + 2 * dim;
        pos[13][0] = boardLeft;
        pos[13][1] = boardTop + 3 * dim ;
        pos[6][0] = boardLeft + 5 * dim;
        pos[6][1] = boardTop + dim;
        pos[12][0] = boardLeft + 5 * dim;
        pos[12][1] = boardTop + 2 * dim ;
        pos[18][0] = boardLeft + 5 * dim;
        pos[18][1] = boardTop + 3 * dim ;
        drawLine(boardLeft + 2.5 * dim, boardTop , boardLeft + 1.75 * dim , boardTop + dim, 3);
        drawLine(boardLeft + 2.5 * dim, boardTop , boardLeft + 2.25 * dim , boardTop + dim, 4);
        drawLine(boardLeft + 2.5 * dim, boardTop , boardLeft + 2.75 * dim , boardTop + dim, 5);
        drawLine(boardLeft + 2.5 * dim, boardTop , boardLeft + 3.25 * dim , boardTop + dim, 6);
        drawLine(boardLeft + 1.75 * dim, boardTop + dim , boardLeft + 1.125 * dim  , boardTop + 2 * dim, 9);
        drawLine(boardLeft + 2.25 * dim, boardTop + dim , boardLeft + 1.925 * dim , boardTop + 2 * dim, 10);
        drawLine(boardLeft + 2.75 * dim, boardTop + dim, boardLeft + 3.075 * dim , boardTop + 2 * dim, 11);
        drawLine(boardLeft + 3.25 * dim, boardTop + dim, boardLeft + 3.875 * dim , boardTop + 2 * dim, 12);
        drawLine(boardLeft + 1.125 * dim, boardTop + 2 * dim , boardLeft + 0.5 * dim  , boardTop + 3 * dim, 15);
        drawLine(boardLeft + 1.925 * dim, boardTop + 2 * dim , boardLeft + 1.575 * dim , boardTop + 3 * dim, 16);
        drawLine(boardLeft + 3.075 * dim, boardTop + 2 * dim, boardLeft + 3.475 * dim , boardTop + 3 * dim, 17);
        drawLine(boardLeft + 3.875 * dim, boardTop + 2 * dim, boardLeft + 4.5 * dim , boardTop + 3 * dim, 18);
        drawLine(boardLeft + 0.5 * dim, boardTop + 3 * dim , boardLeft  , boardTop + 4 * dim, 20);
        drawLine(boardLeft + 1.575 * dim, boardTop + 3 * dim , boardLeft + 1.275 * dim , boardTop + 4 * dim, 21);
        drawLine(boardLeft + 3.475 * dim, boardTop + 3 * dim, boardLeft + 3.875 * dim , boardTop + 4 * dim, 22);
        drawLine(boardLeft + 4.5 * dim, boardTop + 3 * dim, boardLeft + 5 * dim , boardTop + 4 * dim, 23);
        drawLine(boardLeft + 5 * dim, boardTop + dim, boardLeft + 5 * dim, boardTop + 3 * dim, 24 );
        drawLine(boardLeft, boardTop + dim, boardLeft, boardTop + 3 * dim, 24 );
        drawLine(boardLeft, boardTop + 4 * dim, boardLeft + 5 * dim, boardTop + dim * 4, 24);
        for (let i = 1; i < 4; ++i) {
         drawLine(boardLeft, boardTop + i * dim, boardLeft + dim * 5, boardTop + i * dim, 24);
        }
      }

      function drawLine(x1: number, y1: number, x2: number, y2: number, i: number) {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        if (i !== 24){
          pos[i - 1][0] = x2;
          pos[i - 1][1] = y2;
        }
      }

      function drawPieces() {
        for (let i = 0; i < 23; ++i) {
            ctx.beginPath();
            if (pieces[i] === 1) {
              ctx.arc(pos[i][0] , pos[i][1] , tigerRadius , 0 , 2 * Math.PI, true);
              ctx.fillStyle = 'rgba(200,0,0,0.96)';
            }
            else if (pieces[i] === 2) {
              ctx.arc(pos[i][0] , pos[i][1] , goatRadius, 0, 2 * Math.PI, true);
              ctx.fillStyle = 'rgba(10,200,100,0.96)';
            }
            ctx.fill();
          }
      }
        // this.eaten.value = this.goatsEaten;
        // this.onhand.value = this.goatsOnhand;
        // if (this.turn === 2) {
        //  this.turnof.value = 'Goat';
        // }
        // else if (this.turn === 1) {
        //  this.turnof.value = 'Tiger';
        // }
        // else {
        //  this.turnof.value = '';
        // }
      function mouseDown(event: MouseEvent): void{
           
           testx = event.x - canvas.offsetLeft;
           testy = event.y - canvas.offsetTop + window.pageYOffset;
           for (let i = 0; i < 23; ++i) {
              if ((testx > pos[i][0] - tigerRadius) && (testx < pos[i][0] + tigerRadius)
               && (testy > pos[i][1] - tigerRadius) && (testy < pos[i][1] + tigerRadius)) {
                whichPiece = i;
                trc = getRC(whichPiece);
                whichPieceX = trc[0];
                whichPieceY = trc[1];
                // alert('x = ' + trc[0] + ' y = ' + trc[1]);
                // alert('x = ' + testx + ' y = ' + testy + 'actual_x = ' + pos[i][0] + 'actual_y =' + pos[i][1]);
              }
            }
           if (whichPiece > -1) {
              if (whichGame === 1 || whichGame === 2) {
                if (turn === 2 && goatsOnhand > 0 && pieces[whichPiece] === 0 && goatOnhand != 1) {
                  goatsOnhand = goatsOnhand - 1;
                  pieces[whichPiece] = 2;
                  turn = 1;

                }
                else if (turn === 2 && pieces[whichPiece] === 2) {
                  goatOnhand = 1;
                  trc = getRC(whichPiece);
                  goatOnhandRow = trc[0];
                  goatOnhandCol = trc[1];
                }
                else if (turn === 2 && goatOnhand === 1 && pieces[whichPiece] === 0) {
                  if (validmove(goatOnhandRow, goatOnhandCol, whichPieceX, whichPieceY) === 1) {
                    pieces[whichPiece] = 2;
                    pieces[getpiece(goatOnhandRow, goatOnhandCol)] = 0;
                    goatOnhand = 0;
                    turn = 1;
                  }
                }
              }

              if (whichGame === 1 || whichGame === 2) {
                if (turn === 1 && pieces[whichPiece] === 1){
                  tigerOnhand = 1;
                  trc = getRC(whichPiece);
                  tigerOnhandRow = trc[0];
                  tigerOnhandCol = trc[1];
                  // alert('x = ' + tigerOnhandRow + ' y = ' + tigerOnhandCol);
                }


                if (turn === 1 && tigerOnhand === 1 && pieces[whichPiece] === 0) {
                  if (validmove(tigerOnhandRow, tigerOnhandCol, whichPieceX, whichPieceY) === 1) {
                    pieces[whichPiece] = 1;
                    pieces[getpiece(tigerOnhandRow, tigerOnhandCol)] = 0;
                    tigerOnhand = 0;
                    turn = 2;
                  }
                  else if (validjump(tigerOnhandRow, tigerOnhandCol, whichPieceX, whichPieceY) === 1) {
                    pieces[whichPiece] = 1;
                    pieces[getpiece(tigerOnhandRow, tigerOnhandCol)] = 0;
                    let r1 = tigerOnhandRow;
                    let c1 = tigerOnhandCol;
                    let r2 = whichPieceX;
                    let c2 = whichPieceY;
                    if (r1 === 0 && c1 === 1){
                      if (r2 === 2 && c2 === 2){
                          c1 = 2;
                      }
                      else if (r2 === 2 && c2 === 3){
                          c1 = 3;
                      }
                      if (r2 === 2 && c2 === 4){
                          c1 = 4;
                      }
                    }
                    if (r2 === 0 && c2 === 1){
                      if (r1 === 2 && c1 === 2){
                            c2 = 2;
                      }
                      else if (r1 === 2 && c1 === 3){
                         c2 = 3;
                      }
                      else if (r1 === 2 && c1 === 4){
                         c2 = 4;
                      }
                    }
                    pieces[getpiece(((r1 + r2) / 2), ((c1 + c2) / 2))] = 0;
                    tigerOnhand = 0;
                    turn = 2;
                    goatsEaten = goatsEaten + 1;
                  }
                }
              }
          }
           whichPieceX = -1;
           whichPieceY = -1;
           drawBoard();
           drawPieces();
           if (whichGame !== 0) {
              winner = checkWinner();
              if (winner === 1) {
                alert('Tiger Wins');
                whichGame = 0;
            }
            else if (winner === 2) {
              alert('Goat Wins');
              whichGame = 0;
            }
           }
      }
      function checkWinner() {
        let r1 = 0;
        let r2 = 0;
        let c1 = 0;
        let c2 = 0;
        if (goatsEaten > 14) {
          return 1;
        }
        for (let i = 0; i < 23; ++i){
            if (pieces[i] === 1) {
              trc = getRC(i);
              r1 = trc[0];
              c1 = trc[1];
              for (let j = 0; j < 23 ; ++j) {
                  if (pieces[j] === 0) {
                    trc = getRC(j);
                    r2 = trc[0];
                    c2 = trc[1];
                    if (validmove(r1, c1, r2, c2) === 1 || validjump(r1, c1, r2, c2) === 1) {
                      return 0;
                    }
                  }
                }
              }
            }
        return 2;
      }

      function distance(x1: number, y1: number, x2: number, y2: number) {
        return (Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)));
      }

      function validjump(r1: number, c1: number, r2: number, c2: number) {
        // (midRow, midCol) should be a goat; two end points can have any piece || none so check it manually while using validjump
        let flag = 0;
        if (r1 === 0 && c1 === 1){
          flag = 1;
          if (r2 === 2 && c2 === 2){
              c1 = 2;
          }
          else if (r2 === 2 && c2 === 3){
              c1 = 3;
          }
          if (r2 === 2 && c2 === 4){
              c1 = 4;
          }
        }
        if (r2 === 0 && c2 === 1){
          flag = 2;
          if (r1 === 2 && c1 === 2){
                c2 = 2;
          }
          else if (r1 === 2 && c1 === 3){
             c2 = 3;
          }
          else if (r1 === 2 && c1 === 4){
             c2 = 4;
          }
        }
        midRow = (r1 + r2) / 2;
        midCol = (c1 + c2) / 2;
        if (flag === 1){
             r1 = 0;
             c1 = 1;
        }
        else if (flag === 2){
              r2 = 0;
              c2 = 1;
        }
        if (isGoat(midRow, midCol) && validmove(r1, c1, midRow, midCol) && validmove(midRow, midCol, r2, c2)) {
            return 1;
          }
      }

      function validmove(r1: number, c1: number, r2: number, c2: number) {
        // no check for pieces here...do it manually
        // this is useful because valimove is used for tiger, goat, && ai moves
        if (r1 === 0 && c1 === 1){
          if (r2 === 1 && c2 === 2){
                c1 = 2;
          }
          else if (r2 === 1 && c2 === 3){
            c1 = 3;
          }
          if (r2 === 1 && c2 === 4){
            c1 = 4;
          }
        }
        if (r2 === 0 && c2 === 1){
          if (r1 === 1 && c1 === 2){
                c2 = 2;
          }
          else if (r1 === 1 && c1 === 3){
             c2 = 3;
          }
          else if (r1 === 1 && c1 === 4){
             c2 = 4;
          }
        }


        if (distance(r1, c1, r2, c2) < 2) {
            if (distance(r1, c1, r2, c2) === 1) {
              return 1;
            }
          }
        return 0;
      }

      function isTiger(row: number, col: number) {
        if (Math.round(row) === row && Math.round(col) === col) {
          if ((row >= 0 && row < 5) && (col >= 0 && col < 6) && pieces[getpiece(row, col)] === 1) {
            return true;
          }
        }
      }

      function isGoat(row: number, col: number) {
        if (Math.round(row) === row && Math.round(col) === col) {
          if ((row >= 0 && row < 5) && (col >= 0 && col < 6) && pieces[getpiece(row, col)] === 2) {
            return true;
          }
        }
      }

      function isBlank(row: number, col: number) {
        if (Math.round(row) === row && Math.round(col) === col) {
          if ((row >= 0 && row < 5) && (col >= 0 && col < 6) && pieces[getpiece(row, col)] === 0) {
            return true;
          }
        }
      }
      function getpiece(x: number , y: number){
        if (x === 0 && y === 1){
            return 0;
        }
        else if (x === 1 && y === 0){
          return 1;
        }else if (x === 1 && y === 1){
          return 2;
        }else if (x === 1 && y === 2){
          return 3;
        }else if (x === 1 && y === 3){
          return 4;
        }else if (x === 1 && y === 4){
          return 5;
        }else if (x === 1 && y === 5){
          return 6;
        }else if (x === 2 && y === 0){
          return 7;
        }else if (x === 2 && y === 1){
          return 8;
        }else if (x === 2 && y === 2){
          return 9;
        }else if (x === 2 && y === 3){
          return 10;
        }else if (x === 2 && y === 4){
          return 11;
        }else if (x === 2 && y === 5){
          return 12;
        }else if (x === 3 && y === 0){
          return 13;
        }else if (x === 3 && y === 1){
          return 14;
        }else if (x === 3 && y === 2){
          return 15;
        }else if (x === 3 && y === 3){
          return 16;
        }else if (x === 3 && y === 4){
          return 17;
        }else if (x === 3 && y === 5){
          return 18;
        }else if (x === 4 && y === 1){
          return 19;
        }else if (x === 4 && y === 2){
          return 20;
        }else if (x === 4 && y === 3){
          return 21;
        }else if (x === 4 && y === 4){
          return 22;
        }

      }

      function getRC(i: number){
          if ((15 < pos[i][1]) && (pos[i][1] < 55)){
              trc[0] = 0;
              trc[1] = 1;
          }
          else if ((115 < pos[i][1]) && (pos[i][1] < 155)){
              trc[0] = 1;
              if ((190 < pos[i][0]) && (pos[i][0] < 230)){
                trc[1] = 1;
              }
              else if ((240 < pos[i][0]) && (pos[i][0] < 280)){
                trc[1] = 2;
              }
              else if ((290 < pos[i][0]) && (pos[i][0] < 330)){
                trc[1] = 3;
              }
              else if ((340 < pos[i][0]) && (pos[i][0] < 380)){
                trc[1] = 4;
              }
              else if ((510 < pos[i][0]) && (pos[i][0] < 550)){
                trc[1] = 5;
              }
              else if ((20 < pos[i][0]) && (pos[i][0] < 60)){
                trc[1] = 0;
              }
          }
          else if ((215 < pos[i][1]) && (pos[i][1] < 255)){
            trc[0] = 2;
            if ((125 < pos[i][0]) && (pos[i][0] < 165)){
              trc[1] = 1;
            }
            else if ((205 < pos[i][0]) && (pos[i][0] < 245)){
              trc[1] = 2;
            }
            else if ((325 < pos[i][0]) && (pos[i][0] < 365)){
              trc[1] = 3;
            }
            else if ((400 < pos[i][0]) && (pos[i][0] < 440)){
              trc[1] = 4;
            }
            else if ((510 < pos[i][0]) && (pos[i][0] < 550)){
              trc[1] = 5;
            }
            else if ((20 < pos[i][0]) && (pos[i][0] < 60)){
              trc[1] = 0;
            }
          }
          else if ((315 < pos[i][1]) && (pos[i][1] < 355)){
            trc[0] = 3;
            if ((65 < pos[i][0]) && (pos[i][0] < 105)){
              trc[1] = 1;
            }
            else if ((170 < pos[i][0]) && (pos[i][0] < 210)){
              trc[1] = 2;
            }
            else if ((365 < pos[i][0]) && (pos[i][0] < 405)){
              trc[1] = 3;
            }
            else if ((465 < pos[i][0]) && (pos[i][0] < 505)){
              trc[1] = 4;
            }
            else if ((510 < pos[i][0]) && (pos[i][0] < 550)){
              trc[1] = 5;
            }
            else if ((20 < pos[i][0]) && (pos[i][0] < 60)){
              trc[1] = 0;
            }
          }
          else if ((415 < pos[i][1]) && (pos[i][1] < 455)){
            trc[0] = 4;
            if ((140 < pos[i][0]) && (pos[i][0] < 180)){
                trc[1] = 2;
            }
            else if ((400 < pos[i][0]) && (pos[i][0] < 440)){
              trc[1] = 3;
            }
            else if ((510 < pos[i][0]) && (pos[i][0] < 550)){
              trc[1] = 4;
            }
            else if ((20 < pos[i][0]) && (pos[i][0] < 60)){
              trc[1] = 1;
            }
          }
          return trc;
      }
      function mouseUp(){
          drawBoard();
          drawPieces();
          if (tigerOnhand !== 0 || goatOnhand !== 0) {
            //canvas.addEventListener('mousedown', mouseDown, false);
            //alert("In Up");
        }
      }

      // canvas.addEventListener('mouseup', mouseUp, false);

      window.onload = () => {
            canvas = ( document.getElementById('cnvs') as HTMLCanvasElement);
            canvas.addEventListener('mousedown', mouseDown, false);
            canvas.addEventListener('mouseup', mouseUp, false );
            ctx = canvas.getContext('2d');
            drawBoard();
            drawPieces();
      };
  }
}


