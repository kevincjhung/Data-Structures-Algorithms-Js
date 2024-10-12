class AdjacencyListGraph {
  constructor() {
    this.adjacencyList = new Map();
  }

  /**
   * 
   * @param {*} vertex - The vertex to add.
   */
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, [])
    }
  }

  /**
   * Adds an undirected edge between two vertices.
   * 
   * @param {*} sourceVertex - The starting vertex
   * @param {*} destinationVertex - The ending vertex
   */
  addEdge(sourceVertex, destinationVertex) {
    // Validate input vertices
    if (!sourceVertex || !destinationVertex) {
      throw new Error('Both vertices are required to add an edge.');
    }

    // Add vertices if they do not exist
    this.addVertex(sourceVertex);
    this.addVertex(destinationVertex);

    // Avoid duplicate edges
    if (!this.adjacencyList.get(sourceVertex).includes(destinationVertex)) {
      this.adjacencyList.get(sourceVertex).push(destinationVertex);
    }
    if (!this.adjacencyList.get(destinationVertex).includes(sourceVertex)) {
      this.adjacencyList.get(destinationVertex).push(sourceVertex);
    }
  }

  /**
   * Removes a vertex and its associated edges from the graph
   * 
   * @param {*} vertex - The vertex to remove.
   */
  removeVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      throw new Error('Vertex not found in the graph.');
    }

    // Remove the vertex from adjacency lists of other vertices
    this.adjacencyList.forEach((neighbors, key) => {
      this.adjacencyList.set(
        key,
        neighbors.filter(neighbor => neighbor !== vertex)
      );
    });

    // Remove the vertex itself
    this.adjacencyList.delete(vertex);
  }

  /**
   * Removes an edge between two vertices.
   * 
   * @param {*} sourceVertex
   * @param {*} destinationVertex
   */
  removeEdge(sourceVertex, destinationVertex) {
    if (!this.adjacencyList.has(sourceVertex) || !this.adjacencyList.has(destinationVertex)) {
      throw new Error('Both vertices are required to remove an edge.');
    }

    // Remove the edge in both directions
    this.adjacencyList.set(
      sourceVertex,
      this.adjacencyList.get(sourceVertex).filter(neighbor => neighbor !== destinationVertex)
    );

    this.adjacencyList.set(
      destinationVertex,
      this.adjacencyList.get(destinationVertex).filter(neighbor => neighbor !== sourceVertex)
    );
  }

  /**
   * Returns all vertices in the graph.
   * 
   * @returns {Array} An array with all vertices
   */
  getVertices() {
    return Array.from(this.adjacencyList.keys())
  }

  /**
   * Returns all edges associated with a given vertex. 
   * 
   * @param {*} vertex - The vertex of interest.
   * @returns {Array} The list of edges
   */
  getEdges(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      throw new Error('Vertex is not in adjacency list.')
    }

    return this.adjacencyList.get(vertex);
  }

  /**
   * Checks if a vertex exists in the graph.
   * @param {*} vertex - The vertex that is being checked
   * @returns {boolean} True if the vertex exists, false if it doesn't exist.
   */
  hasVertex(vertex) {
    return this.adjacencyList.has(vertex);
  }

  /**
   * Checks if an edge exists between two vertices.
   * 
   * @param {*} sourceVertex - The starting vertex
   * @param {*} destinationVertex - The ending vertex
   * @returns {boolean} True if the edge exists, false if it doesn't.
   */
  hasEdge(sourceVertex, destinationVertex) {
    if (!this.adjacencyList.has(sourceVertex) || !this.adjacencyList.has(destinationVertex)) {
      return false;
    }

    return this.adjacencyList.get(sourceVertex).includes(destinationVertex);    
  }

  /**
   * Returns the number of vertices in the graph.
   * 
   * @returns {number} The number of vertices.
   */
  vertexCount() {
    return this.adjacencyList.size;
  }

  /**
   * Checks if the graph is empty (i.e., has no vertices).
   * 
   * @returns {boolean} True if the graph is empty, false otherwise.
   */
  isEmpty() {
    return this.adjacencyList.size === 0;
  }

  /**
   * Performs depth-first search (DFS) starting from the given vertex.
   * @param {*} startVertex 
   * @returns {Object} Contains traversal order, distance map, and paths.
   * @private
   */
  _dfs(startVertex) {
    if (!this.adjacencyList.has(startVertex)) {
      throw new Error('Start vertex not found in graph')
    }

    const visited = new Set();
    const traversalOrder = [];
    const distances = {};
    const parents = {};
    const stack = [startVertex];

    // Initialize distances and parents
    for (const vertex of this.adjacencyList.keys()) {
      distances[vertex] = Infinity;
      parents[vertex] = null;
    }

    distances[startVertex] = 0;

    while (stack.length > 0) {
      const vertex = stack.pop();

      if (!visited.has(vertex)) {
        visited.add(vertex);
        traversalOrder.push(vertex);

        const depth = distances[vertex];

        for (const neighbor of this.adjacencyList.get(vertex)) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor)

            // Update the distance and parent only if the neighbor hasn't been visited yet
            if (distances[neighbor] === Infinity) {
              distances[neighbor] = depth + 1;
              parents[neighbor] = vertex;
            }
          }
        }
      }
    }

    return {
      traversalOrder,
      distances,
      parents,
    };
  }

  /**
   * Returns the list of vertices in the order they were visited during DFS.
   * 
   * @param {*} startVertex 
   * @returns {Array} The list of vertices in DFS order.
   */
  depthFirstSearch(startVertex) {
    const { traversalOrder } = this._dfs(startVertex);
    return traversalOrder;
  }


  /**
   * Checks whether there is a path between two vertices using DFS.
   * @returns {boolean}
   */
  isConnected() {
    const visited = new Set();
    const startVertex = this.getVertices()[0];
    if (!startVertex) return false;
  
    const { traversalOrder } = this._dfs(startVertex);
    return traversalOrder.length === this.vertexCount();
  }

  /**
   * Finds a path from one vertex to another using depth-first search
   * 
   * @param {*} startVertex - The starting vertex
   * @param {*} endVertex - The ending vertex
   * @returns {Array} The path from startVertex to endVertex, or an empty Array if no path exists
   * 
   */
  findPath(startVertex, endVertex) {
    const { parents } = this._dfs(startVertex);

    const path = [];
    let current = endVertex;

    while (current !== null) {
      path.unshift(current);
      current = parents[current]
    }

    return path[0] === startVertex ? path : [];
  }

  /**
   * Counts the number of connected components in the graph
   * 
   * @returns {number} The number of connected components.
   */
  countConnectedComponents() {
    const visited = new Set();
    let count = 0;

    for (const vertex of this.adjacencyList.keys()) {
      if (!visited.has(vertex)) {
        this._dfs(vertex);
        count++;
      }
    }
    return count;
  }

  /**
 * Detects cycles in the graph using DFS.
 * 
 * @returns {boolean} True if a cycle exists, false otherwise.
 */
