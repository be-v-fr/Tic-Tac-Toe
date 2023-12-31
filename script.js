let fields = [
  [],
  [],
  []
];

let activePlayerSymbol = '';

function init() {
  document.removeEventListener('mousedown', init);
  fields = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  activePlayerSymbol = 'circle';
  render();
  highlightPlayerSymbol();
}

function render() {
  renderPlayerSymbols();
  renderEmptyTable();
  updateTable();
}

function renderPlayerSymbols() {
  const playerSymbolsContainer = document.getElementById('playerSymbols');
  playerSymbolsContainer.innerHTML = '';
  playerSymbolsContainer.innerHTML += circleHtml() + crossHtml();
}

function renderEmptyTable() {
  const table = document.getElementById('gameTable');
  table.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const row = table.insertRow();
    row.id = "row" + i;
    for (let j = 0; j < 3; j++) {
      const cell = row.insertCell();
      cell.id = row.id + "column" + j;
      cell.addEventListener('click', () => playMove(i, j));
    }
  }
}

function updateTable() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      updateCell(i, j);
    }
  }
}

function updateCell(rowIndex, columnIndex) {
  const cellId = "row" + rowIndex + "column" + columnIndex;
  const cell = document.getElementById(`${cellId}`);
  if (fields[rowIndex][columnIndex] === 'circle') {
    cell.innerHTML = circleHtml();
  } else if (fields[rowIndex][columnIndex] === 'cross') {
    cell.innerHTML = crossHtml();
  }
}

function playMove(rowIndex, columnIndex) {
  const cellId = "row" + rowIndex + "column" + columnIndex;
  const cell = document.getElementById(`${cellId}`);
  if (!cell.innerHTML) { // falls Feld frei
    fields[rowIndex][columnIndex] = activePlayerSymbol;
    updateCell(rowIndex, columnIndex);
    if (checkWinner() || checkGameOver()) {
      document.addEventListener('mousedown', init);
      drawWinLine(checkWinner());
    }
    togglePlayer();
    highlightPlayerSymbol();
  }
}

function checkWinner() {
  if (checkWinnerHorizontal() >= 0) {
    const row = checkWinnerHorizontal()
    return [0, row, 2, row];
  } else {
    if (checkWinnerVertical() >= 0) {
      const column = checkWinnerVertical()
      return [column, 0, column, 2];
    } else {
      if (checkWinnerDiagonalDown()) {
        return [0, 0, 2, 2];
      } else {
        if (checkWinnerDiagonalUp()) {
          return [0, 2, 2, 0];
        } else {
          return null; // kein Gewinner gefunden
        }
      }
    }
  }
}


function checkWinnerHorizontal() {
  for (let i = 0; i < 3; i++) {
    if (
      fields[i][0] !== null &&
      fields[i][0] === fields[i][1] &&
      fields[i][1] === fields[i][2]
    ) {
      return i;
    }
  }
}

function checkWinnerVertical() {
  for (let i = 0; i < 3; i++) {
    if (
      fields[0][i] !== null &&
      fields[0][i] === fields[1][i] &&
      fields[1][i] === fields[2][i]
    ) {
      return i;
    }
  }
}

function checkWinnerDiagonalDown() {
  // Überprüfe diagonale Reihen
  if (
    fields[0][0] !== null &&
    fields[0][0] === fields[1][1] &&
    fields[1][1] === fields[2][2]
  ) {
    return true; // Gewinner gefunden
  }
}

function checkWinnerDiagonalUp() {
  if (
    fields[0][2] !== null &&
    fields[0][2] === fields[1][1] &&
    fields[1][1] === fields[2][0]
  ) {
    return true; // Gewinner gefunden
  }
}

function checkGameOver() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (fields[i][j] === null) {
        return false; // Es gibt mindestens eine leere Stelle im Array
      }
    }
  }
  return true; // Alle Stellen im Array sind belegt
}

function togglePlayer() {
  if (activePlayerSymbol == 'circle') {
    activePlayerSymbol = 'cross';
  } else {
    activePlayerSymbol = 'circle';
  }
}

function highlightPlayerSymbol() {
  const circle = document.querySelector('#playerSymbols :nth-child(1)');
  const cross = document.querySelector('#playerSymbols :nth-child(2)');
  if (activePlayerSymbol == 'circle') {
    circle.style.opacity = '1';
    cross.style.opacity = '0.3';
  } else {
    circle.style.opacity = '0.3';
    cross.style.opacity = '1';
  }
}

function drawWinLine(coordinates) {
  if (coordinates) {
    const cell00 = document.getElementById('row0column0');
    cell00.style.position = 'relative';

    const cellSize = 106;

    const x1 = cellSize * (0.5 + coordinates[0]);
    const y1 = cellSize * (0.5 + coordinates[1]);
    const x2 = cellSize * (0.5 + coordinates[2]);
    const y2 = cellSize * (0.5 + coordinates[3]);

    cell00.innerHTML += winLineHtml(x1, y1, x2, y2);
  }
}

function circleHtml() {
  return /* html */ '<svg width="100" height="100">' +
    '<circle cx="50" cy="50" r="22" stroke="lightblue" stroke-width="8" fill="none">' +
    `<animate attributeName="r" from="0" to="22" ${animateSpeedHtml()} />` +
    '</circle>' +
    '</svg>';
}

function crossHtml() {
  return /* html */ '<svg width="100" height="100">' +
    '<line x1="20" y1="50" x2="80" y2="50" stroke="orange" stroke-width="8" transform="rotate(45, 50, 50)">' +
    `<animate attributeName="x1" from="50" to="20" ${animateSpeedHtml()} />` +
    `<animate attributeName="x2" from="50" to="80" ${animateSpeedHtml()} />` +
    '</line>' +
    '<line x1="50" y1="20" x2="50" y2="80" stroke="orange" stroke-width="8" transform="rotate(45, 50, 50)">' +
    `<animate attributeName="y1" from="50" to="20" ${animateSpeedHtml()} />` +
    `<animate attributeName="y2" from="50" to="80" ${animateSpeedHtml()} />` +
    '</line>' +
    '</svg>';
}

function animateSpeedHtml() {
  return /* html */ 'dur="125ms" begin="0s" fill="freeze"';
}

function winLineHtml(x1, y1, x2, y2) {
  return /* html */ `
    <svg id="winLine">
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="8">
      <animate attributeName="x2" from="${x1}" to="${x2}" dur="0.5s" begin="0s" fill="freeze" />
      <animate attributeName="y2" from="${y1}" to="${y2}" dur="0.5s" begin="0s" fill="freeze" />
      </line>
    </svg>
  `;
}