class BinaryHeap {
  constructor() {
    this._heap = []
  }

  /**
    * Returns the index of the parent of the given index.
    * 
    * @param {number} index - The index of the current node.
    * @returns {number} - The index of the parent node.
    */
  getParentIndex(index) {
    if (index < 0 || index >= this._heap.length) {
      throw new RangeError('Index out of bounds'); // Use RangeError for index-related errors
    }

    return Math.floor((index - 1) / 2); // Calculate the parent index
  }

  /**
   * Returns the index of the left child of the given index
   * 
   * @param {*} index - The index of the current node
   * @returns {number} - The index of the left child node
   */
  getLeftChild(index) {
    return 2 * index + 1;
  }

  /**
   * Returns the index of the right child of the given index
   * 
   * @param {number} index - The index of the current node
   * @returns {unmber} - The index of the the right child node
   */
  getRightChild(index) {
    return 2 * index + 2;
  }

  /**
   * Compares two values based on the heap property.
   * Override this method to implement a min-heap or a max-heap
   * @param {*} childValue 
   * @param {*} parentValue 
   * @returns {boolean} - True if the child value satisfies the heap condition with the parent.
   */
  compare(childValue, parentValue) {
    return childValue < parentValue
  }

  /**
   * Moves the node at the given index up to maintain the heap property
   * 
   * @param {*} index - The index of the node to move up
   */
  heapifyUp(index) {
    let parentIndex = this.getParentIndex(index)

    while (index > 0 && this.compare(this._heap[index], this._heap[parentIndex])) {
      [this._heap[index], this._heap[parentIndex]] = [this._heap[parentIndex], this._heap[index]];
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  /**
   * Moves the node at the given index down to maintain the heap property
   * 
   * @param {*} index - The index of the node to move down
   */
  heapifyDown(index) {
    let leftIndex = this.getLeftChild(index);
    let rightIndex = this.getRightChild(index);
    let smallest = index;

    if (leftIndex < this._heap.length && this.compare(this._heap[leftIndex], this._heap[smallest])) {
      smallest = leftIndex;
    }
    if (rightIndex < this._heap.length && this.compare(this._heap[rightIndex], this._heap[smallest])) {
      smallest = rightIndex;
    }
    if (smallest !== index) {
      [this._heap[index], this._heap[smallest]] = [this._heap[smallest], this._heap[index]];
      this.heapifyDown(smallest);
    }
  }

  /**
   * Inserts a new value into the heap
   * 
   * @param {*} value 
   */
  insert(value) {
    this._heap.push(value);
    this.heapifyUp(this._heap.length - 1);
  }

  /**
   * Extracts the root (min or max value) from the heap
   * 
   * @returns {any} = The root value
   */
  extractRoot() {
    if (this._heap.length === 0) {
      throw new Error('Heap is empty');
    }

    const root = this._heap[0];
    const last = this._heap.pop();

    if (this._heap.length > 0) {
      this._heap[0] = last;
      this.heapifyDown(0);
    }

    return root;
  }

  /**
    * Peeks at the root value without removing it.
    * 
    * @returns {any} - The root value.
    */
  peek() {
    if (this._heap.length === 0) {
      throw new Error('Heap is empty');
    }
    return this._heap[0];
  }

  /**
   * Returns the number of elements in the heap.
   * 
   * @returns {number} - The length of the heap.
   */
  getLength() {
    return this._heap.length;
  }

  /**
   * Returns a string representation of the heap.
   * 
   * @returns {string} - The string representation of the heap.
   */
  toString() {
    return this._heap.toString();
  }
}


module.exports = {
  BinaryHeap
};