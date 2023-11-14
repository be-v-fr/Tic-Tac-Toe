let fields = [
    null,
    null,
    'circle',
    null,
    'circle',
    'cross',
    null,
    null,
    null
];

function render() {
    renderPlayerSymbols();
    renderTable();
}

function renderPlayerSymbols() {
    const playerSymbolsContainer = document.getElementById('playerSymbols');
    playerSymbolsContainer.innerHTML = '';
    playerSymbolsContainer.innerHTML += circleHtml() + crossHtml();
  }

function renderTable() {
    const table = document.getElementById('gameTable');
    table.innerHTML = ''; // Clear existing content
    for (let i = 0; i < 3; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 3; j++) {
        const cell = row.insertCell();
        const index = i * 3 + j;
        if (fields[index] === 'circle') {
          cell.innerHTML = circleHtml();
        } else if (fields[index] === 'cross') {
          cell.innerHTML = crossHtml();
        }
      }
    }
  }

  function circleHtml() {
    return '<svg width="100" height="100">' +
      '<circle cx="50" cy="50" r="22" stroke="lightblue" stroke-width="8" fill="none" />' +
      '</svg>';
  }

  function crossHtml() {
    return '<svg width="100" height="100">' +
      '<line x1="20" y1="50" x2="80" y2="50" stroke="orange" stroke-width="8" transform="rotate(45, 50, 50)" />' +
      '<line x1="50" y1="20" x2="50" y2="80" stroke="orange" stroke-width="8" transform="rotate(45, 50, 50)" />' +
      '</svg>';
  }