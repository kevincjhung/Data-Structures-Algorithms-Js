const { Node } = require('../07-avlTree/Node');
const { AVLTree } = require('../07-avlTree/AVLTree');


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


// TODO - insertion tests

// basic insertion, make sure it becomes the root of the tree

// multiple insertion

// verify that the tree remains balanced after each insertion

// ensure that duplicate keys are not inserted, and the tree remains the same afterwards


// TODO  - rotation tests

// write a scenario where left rotation is needed, test tree balance afterwards

// write a scenario where right rotation is needed, test tree balance afterwards

// write a scenario where left-right rotation is needed, test tree balance afterwards

// write a scenario where right-left rotation is needed, test tree balance afterwards


// TODO - in order traversal

// do in order traversal, then compare current element to previous, to make sure it is in fact in-order


// TODO - deletion

// deletion of nodes with one children

// deletion of nodes with two children


//  TODO - search

// search operations should return correct results

// TODO - edge cases

// deep tree - insert large number of nodes and test balance

