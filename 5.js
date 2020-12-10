const fs = require('fs');

let seatIds = main();
seatIds = seatIds.sort((a, b) => (a <= b ? -1 : 1));
for (let row = 0; row <= 127; row++) {
  for (let column = 0; column <= 7; column++) {
    const id = row * 8 + column;
    if (!seatIds.includes(id + 1) || !seatIds.includes(id - 1)) {
      continue;
    }
    if (!seatIds.includes(id)) {
      console.log(id);
    }
  }
}

function main() {
  const input = fs.readFileSync('input.txt', 'utf8');
  const rows = input.split('\n');
  return rows.map((row) => decodeSeat(row)).map((seat) => seat.id);
}

function decodeSeat(encoded) {
  const [_, rowDirections, columnDirections] = encoded.match(
    /([FBLR]{7})([LR]{3})/
  );
  const row = decodeRow(rowDirections);
  const column = decodeColumn(columnDirections);
  const id = row * 8 + column;
  return {
    encoded,
    row,
    column,
    id,
  };
}

function decodeRow(rowDirections) {
  const finalSeat = rowDirections.split('').reduce(
    (acc, curr) => {
      switch (curr) {
        case 'B':
          return divide('upper', acc.min, acc.max);
        case 'F':
          return divide('bottom', acc.min, acc.max);
        default:
          throw new Error('invalid seat direction' + curr);
      }
    },
    {
      min: 0,
      max: 127,
    }
  );
  return finalSeat.min;
}

function decodeColumn(seatDirections) {
  const finalSeat = seatDirections.split('').reduce(
    (acc, curr) => {
      switch (curr) {
        case 'R':
          return divide('upper', acc.min, acc.max);
        case 'L':
          return divide('bottom', acc.min, acc.max);
        default:
          throw new Error('invalid seat direction' + curr);
      }
    },
    {
      min: 0,
      max: 7,
    }
  );
  return finalSeat.min;
}

function divide(direction, min, max) {
  const count = Math.round((max - min) / 2);
  return {
    min: direction === 'upper' ? min + count : min,
    max: direction === 'upper' ? max : max - count,
  };
}

module.exports = {
  decodeSeat,
  divide,
  decodeRow,
  decodeColumn,
};
