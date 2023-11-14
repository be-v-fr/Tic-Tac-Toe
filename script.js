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

function renderTable() {
    const table = document.getElementById('gameTable');
    table.innerHTML = ''; // Clear existing content

    for (let i = 0; i < 3; i++) {
      const row = table.insertRow();
      for (let j = 0; j < 3; j++) {
        const cell = row.insertCell();
        const index = i * 3 + j;

        if (fields[index] === 'circle') {
          // Füge den HTML-Code für das Kreis-SVG-Element ein
          cell.innerHTML = '<svg width="100" height="100">' +
            '<circle cx="50" cy="50" r="22" stroke="lightblue" stroke-width="8" fill="none" />' +
            '</svg>';
        } else if (fields[index] === 'cross') {
          // Füge den HTML-Code für das Kreuz-SVG-Element ein
          cell.innerHTML = '<svg width="100" height="100">' +
            '<line x1="20" y1="50" x2="80" y2="50" stroke="orange" stroke-width="8" transform="rotate(45, 50, 50)" />' +
            '<line x1="50" y1="20" x2="50" y2="80" stroke="orange" stroke-width="8" transform="rotate(45, 50, 50)" />' +
            '</svg>';
        }
      }
    }
  }