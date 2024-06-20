import Grid from "./Grid.js"
import Tile from "./Tile.js"

$('#side_2048_daily').addClass('li_active');

$(document).ready(function () {
   $('.hover').hover(function () {
      $(this).addClass('flip');
   }, function () {
      $(this).removeClass('flip');
   });

   $('.retry_btn').click(function () {
      location.reload();
   });
});

const gameBoard = document.getElementById("game-board")

const score1 = document.getElementById('score1');

const grid = new Grid(gameBoard)
/* 임의의 빈 셀을 생성, 해당 타일을 새 타일로 설정*/
grid.randomEmptyCell().tile = new Tile(gameBoard)
grid.randomEmptyCell().tile = new Tile(gameBoard)
setupInput()

function setupInput() {
   window.addEventListener("keydown", handleInput, { once: true }) /* 키 입력시 handleInput함수를 한 번만 수행 */
}

async function handleInput(e) {
   switch (e.key) {
      case "ArrowUp":
         if (!canMoveUp()) {
            setupInput()
            return
         }
         await moveUp()
         break
      case "ArrowDown":
         if (!canMoveDown()) {
            setupInput()
            return
         }
         await moveDown()
         break
      case "ArrowLeft":
         if (!canMoveLeft()) {
            setupInput()
            return
         }
         await moveLeft()
         break
      case "ArrowRight":
         if (!canMoveRight()) {
            setupInput()
            return
         }
         await moveRight()
         break
      default:
         setupInput()
         return
   }

   grid.cells.forEach(cell => cell.mergeTiles())

   /* 모든 움직임에 새로운 랜덤 타일을 추가 */
   const newTile = new Tile(gameBoard)
   grid.randomEmptyCell().tile = newTile

   /* 게임 종료 (위, 아래, 왼쪽, 오른쪽 모두 움직일 수 없을 경우) */
   if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      newTile.waitForTransition(true).then(() => {
         score1.innerText = document.getElementById("score-amount").innerHTML;
         let score_ = $('#score-amount').text();
         $('#save_score').val(score_);
         document.getElementsByClassName("col_third")[0].style.display = "inline";
      })
      return
   }

   setupInput()
}

function moveUp() {
   return slideTiles(grid.cellsByColumn)
}

function moveDown() {
   return slideTiles(grid.cellsByColumn.map(column => [...column].reverse())) /* moveUp과 반대, column을 reverse */
}

function moveLeft() {
   return slideTiles(grid.cellsByRow)
}

function moveRight() {
   return slideTiles(grid.cellsByRow.map(row => [...row].reverse()))
}

function slideTiles(cells) {
   return Promise.all(
      cells.flatMap(group => {
         const promises = []
         for (let i = 1; i < group.length; i++) {
            const cell = group[i]
            if (cell.tile == null) continue
            let lastValidCell
            for (let j = i - 1; j >= 0; j--) {
               const moveToCell = group[j]
               if (!moveToCell.canAccept(cell.tile)) break
               lastValidCell = moveToCell
            }

            if (lastValidCell != null) {
               promises.push(cell.tile.waitForTransition())
               if (lastValidCell.tile != null) {
                  lastValidCell.mergeTile = cell.tile
               } else { /* 이미 타일이 없으면 현재 타일로 설정 */
                  lastValidCell.tile = cell.tile
               }
               cell.tile = null
               /* 현재 있는 셀의 타일은 제거 */
            }
         }
         return promises
      })
   )
}

function canMoveUp() {
   return canMove(grid.cellsByColumn)
}

function canMoveDown() {
   return canMove(grid.cellsByColumn.map(column => [...column].reverse()))
}

function canMoveLeft() {
   return canMove(grid.cellsByRow)
}

function canMoveRight() {
   return canMove(grid.cellsByRow.map(row => [...row].reverse()))
}

function canMove(cells) {
   return cells.some(group => {
      return group.some((cell, index) => {
         if (index === 0) return false
         if (cell.tile == null) return false
         const moveToCell = group[index - 1] /* 다음으로 움직여질 셀 */
         return moveToCell.canAccept(cell.tile)
      })
   })
}

/* 터치 event */
let img = document.getElementById("game-board");

let m = new Hammer.Manager(img);

m.add(new Hammer.Pan({ threshold: 0 }));

m.on("panleft panright panup pandown", function (ev) {

   switch (ev.type) {
      case "panup":
         if (!canMoveUp()) {
            setupInput()
            return
         }
         moveUp()
         break;

      case "pandown":
         if (!canMoveDown()) {
            setupInput()
            return
         }
         moveDown()
         break;

      case "panleft":
         if (!canMoveLeft()) {
            setupInput();
            return
         }
         moveLeft();
         break;

      case "panright":
         if (!canMoveRight()) {
            setupInput()
            return
         }
         moveRight()
         break;
   }
   grid.cells.forEach(cell => cell.mergeTiles())

   /* 모든 움직임에 새로운 랜덤 타일을 추가 */
   const newTile = new Tile(gameBoard)
   grid.randomEmptyCell().tile = newTile

   /* 게임 종료 (위, 아래, 왼쪽, 오른쪽 모두 움직일 수 없을 경우) */
   if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
      newTile.waitForTransition(true).then(() => {
         score1.innerText = document.getElementById("score-amount").innerHTML;
         document.getElementsByClassName("col_third")[0].style.display = "inline";
      })
      return
   }

   setupInput()
});

/* 터치 event */