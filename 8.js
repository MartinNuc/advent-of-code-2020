const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');
const commands = input.split('\n');

let currentCommandIndex = 0;
let acc = 0;
const alreadyExecutedIndexes = new Set();
const modifiedJmpIndexes = new Set();
let currentlyModifiedJmpState = null;
do {
  if (
    currentlyModifiedJmpState &&
    (alreadyExecutedIndexes.has(currentCommandIndex) ||
      currentCommandIndex >= commands.length)
  ) {
    currentCommandIndex = currentlyModifiedJmpState.currentCommandIndex;
    acc = currentlyModifiedJmpState.acc;
    currentlyModifiedJmpState = null;
  }

  console.log(('current command index', currentCommandIndex));
  const currentCommand = commands[currentCommandIndex];
  alreadyExecutedIndexes.add(currentCommandIndex);
  const [_, op, arg] = currentCommand.match(/(\w+) ([-+]\d+)/);
  console.log(op, arg);
  switch (op) {
    case 'nop':
      break;
    case 'jmp':
      if (
        currentlyModifiedJmpState === null &&
        !modifiedJmpIndexes.has(currentCommandIndex)
      ) {
        console.log('saving last jmp index');
        currentlyModifiedJmpState = {
          currentCommandIndex,
          acc,
        };
        modifiedJmpIndexes.add(currentlyModifiedJmpState.currentCommandIndex);
        break;
      }
      currentCommandIndex += +arg;
      continue;
    case 'acc':
      acc += +arg;
      break;
  }

  currentCommandIndex++;
  if (currentCommandIndex === commands.length) {
    console.log('last changed jmp: ' + currentlyModifiedJmpState);
    console.log('acc=' + acc);
    return;
  }
} while (currentCommandIndex < commands.length);

console.log(acc);
