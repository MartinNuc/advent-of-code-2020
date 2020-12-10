const { decodeSeat, divide, decodeRow, decodeColumn } = require('./5');

test('decodes seat', () => {
  expect(decodeSeat('FBFBBFFRLR')).toEqual({
    encoded: 'FBFBBFFRLR',
    row: 44,
    column: 5,
    id: 357,
  });
  expect(decodeSeat('BFFFBBFRRR')).toEqual({
    encoded: 'BFFFBBFRRR',
    row: 70,
    column: 7,
    id: 567,
  });
  expect(decodeSeat('FFFBBBFRRR')).toEqual({
    encoded: 'FFFBBBFRRR',
    row: 14,
    column: 7,
    id: 119,
  });
  expect(decodeSeat('BBFFBBFRLL')).toEqual({
    encoded: 'BBFFBBFRLL',
    row: 102,
    column: 4,
    id: 820,
  });
});

test('it divides', () => {
  expect(divide('lower', 0, 127)).toEqual({ min: 0, max: 63 });
  expect(divide('upper', 0, 127)).toEqual({ min: 64, max: 127 });
});

test('decodes row direction', () => {
  expect(decodeRow('FBFBBFF')).toBe(44);
});

test('decodes column direction', () => {
  expect(decodeColumn('RLR')).toBe(5);
});