detectCycle() {
  const visited = new Set();
  const recStack = new Set(); // To keep track of vertices in the current path

  // Iterate through each vertex in the graph
  for (const vertex of this.adjacencyList.keys()) {
    if (!visited.has(vertex)) {
      // Start DFS from the unvisited vertex
      if (this._detectCycleUtil(vertex, visited, recStack)) {
        return true; // Cycle found
      }
    }
  }
  return false; // No cycles found
}

/**
 * Utility function for cycle detection using DFS.
 * 
 * @param {*} vertex - The current vertex being visited.
 * @param {Set} visited - The set of visited vertices.
 * @param {Set} recStack - The recursion stack to track the path.
 * @returns {boolean} True if a cycle exists, false otherwise.
 * @private
 */
_detectCycleUtil(vertex, visited, recStack) {
  visited.add(vertex);
  recStack.add(vertex);

  // Explore neighbors
  for (const neighbor of this.adjacencyList.get(vertex)) {
    if (!visited.has(neighbor)) {
      // If the neighbor has not been visited, recursively visit it
      if (this._detectCycleUtil(neighbor, visited, recStack)) {
        return true; // Cycle found
      }
    } else if (recStack.has(neighbor)) {
      // If the neighbor is in the recursion stack, a cycle is detected
      return true;
    }
  }

  // Backtrack: remove current vertex from recursion stack
  recStack.delete(vertex);
  return false; // No cycle found from this vertex
}

  /**
   * Returns the list of adjacent vertices for a given vertex.
   * 
   * @param {*} vertex - The vertex for which adjacent vertices are being fetched.
   * @returns {Array} The list of adjacency vertices
   * @throws {Error} If the vertex is not in the graph
   */
  getAdjacentVertices(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      throw new Error('The vertex is not in the graph')
    }

    return this.adjacencyList.get(vertex);
  }

  /**
 * Performs topological sorting of the directed graph.
 * 
 * @returns {Array} An array containing the vertices in topologically sorted order.
 * @throws {Error} If the graph contains a cycle.
 */
  topologicalSort() {
    const stack = [];
    const inDegree = new Map(); // To track the in-degree of each vertex

    if (this.isEmpty()) return [];

    // Initialize in-degrees to 0
    for (const vertex of this.adjacencyList.keys()) {
      inDegree.set(vertex, 0);
    }

    // Calculate in-degrees of each vertex
    for (const vertex of this.adjacencyList.keys()) {
      for (const neighbor of this.adjacencyList.get(vertex)) {
        inDegree.set(neighbor, inDegree.get(neighbor) + 1);
      }
    }

    // Create a queue for vertices with no incoming edges (in-degree 0)
    const queue = [];
    for (const [vertex, degree] of inDegree) {
      if (degree === 0) {
        queue.push(vertex);
      }
    }

    // Process vertices until the queue is empty
    while (queue.length > 0) {
      const vertex = queue.shift(); // Dequeue a vertex
      stack.push(vertex); // Add to the topological order

      // Decrease in-degree of neighboring vertices
      for (const neighbor of this.adjacencyList.get(vertex)) {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1);
        // If in-degree becomes 0, add it to the queue
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor);
        }
      }
    }

    // If the stack size is not equal to the number of vertices, there is a cycle
    if (stack.length !== this.adjacencyList.size) {
      throw new Error('Graph contains a cycle; topological sort not possible.');
    }

    return stack; // Return the topological sort order
  }
}

module.exports = {
  AdjacencyListGraph
};