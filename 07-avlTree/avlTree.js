const { Node } = require('./Node');


class AVLTree {
    constructor() {
        this.root = null; // Root of the tree
    }

    // Get the height of a node
    getHeight(node) {
        return node ? node.height : 0;
    }

    // Get the balance factor of a node
    getBalanceFactor(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // Perform a right rotation
    rightRotate(y) {
        const x = y.left;
        const t2 = x.right;

        // Perform rotation
        x.setRight(y);
        y.setLeft(t2);

        // Update heights
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

        // Return the new root
        return x;
    }

    // Perform a left rotation
    leftRotate(x) {
        const y = x.right;
        const t2 = y.left;

        // Perform rotation
        y.setLeft(x);
        x.setRight(t2);

        // Update heights
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

        // Return the new root
        return y;
    }

    // Insert a new key into the AVL tree
    insert(key) {
        this.root = this._insert(this.root, key);
    }

    // Recursive helper function to insert a key
    _insert(node, key) {
        if (!node) {
            const newNode = new Node(key);
            newNode.height = 1; // New node is initially at height 1
            return newNode;
        }

        if (key < node.content) {
            node.setLeft(this._insert(node.left, key));
        } else if (key > node.content) {
            node.setRight(this._insert(node.right, key));
        } else {
            // Duplicate keys are not allowed
            return node;
        }

        // Update height of the current node
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

        // Check the balance factor to see if this node is unbalanced
        const balance = this.getBalanceFactor(node);

        // Left Left Case
        if (balance > 1 && key < node.left.content) {
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && key > node.right.content) {
            return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && key > node.left.content) {
            node.setLeft(this.leftRotate(node.left));
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && key < node.right.content) {
            node.setRight(this.rightRotate(node.right));
            return this.leftRotate(node);
        }

        // Return the (unchanged) node pointer
        return node;
    }

    // Utility function for in-order traversal of the tree
    inOrderTraversal(node, result = []) {
        if (node) {
            this.inOrderTraversal(node.left, result);
            result.push(node.content);
            this.inOrderTraversal(node.right, result);
        }
        return result;
    }

    // Public method to get the in-order traversal of the AVL tree
    getInOrderTraversal() {
        return this.inOrderTraversal(this.root);
    }
}


module.exports = {
  AVLTree
};