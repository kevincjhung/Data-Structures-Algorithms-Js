class Node {
    /**
     * Creates an instance of a Node.
     * @param {*} content - The content to be stored in the node.
     * @param {Node|null} parent - The parent node.
     * @param {Node|null} left - The left child node.
     * @param {Node|null} right - The right child node.
     */
    constructor(content, parent = null, left = null, right = null) {
        this.content = content; // Content of the node, can be any data type
        this.parent = parent;   // Pointer to the parent node
        this.left = left;       // Pointer to the left child node
        this.right = right;     // Pointer to the right child node
    }

    /**
     * Sets the left child of the node.
     * @param {Node} node - The node to be set as the left child.
     */
    setLeft(node) {
        this.left = node;
        if (node) {
            node.parent = this;
        }
    }

    /**
     * Sets the right child of the node.
     * @param {Node} node - The node to be set as the right child.
     */
    setRight(node) {
        this.right = node;
        if (node) {
            node.parent = this;
        }
    }
}




class BinaryTree {
    constructor() {
        this.root = null;
    }

    /**
     * Inserts a new value into the binary search tree.
     * @param {*} value - The value to insert.
     */
    insert(value) {
        if (!this.root) {
            this.root = new Node(value);
        } else {
            this._insertRecursive(this.root, value);
        }
    }

    /**
     * Helper function for recursive insertion of value into the binary tree.
     * it is called recursively to traverse the tree until it finds the appropriate 
     * position to insert the new value.
     * 
     * @param {Node} node - The current node.
     * @param {*} value - The value to insert.
     */
    _insertRecursive(node, value) {
        if (value < node.content) {
            if (!node.left) {
                node.setLeft(new Node(value));
            } else {
                this._insertRecursive(node.left, value);
            }
        } else {
            if (!node.right) {
                node.setRight(new Node(value));
            } else {
                this._insertRecursive(node.right, value);
            }
        }
    }

    /**
      * Performs in-order traversal of the binary tree.
      * This function is private as it's meant to be used internally by other methods.
      * @param {Node} node - The current node to start traversal from.
      * @param {Array} result - An array to store the result of traversal.
      */
    _inOrderTraversal(node, result) {
        if (node) {
            this._inOrderTraversal(node.left, result); // Visit left subtree
            result.push(node.content); // Visit root node
            this._inOrderTraversal(node.right, result); // Visit right subtree
        }
    }

    /**
     * Returns the in-order traversal of the binary tree.
     * @returns {Array} - An array containing nodes of the tree in in-order.
     */
    inOrderTraversal() {
        const result = [];
        this._inOrderTraversal(this.root, result);
        return result;
    }
}

// Example usage
const tree = new BinaryTree();
tree.insert(5);
tree.insert(3);
tree.insert(7);

console.log(tree.root); // Output: The root node of the binary tree

console.log(tree.inOrderTraversal()); // Output: [3, 5, 7]