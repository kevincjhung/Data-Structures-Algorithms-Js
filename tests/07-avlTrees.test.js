const { Node } = require('../07-avlTree/avlTree');

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