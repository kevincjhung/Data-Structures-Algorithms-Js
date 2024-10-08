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

    // Search for a key in the AVL Tree
    search(key){
        return this._search(this.root, key)
    }

    _search(node, key){
        if(!node || node.content === key){
            return node
        }

        if(key < node.content){
            return this._search(node.left, key)
        } else if(node.content < key){
            return this._search(node.right, key)
        }
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

    // Get the node with the minimum key
    getMinValueNode(node){
        let current = node;

        while(current.left !== null){
            current = current.left;
        }
        return current
    }

    // Delete a key from the AVL tree
    delete(key) {
        this.root = this._delete(this.root, key);
    }

    // Recursive helper function to delete a key
    _delete(node, key) {
        if (!node) {
            return node;
        }

        if (key < node.content) {
            node.setLeft(this._delete(node.left, key));
        } else if (key > node.content) {
            node.setRight(this._delete(node.right, key));
        } else {
            if (!node.left || !node.right) {
                node = node.left ? node.left : node.right;
            } else {
                const temp = this.getMinValueNode(node.right);
                node.content = temp.content;
                node.setRight(this._delete(node.right, temp.content));
            }
        }

        if (!node) return node;

        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        const balance = this.getBalanceFactor(node);

        if (balance > 1 && this.getBalanceFactor(node.left) >= 0) {
            return this.rightRotate(node);
        }
        if (balance > 1 && this.getBalanceFactor(node.left) < 0) {
            node.setLeft(this.leftRotate(node.left));
            return this.rightRotate(node);
        }
        if (balance < -1 && this.getBalanceFactor(node.right) <= 0) {
            return this.leftRotate(node);
        }
        if (balance < -1 && this.getBalanceFactor(node.right) > 0) {
            node.setRight(this.rightRotate(node.right));
            return this.leftRotate(node);
        }

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

    // Check if AVL Tree is balanced
    isBalancedTree(node = this.root) {
        if (!node) return true;

        const balanceFactor = this.getBalanceFactor(node);
        if (Math.abs(balanceFactor) > 1) return false;

        return this.isBalancedTree(node.left) && this.isBalancedTree(node.right);
    }
}


module.exports = {
  AVLTree
};