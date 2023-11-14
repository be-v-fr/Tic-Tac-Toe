let fields = [
  [null, null, 'circle'],
  [null, 'circle', 'cross'],
  [null, null, null]
];

let activePlayerSymbol = 'circle';

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
    if (checkWinner()) {
      alert(`Spieler ${activePlayerSymbol} hat gewonnen!`);
      // Hier kannst du weitere Aktionen nach dem Gewinn durchführen
      // z.B. das Spiel zurücksetzen oder eine neue Runde starten
    } else {
      if(checkGameOver()) {
        alert('Game over!');
      };
    }
    togglePlayer();
    // Player-Anzeige updaten
  } else { // falls Feld belegt
    alert('Feld bereits belegt!');
  }
}

function checkWinner() {
  if (
    checkWinnerHorizontal() ||
    checkWinnerVertical() ||
    checkWinnerDiagonal()
  ) {
    return true;
  } else {
    return false; // Kein Gewinner gefunden
  }
}

function checkWinnerHorizontal() {
  // Überprüfe horizontale Reihen
  for (let i = 0; i < 3; i++) {
    if (
      fields[0][i] !== null &&
      fields[i][0] === fields[i][1] &&
      fields[i][1] === fields[i][2]
    ) {
      return true; // Gewinner gefunden
    }
  }
}

function checkWinnerVertical() {
  // Überprüfe vertikale Reihen
  for (let i = 0; i < 3; i++) {
    if (
      fields[0][i] !== null &&
      fields[0][i] === fields[1][i] &&
      fields[1][i] === fields[2][i]
    ) {
      return true; // Gewinner gefunden
    }
  }
}

function checkWinnerDiagonal() {
  // Überprüfe diagonale Reihen
  if (
    fields[0][0] !== null &&
    fields[0][0] === fields[1][1] &&
    fields[1][1] === fields[2][2]
  ) {
    return true; // Gewinner gefunden
  }

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