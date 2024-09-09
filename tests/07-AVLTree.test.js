const { AVLTree } = require('../07-avlTree/AVLTree');


describe('AVL Tree Insertion', () => {
  let tree; // Define a variable to hold the AVL tree instance

  beforeEach(() => {
    // Initialize a new AVL tree before each test
    tree = new AVLTree();
  });

  test('inserts a single node and make it the root of the tree', () => {
    tree.insert(1);

    // Assert that the root of the tree has the correct value
    expect(tree.root).not.toBeNull();
    expect(tree.root.content).toBe(1);

    expect(tree.root.left).toBeNull();
    expect(tree.root.right).toBeNull();
  });

  test('handles multiple insertions correctly', () => {
    tree.insert(1)
    tree.insert(2)
    tree.insert(3)
    tree.insert(4)
    tree.insert(5)
    tree.insert(6)

    // Perform in-order traversal
    const result = tree.getInOrderTraversal();

    // Assert that the result is a sorted list of the inserted keys
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);

  });


  test('maintains tree balance after each insertion', () => {
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);

    // Function to check if a node is balanced
    const isBalanced = (node) => {
      if (!node) return true;
      const balanceFactor = tree.getBalanceFactor(node);
      return Math.abs(balanceFactor) <= 1 && isBalanced(node.left) && isBalanced(node.right);
    };

    // Assert that the tree is balanced
    expect(isBalanced(tree.root)).toBe(true);
  });


  test('does not insert duplicate keys and maintain the tree structure', () => {
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(2); // Attempt to insert a duplicate key

    // Perform in-order traversal
    const result = tree.getInOrderTraversal();

    // Assert that the result does not include the duplicate key
    expect(result).toEqual([1, 2, 3]);
  });
});


describe('AVL Tree Traversal', () => {
  test('performs in-order traversal, and return list in order', () => {
    const tree = new AVLTree();

    // Insert values into the tree
    tree.insert(3);
    tree.insert(1);
    tree.insert(4);
    tree.insert(2);
    tree.insert(5);

    // Perform in-order traversal
    const result = tree.getInOrderTraversal();

    // Check that the result is sorted
    for (let i = 1; i < result.length; i++) {
      expect(result[i]).toBeGreaterThan(result[i - 1]);
    }
  });
});



describe('AVL Tree Rotation', () => {
  let tree; // Define a variable to hold the AVL tree instance

  beforeEach(() => {
    // Initialize a new AVL tree before each test
    tree = new AVLTree();
  });

  test('performs left rotation and maintain balance after rotation', () => {
    // Insert nodes to trigger a left rotation
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    // Perform in-order traversal
    const result = tree.getInOrderTraversal();

    // Assert the tree structure
    expect(result).toEqual([1, 2, 3]);

    // Check the root and children
    expect(tree.root.content).toBe(2); // The new root be 2 after left rotation
    expect(tree.root.left.content).toBe(1); // The left child of root be 1
    expect(tree.root.right.content).toBe(3); // The right child of root be 3

    // Check if the tree is balanced
    expect(tree.isBalancedTree()).toBe(true);
  });

  test('performs right rotation and maintain balance after rotation', () => {
    tree.insert(3)
    tree.insert(2)
    tree.insert(1)

    // Perform in-order traversal
    const result = tree.getInOrderTraversal();

    // Assert the tree structure
    expect(result).toEqual([1, 2, 3]);

    // Check the root and children
    expect(tree.root.content).toBe(2); // The new root be 2 after left rotation
    expect(tree.root.left.content).toBe(1); // The left child of root be 1
    expect(tree.root.right.content).toBe(3); // The right child of root be 3

    // Check if the tree is balanced
    expect(tree.isBalancedTree()).toBe(true);
  })

  test('performs left-right rotation and maintain balance after rotation', () => {
    // Insert nodes to trigger a left-right rotation
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);

    // Perform in-order traversal
    const result = tree.getInOrderTraversal();

    // Assert the tree structure
    expect(result).toEqual([1, 2, 3]);

    // Check the root and children
    expect(tree.root.content).toBe(2); // The new root be 2 after left-right rotation
    expect(tree.root.left.content).toBe(1); // The left child of root be 1
    expect(tree.root.right.content).toBe(3); // The right child of root be 3

    // Check if the tree is balanced
    expect(tree.isBalancedTree()).toBe(true);
  });

  test('performs right-left rotation and maintain balance after rotation', () => {
    // Insert nodes to trigger a right-left rotation
    tree.insert(1);
    tree.insert(3);
    tree.insert(2);

    // Perform in-order traversal
    const result = tree.getInOrderTraversal();

    // Assert the tree structure
    expect(result).toEqual([1, 2, 3]);

    // Check the root and children
    expect(tree.root.content).toBe(2); // The new root be 2 after right-left rotation
    expect(tree.root.left.content).toBe(1); // The left child of root be 1
    expect(tree.root.right.content).toBe(3); // The right child of root be 3

    // Check if the tree is balanced
    expect(tree.isBalancedTree()).toBe(true);
  });

})



describe('AVL Tree Node Deletion', () => {
  let tree; // Define a variable to hold the AVL tree instance

  beforeEach(() => {
    // Initialize a new AVL tree before each test
    tree = new AVLTree();
  });

  test('deletes a node with a single child', () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(6);

    tree.delete(7);

    const result = tree.getInOrderTraversal();
    expect(result).toEqual([3, 5, 6, 10, 15]);
    expect(tree.isBalancedTree()).toBe(true);
  });

  test('deletes a node with two children', () => {
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(12);
    tree.insert(18);

    tree.delete(5);

    const result = tree.getInOrderTraversal();
    expect(result).toEqual([3, 7, 10, 12, 15, 18]);
    expect(tree.isBalancedTree()).toBe(true);
  });
});



describe('AVL Tree Search', () => {
  let tree; // Define a variable to hold the AVL tree instance

  beforeEach(() => {
    // Initialize a new AVL tree before each test
    tree = new AVLTree();

    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(3);
    tree.insert(7);
    tree.insert(12);
    tree.insert(18);

  });

  test('returns node that is present in the tree', () => {
    const node = tree.search(7);
    expect(node).not.toBeNull();
    expect(node.content).toBe(7);
  });

  test('returns null if node is not in the tree', () => {
    const node = tree.search(20);
    expect(node).toBeNull();
  });
})

