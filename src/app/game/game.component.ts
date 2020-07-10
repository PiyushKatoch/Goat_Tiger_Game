import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let dim = 100;
    let tigerRadius = 20;
    let goatRadius = 15;
    let whichPieceX = -1;
    let whichPieceY = -1;
    let leftPad = 15;
    let topPad = 15;
    const pieces = new Array(23);
    for (let i = 0; i < pieces.length; ++ i) {
        pieces[i] = 0;
      }
    const pos = new Array(23);
    for (let i = 0; i < pos.length; ++ i) {
      pos[i] = new Array(2);
      for (let j = 0; j < 2; ++ j) {
            pos[i][j] = 0;
      }
    }
    pieces[0] = 1;
    pieces[14] = 1;
    pieces[17] = 1;
    let whichGame : 2;
    let goatsEaten = 0;
    let goatsOnhand = 20;
    let goatOnhand = 0;
    let goatOnhandRow = 0;
    let goatOnhandCol = 0;
    let tigerOnhand = 0;
    let tigerOnhandRow = 0;
    let tigerOnhandCol = 0;
    let turn = 2;
    const boardLeft = leftPad + tigerRadius;
    const boardTop = topPad + tigerRadius;

    function game() {
     // canvas = (document.getElementById('cnvs') as HTMLCanvasElement);
     // ctx =  canvas.getContext('2d');
      drawPieces();
      drawBoard();
    }

    function drawBoard() {
      ctx.fillStyle = 'green';
      ctx.fillRect(boardLeft - tigerRadius, boardTop - tigerRadius, dim * 5 + tigerRadius * 2, dim * 5 + tigerRadius * 2);
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
      //this.eaten.value = this.goatsEaten;
      //this.onhand.value = this.goatsOnhand;
      //if (this.turn === 2) {
      //  this.turnof.value = 'Goat';
      //}
      //else if (this.turn === 1) {
      //  this.turnof.value = 'Tiger';
      //}
      //else {
      //  this.turnof.value = '';
      //}
    window.onload = () => {
          canvas = <HTMLCanvasElement>document.getElementById('cnvs');
          ctx = canvas.getContext('2d');
          drawBoard();
          drawPieces();
    }
  }
}