const fs = require('fs');

const loadInputFromFile = (filename) => fs.readFileSync(filename, 'utf8');
const parseInputFile = (fileContent) => fileContent.split('\n').map((n) => +n);

const findUncomposableNumber = (allNumbers, preambleSize = 25) => {
  const emptyStack = initializeStack(preambleSize);
  const [preamble, rest] = splitArray(allNumbers, preambleSize);
  const prefilledStack = fillStack(emptyStack)(preamble);
  return rest.reduce(
    (state, number) => ({
      stack: addToStack(number)(state.stack),
      uncomposableNumber:
        !isComposableFrom(state.stack.items)(number) &&
        state.uncomposableNumber === null
          ? number
          : state.uncomposableNumber,
    }),
    {
      stack: prefilledStack,
      uncomposableNumber: null,
    }
  ).uncomposableNumber;
};

const splitArray = (array, whereToSplit) => [
  array.filter((_, index) => index < whereToSplit),
  array.filter((_, index) => index >= whereToSplit),
];

const isComposableFrom = (numbers) => (composableNumber) =>
  numbers.some((a, aIndex) =>
    numbers.some((b, bIndex) => a + b === composableNumber && aIndex !== bIndex)
  );

const initializeStack = (size) => ({
  size,
  items: [],
});

const addToStack = (addedItem) => (stack) => ({
  size: stack.size,
  items: [
    ...stack.items.filter(
      (_, index) => index > stack.items.length - stack.size
    ),
    addedItem,
  ],
});

const fillStack = (stack) => (items) =>
  items.reduce((acc, curr) => addToStack(curr)(acc), stack);

const pipe = (...fns) => (input) => fns.reduce((mem, fn) => fn(mem), input);

module.exports = {
  initializeStack,
  addToStack,
  isComposableFrom,
  findUncomposableNumber,
  pipe,
  loadInputFromFile,
  parseInputFile,
  fillStack,
  splitArray,
};
