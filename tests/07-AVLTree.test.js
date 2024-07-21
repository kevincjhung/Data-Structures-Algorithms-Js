const { AVLTree } = require('../07-avlTree/AVLTree');



describe('AVL Tree Insertion', () => {
  let tree; // Define a variable to hold the AVL tree instance

  beforeEach(() => {
    // Initialize a new AVL tree before each test
    tree = new AVLTree();
  });

  test('should insert a single node and make it the root of the tree', () => {
    tree.insert(1);

    // Assert that the root of the tree has the correct value
    expect(tree.root).not.toBeNull(); 
    expect(tree.root.content).toBe(1);  

    expect(tree.root.left).toBeNull(); 
    expect(tree.root.right).toBeNull(); 
  });

  test('should handle multiple insertions correctly', () => {
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


  test.skip('should maintain tree balance after each insertion', () => {
    // TODO
  });

  test.skip('should not insert duplicate keys and maintain the tree structure', () => {
    // TODO
  });
});



describe('AVL Tree Traversal', () => {
  test('should perform in-order traversal, and return list in order', () => {
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
  test.skip('should perform left rotation and maintain balance after rotation', () => {
    // TODO  
  })

  test.skip('should perform right rotation and maintain balance after rotation', () => {
    // TODO  
  })
  
  test.skip('should perform left-right rotation and maintain balance after rotation', () => {
    // TODO  
  })
  
  test.skip('should perform right-left rotation and maintain balance after rotation', () => {
    // TODO  
  })

})



describe('AVL Tree Node Deletion', () => {
  test.skip('should correctly delete a node with a single child', () => {
    // TODO 
  });

  test.skip('should correctly delete a node with two children', () => {
    // TODO 
  });
});



describe('AVL Tree Search', () => {
  test.skip('should correctly return node that is present in the tree', () => {
    
  })

  test.skip('should correctly return null if node is not in the tree', () => {

  })
})
