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


module.exports = { 
	Node
};