const submit = document.querySelector("#submit");
// Объявление мин и флажков
let flags = 0,
victory = false;
submit.addEventListener("click",()=>{
  if (document.querySelector("table")) {
    document.querySelector("table").remove();
    document.querySelector(".vOrL").innerHTML = "";
    flags = 0;
    document.querySelector(".flag-count").innerText = flags;
    victory = false;
  };
  submit.remove()
  createGame()
})

function createGame() {
  createArea();
  createMines();
  startGame();
};
// Создаем поле
function createArea() {
  let cols = document.querySelector("#cells").value;
  if (+cols === 0 || isNaN(cols) ) {
    cols = 8;
  }
  else if (+cols > 25) {
    cols = 25;
  }
  const div = document.querySelector(".container");
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  div.append(table);
  table.append(tbody);
  for (let i = 0; i < +cols; i++) {
    const tr = document.createElement("tr");
    tbody.append(tr);
    for (let j = 0; j < +cols; j++) {
      const td = document.createElement("td");
      td.setAttribute("data-mine",false);
      tr.append(td);
    }
  };
};
// Раставляем мины
function createMines() {
  let cols = document.querySelector("#cells").value;
  if (+cols === 0 || isNaN(cols) ) {
    cols = 8;
  }
  else if (+cols > 25) {
    cols = 25;
  };
  mines = Math.floor((cols*cols)/6);
  const minesRand = document.querySelectorAll('td');
  const randCells = [];
  let count = 0;
  while (count<mines) {
    randCell = minesRand[Math.floor(Math.random()*minesRand.length)];
    if (randCells.includes(randCell)) {
      continue
    }
    randCell.setAttribute("data-mine",true);
    randCells.push(randCell);
    count++
  }

};
// Начинаем игру
function startGame(){
  document.querySelector(".mines-count").innerHTML = mines;
  // Добавление клика ЛКМ
  document.querySelector("tbody").addEventListener('click' ,openCell);
  // Добавление клика ПКМ
  document.querySelector("tbody").addEventListener('contextmenu' ,flagCount);

  function openCell(e){
    newGameBtn();
    if (e.target.classList.contains("empty")) {
        return
    }
    else if (e.target.getAttribute("data-mine") === "true") {
        endGame();
    }
    else{
     e.target.classList.add("empty")
     emptyCell(e.target)
   }
  };
  // Функция для нахождения елемента в масиве предка
  function indexOf(element) {
    return Array.prototype.slice.call(element.parentElement.children).indexOf(element);
  };

  // Функция поиска ячеек без бомб рядом
  function emptyCell(targ) {
    searchRight(targ);
    searchLeft(targ);
    searchUp(targ);
    searchDown(targ);
    searchDiag(targ);
    targ.innerHTML = countMines(targ);
    winOrLose()
  };

  // Поиск по правой стороне всех ячеек которые не бомбы
  function searchRight(i) {
    if (i.nextSibling !== null && i.nextSibling.getAttribute("data-mine") !== "true" ){
      if (!i.nextSibling.classList.contains("empty")) {
        i.nextSibling.classList.add("empty");

        if (countMines(i.nextSibling)!=="") {
          i.nextSibling.innerHTML = countMines(i.nextSibling)
        }
        else {
          emptyCell(i.nextSibling)
        }
      }
    }
  };
  // Поиск по левой стороне всех ячеек которые не бомбы
  function searchLeft(i) {
    if (i.previousSibling !== null && i.previousSibling.getAttribute("data-mine") !== "true" ){
      if (!i.previousSibling.classList.contains("empty")) {
        i.previousSibling.classList.add("empty");

        if (countMines(i.previousSibling)!=="") {
          i.previousSibling.innerHTML = countMines(i.previousSibling)
        }
        else {
          emptyCell(i.previousSibling)
        }
      }
    }
  };
  // Поиск по верху всех ячеек которые не бомбы
  function searchUp(i) {
    // Находим соседа слева родителя
    if (i.parentNode.previousSibling!== null) {
      let prev = i.parentNode.previousSibling.childNodes
      if (prev[indexOf(i)].getAttribute("data-mine") !== "true") {
        if (!prev[indexOf(i)].classList.contains("empty")) {
          prev[indexOf(i)].classList.add("empty");

          if (countMines(prev[indexOf(i)])!=="") {
            prev[indexOf(i)].innerHTML = countMines(prev[indexOf(i)])
          }
          else {
            emptyCell(prev[indexOf(i)])
          }
        }
      }
    }
  };
  // Поиск по низу всех ячеек которые не бомбы
  function searchDown(i) {
    // Находим соседа справа родителя
    if (i.parentNode.nextSibling!== null) {
      let next = i.parentNode.nextSibling.childNodes
      if (next[indexOf(i)].getAttribute("data-mine") !== "true") {
        if (!next[indexOf(i)].classList.contains("empty")) {
          next[indexOf(i)].classList.add("empty");

          if (countMines(next[indexOf(i)])!=="") {
            next[indexOf(i)].innerHTML = countMines(next[indexOf(i)])
          }
          else {
            emptyCell(next[indexOf(i)])
          }
        }
      }
    }
  };
  // Поиск по диагоналям
  function searchDiag(i) {
    // Диагональ сверху
    if (i.parentNode.previousSibling!== null) {
      let diagUp = i.parentNode.previousSibling.childNodes
      // Справа
      if (diagUp[indexOf(i)+1]!=null && diagUp[indexOf(i)+1].getAttribute("data-mine") !== "true") {
        if (!diagUp[indexOf(i)+1].classList.contains("empty")) {
          diagUp[indexOf(i)+1].classList.add("empty");

          if (countMines(diagUp[indexOf(i)+1])!=="") {
            diagUp[indexOf(i)+1].innerHTML = countMines(diagUp[indexOf(i)+1])
          }
          else {
            emptyCell(diagUp[indexOf(i)+1])
          }
        }
      };
      // Слева
      if (diagUp[indexOf(i)-1]!=null && diagUp[indexOf(i)-1].getAttribute("data-mine") !== "true") {
        if (!diagUp[indexOf(i)-1].classList.contains("empty")) {
          diagUp[indexOf(i)-1].classList.add("empty");

          if (countMines(diagUp[indexOf(i)-1])!=="") {
            diagUp[indexOf(i)-1].innerHTML = countMines(diagUp[indexOf(i)-1])
          }
          else {
            emptyCell(diagUp[indexOf(i)-1])
          }
        }
      }
    };
    // Диагональ снизу
    if (i.parentNode.nextSibling!== null) {
      let diagDw = i.parentNode.nextSibling.childNodes
      // Справа
      if (diagDw[indexOf(i)+1]!=null && diagDw[indexOf(i)+1].getAttribute("data-mine") !== "true") {
        if (!diagDw[indexOf(i)+1].classList.contains("empty")) {
          diagDw[indexOf(i)+1].classList.add("empty");

          if (countMines(diagDw[indexOf(i)+1])!=="") {
            diagDw[indexOf(i)+1].innerHTML = countMines(diagDw[indexOf(i)+1])
          }
          else {
            emptyCell(diagDw[indexOf(i)+1])
          }
        }
      };
      // Слева
      if (diagDw[indexOf(i)-1]!=null && diagDw[indexOf(i)-1].getAttribute("data-mine") !== "true") {
        if (!diagDw[indexOf(i)-1].classList.contains("empty")) {
          diagDw[indexOf(i)-1].classList.add("empty");

          if (countMines(diagDw[indexOf(i)-1])!=="") {
            diagDw[indexOf(i)-1].innerHTML = countMines(diagDw[indexOf(i)-1])
          }
          else {
            emptyCell(diagDw[indexOf(i)-1])
          }
        }
      }
    }
  }

  // Функция подсчета мин рядом
  function countMines(i) {
    let countM = 0;
    // Право
    if (i.nextSibling !== null && i.nextSibling.getAttribute("data-mine") === "true") {
      countM++
    };
    // Лево
    if (i.previousSibling !== null && i.previousSibling.getAttribute("data-mine") === "true") {
      countM++
    };
    // Верх
    if (i.parentNode.previousSibling !== null && i.parentNode.previousSibling.childNodes[indexOf(i)].getAttribute("data-mine") === "true") {
      countM++
    };
    // Низ
    if (i.parentNode.nextSibling !== null && i.parentNode.nextSibling.childNodes[indexOf(i)].getAttribute("data-mine") === "true") {
      countM++
    };
    // Верх диагональ
    if (i.parentNode.previousSibling !== null) {
        if (i.parentNode.previousSibling.childNodes[indexOf(i)+1] != null && i.parentNode.previousSibling.childNodes[indexOf(i)+1].getAttribute("data-mine") === "true") {
          countM++
        };
        if (i.parentNode.previousSibling.childNodes[indexOf(i)-1] != null && i.parentNode.previousSibling.childNodes[indexOf(i)-1].getAttribute("data-mine") === "true") {
          countM++
        }
    };
    // Низ диагональ
    if (i.parentNode.nextSibling !== null) {
        if (i.parentNode.nextSibling.childNodes[indexOf(i)+1]!= null && i.parentNode.nextSibling.childNodes[indexOf(i)+1].getAttribute("data-mine") === "true") {
          countM++
        };
        if (i.parentNode.nextSibling.childNodes[indexOf(i)-1] != null && i.parentNode.nextSibling.childNodes[indexOf(i)-1].getAttribute("data-mine") === "true") {
          countM++
        }
    };

    if (countM === 0) {
      return ""
    }
    return countM

  };

  // Функция установки флага
  function flagCount(e) {
    // if (e.target != document.querySelector("td")) {
    //   return
    // }
    newGameBtn();
    e.preventDefault();
    if (!e.target.classList.contains("empty")) {
      e.target.classList.toggle("flag");
      if (e.target.classList.contains("flag")) {
        flags++;
        document.querySelector(".flag-count").innerText = flags;
      }
      else {
        flags--;
        document.querySelector(".flag-count").innerText = flags;
      }
    }
  };

  // Функция конца игры
  function endGame() {
    let randCells = document.querySelectorAll("td")
    randCells.forEach(item => {
      if (item.getAttribute("data-mine")==="true") {
        item.classList.add("bomb")
      }
    });
    document.querySelector("tbody").removeEventListener('click', openCell);
    document.querySelector("tbody").removeEventListener('contextmenu', flagCount);
    if (victory === true) {
      document.querySelector(".vOrL").innerHTML = "Вы выграли)"
    }
    else {
      document.querySelector(".vOrL").innerHTML = "Вы проиграли("
    }
  };

  // Функция проверки выиграша или проиграша
  function winOrLose() {
    const allCells = document.querySelectorAll("td");
    const emptyCells = document.querySelectorAll(".empty");
      if (emptyCells.length === allCells.length-mines) {
        victory = true;
        endGame()
      }
  };

  // Функция создания кнопки
  function newGameBtn(){
    if (!document.querySelector(".btn").contains(document.querySelector(".btn button"))) {
      const btn = document.createElement("button");
      btn.classList.add('newGame');
      btn.innerHTML = "Начать новую игру";
      document.querySelector(".btn").append(btn);
      btn.addEventListener('click',()=>{
        document.querySelector("table").remove();
        document.querySelector(".vOrL").innerHTML = "";
        flags = 0;
        document.querySelector(".flag-count").innerText = flags;
        victory = false;

        createGame()
      })
    }
  };

};
createGame()
