const {
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
} = require('../03-sorting/sort');


// Selection Sort Tests
describe('Selection Sort', () => {
  test('sorts an array of numbers', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const sorted = selectionSort(arr);
    expect(sorted).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  test('sorts an already sorted array', () => {
    const arr = [1, 2, 3, 4, 5];
    const sorted = selectionSort(arr);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  test('sorts an array with negative numbers', () => {
    const arr = [-3, 0, 2, -1, 5, -2];
    const sorted = selectionSort(arr);
    expect(sorted).toEqual([-3, -2, -1, 0, 2, 5]);
  });
});

// Insertion Sort Tests
describe('Insertion Sort', () => {
  test('sorts an array of numbers', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const sorted = insertionSort(arr);
    expect(sorted).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  test('sorts an already sorted array', () => {
    const arr = [1, 2, 3, 4, 5];
    const sorted = insertionSort(arr);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  test('sorts an array with negative numbers', () => {
    const arr = [-3, 0, 2, -1, 5, -2];
    const sorted = insertionSort(arr);
    expect(sorted).toEqual([-3, -2, -1, 0, 2, 5]);
  });
});

// Merge Sort Tests
describe('Merge Sort', () => {
  test('sorts an array of numbers', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const sorted = mergeSort(arr);
    expect(sorted).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  test('sorts an already sorted array', () => {
    const arr = [1, 2, 3, 4, 5];
    const sorted = mergeSort(arr);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  test('sorts an array with negative numbers', () => {
    const arr = [-3, 0, 2, -1, 5, -2];
    const sorted = mergeSort(arr);
    expect(sorted).toEqual([-3, -2, -1, 0, 2, 5]);
  });
});

// Quick Sort Tests
describe('Quick Sort', () => {
  test('sorts an array of numbers', () => {
    const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const sorted = quickSort(arr);
    expect(sorted).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
  });

  test('sorts an already sorted array', () => {
    const arr = [1, 2, 3, 4, 5];
    const sorted = quickSort(arr);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  test('sorts an array with negative numbers', () => {
    const arr = [-3, 0, 2, -1, 5, -2];
    const sorted = quickSort(arr);
    expect(sorted).toEqual([-3, -2, -1, 0, 2, 5]);
  });
});
