const { BinaryHeap } = require('../08-binaryHeap/BinaryHeap');


describe('BinaryHeap', () => {
  let heap;

  beforeEach(() => {
    heap = new BinaryHeap();  
  });

  describe('Heap Initialization', () => {
    it('initializes with an empty heap', () => {
      expect(heap.getLength()).toBe(0);
    })
  })

  describe('getParentIndex', () => {
    it('returns the correct parent index', () => {
      heap.insert(10); // Index 0
      heap.insert(20); // Index 1
  
      // After inserting, the heap structure should be:
      // [10, 20]
      expect(heap.getParentIndex(1)).toBe(0); // The parent of index 1 is 0
  
      heap.insert(5); // Index 2
      // Heap structure should be:
      // [5, 20, 10]
      expect(heap.getParentIndex(2)).toBe(0); // The parent of index 2 is 0
  
      heap.insert(1); // Index 3
      // Heap structure should be:
      // [1, 5, 10, 20]
      expect(heap.getParentIndex(3)).toBe(1); // The parent of index 3 is 1
    });

    it('throws RangeError for invalid indices', () => {
      expect(() => heap.getParentIndex(0)).toThrow(RangeError); // Index 0 has no parent
      expect(() => heap.getParentIndex(-1)).toThrow(RangeError); // Negative index
      expect(() => heap.getParentIndex(10)).toThrow(RangeError); // Out of bounds
    });
  });

  describe('getLeftChild', () => {
    it('returns the correct left child index', () => {
      heap.insert(10);
      heap.insert(20);
      expect(heap.getLeftChild(0)).toBe(1); // The left child of index 0 is 1
      expect(heap.getLeftChild(1)).toBe(3); // The left child of index 1 is 3
    });
  });

  describe('getRightChild', () => {
    it('returns the correct right child index', () => {
      heap.insert(10);
      heap.insert(20);
      expect(heap.getRightChild(0)).toBe(2); // The right child of index 0 is 2
      expect(heap.getRightChild(1)).toBe(4); // The right child of index 1 is 4
    });
  });

  describe('insert', () => {
    it('inserts a value correctly and maintains heap property', () => {
      heap.insert(10);
      heap.insert(5);
      heap.insert(15);
      heap.insert(1);
      expect(heap.peek()).toBe(1); // Assuming a min-heap, 1 should be the root
    });
  });

  // TODO: extractRoot


  // TODO: peek
  
  // TODO: getLength

})

