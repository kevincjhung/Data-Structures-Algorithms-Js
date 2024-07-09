const { Node, BinaryTree } = require('../06-binaryTrees/binaryTrees');


/**
 * Tests for the Node class
 */
describe('Node', () => {
  test('should create a node with content', () => {
    const node = new Node(5);
    expect(node.content).toBe(5);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
    expect(node.parent).toBeNull();
  });

  test('should set left and right children', () => {
    const node = new Node(10)
    const leftChild = new Node(5)
    const rightChild = new Node(15)

    node.setLeft(leftChild)
    node.setRight(rightChild)

    expect(node.left).toBe(leftChild);
    expect(node.right).toBe(rightChild);
    expect(leftChild.parent).toBe(node);
    expect(rightChild.parent).toBe(node);
  })
})

/**
 * Tests for the Binary Tree class
 */
describe('BinaryTree', () => {
  test('should insert values into the binary tree', () => {
    const tree = new BinaryTree();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);

    expect(tree.root.content).toBe(10);
    expect(tree.root.left.content).toBe(5);
    expect(tree.root.right.content).toBe(15);
  });

  test('should return the smallest element in a subtree', () => {
    const tree = new BinaryTree()

    tree.insert(5)
    tree.insert(3)
    tree.insert(2)
    tree.insert(1)
    tree.insert(6)
    tree.insert(9)
    tree.insert(12)

    const smallestNode = tree.subtree_first(tree.root);
    expect(smallestNode.content).toEqual(1);
  })

  test('should perform in-order traversal', () => {
    const tree = new BinaryTree();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);

    const traversalResult = tree.inOrderTraversal();
    expect(traversalResult).toEqual([5, 10, 15]);
  });

  test('should delete a node from the binary tree', () => {
    const tree = new BinaryTree();
    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(12);

    tree.delete(10);

    expect(tree.root.content).toBe(12);
    expect(tree.root.left.content).toBe(5);
    expect(tree.root.right.content).toBe(15);
  });
});