const {
  initializeStack,
  parseInputFile,
  loadInputFromFile,
  findUncomposableNumber,
  isComposableFrom,
  addToStack,
  pipe,
  fillStack,
  splitArray,
} = require('./9.js');

describe('stack', () => {
  it('initializes stack', () => {
    const stack = initializeStack(5);
    expect(stack.size).toBe(5);
    expect(stack.items.length).toBe(0);
  });

  describe('add', () => {
    it('adds into empty stack', () => {
      const stack = initializeStack(5);
      const updatedStack = pipe(addToStack(2))(stack);
      expect(updatedStack.items.length).toBe(1);
    });

    it('adds into full stack', () => {
      const stack = initializeStack(3);
      const fullStack = pipe(
        addToStack(1),
        addToStack(2),
        addToStack(3)
      )(stack);
      const updatedStack = pipe(addToStack(4))(fullStack);
      expect(updatedStack.items).toEqual([2, 3, 4]);
    });
  });

  describe('fillStack', () => {
    it('fills the stack', () => {
      const stack = initializeStack(3);
      const filledStack = fillStack(stack)([1, 2]);
      expect(filledStack.items).toEqual([1, 2]);
    });

    it('overfills the stack', () => {
      const stack = initializeStack(3);
      const filledStack = fillStack(stack)([1, 2, 3, 4]);
      expect(filledStack.items).toEqual([2, 3, 4]);
    });
  });
});

describe('splitArray', () => {
  it('splits array', () => {
    const array = [1, 2, 3, 4, 5, 6];
    expect(splitArray(array, 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('splits array althoug its too short', () => {
    const array = [1, 2];
    expect(splitArray(array, 3)).toEqual([[1, 2], []]);
  });
});

describe('code cracker', () => {
  it('loads data from file', () => {
    const fileContent = loadInputFromFile('example.txt');
    const parsedData = parseInputFile(fileContent);
    expect(parsedData.length).toBe(20);
  });

  describe('isComposableFrom', () => {
    const numbers = [10, 5, 3];
    const isComposableFromTenFiveThree = isComposableFrom(numbers);

    it('should be composable from two numbers', () => {
      expect(isComposableFromTenFiveThree(15)).toBeTruthy();
    });

    it('should not be composable from only its own', () => {
      expect(isComposableFromTenFiveThree(10)).toBeFalsy();
    });

    it('should not be composable from three', () => {
      expect(isComposableFromTenFiveThree(18)).toBeFalsy();
    });
  });

  describe('example', () => {
    const fileContent = loadInputFromFile('example.txt');
    const parsedData = parseInputFile(fileContent);

    it('finds first uncomposable number', () => {
      const uncomposableNumber = findUncomposableNumber(parsedData, 5);
      expect(uncomposableNumber).toBe(127);
    });
  });

  describe('main excercise', () => {
    const fileContent = loadInputFromFile('input.txt');
    const parsedData = parseInputFile(fileContent);

    it('finds first uncomposable number', () => {
      const uncomposableNumber = findUncomposableNumber(parsedData, 25);
      expect(uncomposableNumber).toBe(0);
    });
  });
});
