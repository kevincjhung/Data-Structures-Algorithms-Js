class AdjacencyMatrixGraph {
  constructor(numVertices) {
    // Initializes the number of vertices and the adjacency matrix with zeroes
    this.numVertices = numVertices;
    this.adjMatrix = Array.from({ length: numVertices }, () => Array(numVertices).fill(0));
    this.vertices = new Set();
  }


  /**
   * Adds a vertex to the graph
   * @param {*} vertex 
   * @throws {Error} If the vertex already exists
   */
  addVertex(vertex) {
    if (this.hasVertex(vertex)) {
      throw new Error(`Vertex ${vertex} already exists`);
    }

    this.vertices.add(vertex)
    this.numVertices++; // Increase vertex count

    this.adjMatrix.forEach(row => row.push(0)); // Add a new column
    this.adjMatrix.push(Array(this.numVertices).fill(0)); // Add a new row
  }


  /**
   * Adds an edge between two vertices. 
   * @param {*} sourceVertex 
   * @param {*} destinationVertex 
   */
  addEdge(sourceVertex, destinationVertex) {
    if (!this.hasVertex(sourceVertex) || !this.hasVertex(destinationVertex)) {
      throw new Error(`One or both vertices do not exist`);
    }

    const srcIndex = [...this.vertices].indexOf(sourceVertex);
    const destIndex = [...this.vertices].indexOf(destinationVertex);

    // Check if the edge already exists
    if (this.adjMatrix[srcIndex][destIndex] === 1) {
      throw new Error(`Edge ${sourceVertex} - ${destinationVertex} already exists`);
    }

    this.adjMatrix[srcIndex][destIndex] = 1; // Set edge from source to destination
    this.adjMatrix[destIndex][srcIndex] = 1; // If undirected, also set edge from destination to source
  }


  /**
   * Removes a vertex from the graph along with its edges
   * @param {any} vertex - The vertex to be removed
   * @throws {Error} If the vertex does not exist
   */
  removeVertex(vertex) {
    if (!this.hasVertex(vertex)) {
      throw new Error(`Vertex ${vertex} does not exist`);
    }

    const index = [...this.vertices].indexOf(vertex); // Get index before removing the vertex

    this.vertices.delete(vertex); // Remove the vertex from the set

    // Remove the corresponding row and column in the adjacency matrix
    this.adjMatrix.splice(index, 1); // Remove the row
    this.adjMatrix.forEach(row => row.splice(index, 1)); // Remove the column
    this.numVertices--; // Decrease the count of vertices
  }


  /**
   * Removes an edge between two vertices
   * @param {any} sourceVertex - The source vertex
   * @param {*} destinationVertex - The destination vertex
   * @throws {Error} If the edge doesn't exist
   */
  removeEdge(sourceVertex, destinationVertex) {
    if (!this.hasEdge(sourceVertex, destinationVertex)) {
      throw new Error(`the edge ${sourceVertex} - ${destinationVertex} does not exist`)
    }

    const srcIndex = [...this.vertices].indexOf(sourceVertex)
    const destIndex = [...this.vertices].indexOf(destinationVertex)
    this.adjMatrix[srcIndex][destIndex] = 0; // remove the edge
    this.adjMatrix[destIndex][srcIndex] = 0; // remove the edge
  }

  /**
   * Gets all vertices in the graph
   * @returns {Array<any>} An array of vertices
   */
  getVertices() {
    return [...this.vertices]
  }

  /**
   * Gets all edges connected to a specific vertex
   * @param {*} vertex - The vertex whose edges is will be returned
   * @returns {Array<any>} An array of connected vertices
   * @throws {Error} If the vertex doesn't exist
   */
  getEdges(vertex) {
    if (!this.hasVertex(vertex)) {
      throw new Error(`The given vertex ${vertex} doesn't exist`)
    }

    const index = [...this.vertices].indexOf(vertex)
    const edges = [];
    for (let i = 0; i < this.numVertices; i++) {
      if (this.adjMatrix[index][i] === 1) {
        edges.push([...this.vertices][i])
      }
    }
    return edges;
  }

  /**
   * Checks if a vertex exists in the graph
   * @param {any} vertex - The vertex to check
   * @returns {boolean} True if the vertex exists, false otherwise
   */
  hasVertex(vertex) {
    return this.vertices.has(vertex);
  }

  /**
   * Checks if an edge exists between two vertices
   * @param {any} sourceVertex - The source Vertex
   * @param {any} destinationVertex - The destination Vertex
   * @returns 
   */
  hasEdge(sourceVertex, destinationVertex) {
    if (!this.hasVertex(sourceVertex) || !this.hasVertex(destinationVertex)) {
      return false
    }

    const srcIndex = [...this.vertices].indexOf(sourceVertex);
    const destIndex = [...this.vertices].indexOf(destinationVertex);
    return this.adjMatrix[srcIndex][destIndex] === 1;
  }

  /**
   * Gets the number of vertices in the graph
   * @returns {number} The number of vertices.
   */
  vertexCount() {
    return this.vertices.size;
  }

  /**
   * Gets the count of vertices in the graph
   * @returns {number} The number of vertices.
   */
  isEmpty() {
    return this.vertexCount() === 0;
  }

  /**
   * Performs a depth-first search starting from a given vertex
   * @param {any} startVertex - The starting vertex
   * @returns {Array<any>} the order of vertices visited 
   * @throws {Error} If the start vertex does not exist
   * @private
   */
  _dfs(startVertex) {
    const visited = new Set();
    const queue = [];
    const traversalOrder = [];

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift(); // Fixed here
      traversalOrder.push(vertex);

      const edges = this.getEdges(vertex);

      for (const edge of edges) {
        if (!visited.has(edge)) {
          visited.add(edge);
          queue.push(edge);
        }
      }
    }

    return traversalOrder;
  }

  /**
   * Initiates depth-first search from a starting vertex
   * @param {*} startVertex 
   */
  depthFirstSearch(startVertex) {
    if (!this.hasVertex(startVertex)) {
      throw new Error(`The vertex ${startVertex} does not exist`)
    }

    return this._dfs(startVertex);
  }




  /**
    * Gets the shortest path between two vertices using DFS.
    * It tracks the predecessors of each visited vertex to reconstruct
    * the path once the ending vertex is reached.
    * 
    * @param {any} startVertex - The starting vertex for the search.
    * @param {any} endVertex - The ending vertex for which the shortest path is sought.
    * @returns {Array<any>} An array representing the shortest path of vertices from 
    *                       the startVertex to the endVertex. If no path exists, 
    *                       an empty array is returned.
    */
  dfsShortestPath(startVertex, endVertex) {
    const visited = new Set();
    const queue = [];
    const predecessors = new Map(); // To track the path

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
      const vertex = queue.shift();

      if (vertex === endVertex) {
        // Path found, reconstruct the path
        const path = [];
        let current = endVertex;
        while (current !== startVertex) {
          path.push(current);
          current = predecessors.get(current);
        }
        path.push(startVertex);
        return path.reverse(); // Return the path in correct order
      }

      const edges = this.getEdges(vertex);
      for (const edge of edges) {
        if (!visited.has(edge)) {
          visited.add(edge);
          queue.push(edge);
          predecessors.set(edge, vertex); // Set predecessor
        }
      }
    }

    return []; // Return empty array if no path found
  }



  /**
   * Checks whether there is a path between two vertices using DFS.
   * 
   * @param {any} startVertex - The starting vertex.
   * @param {any} endVertex - The ending vertex.
   * @returns {boolean}
   */
  isConnected(startVertex, endVertex) {
    return this.dfsShortestPath(startVertex, endVertex).length > 0;
  }

  /**
   * Finds a path between two vertices using DFS.
   * 
   * @param {any} startVertex - The starting vertex. 
   * @param {any} endVertex - The ending vertex. 
   * @returns {boolean} True if there is a path, false otherwise.
   */
  findPath(startVertex, endVertex) {
    return this.dfsShortestPath(startVertex, endVertex);
  }

  /**
   * Counts the number of connected components in the graph.
   * 
   * @returns {number} The number of connected components.
   */
  countConnectedComponents() {
    const visited = new Set();
    let count = 0;

    for (const vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        count++;
        this._dfsCountComponents(vertex, visited);
      }
    }

    return count;
  }

  /**
   * Helper function for counting connected components using DFS.
   * 
   * @param {any} vertex - the starting vertex for DFS.
   * @param {Set} visited - The set of visited vertices.
   * @private
   */
  _dfsCountComponents(vertex, visited) {
    visited.add(vertex);

    const edges = this.getEdges(vertex);

    for (const edge in edges) {
      if (!visited.has(edge)) {
        this._dfsCountComponents(edge, visited);
      }
    }
  }

  /**
   * Detects if there is a cycle in the graph using DFS
   * 
   * @returns {boolean} true if a cycle exists, false otherwise.
   */
  detectCycle() {
    const visited = new Set();
    const recursionStack = new Set();

    for (const vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        if (this._detectCycleDFS(vertex, visited, recursionStack)) {
          return true;
        }
      }
    }

    return false;
  }

  /**
 * Helper function for cycle detection using DFS.
 * @param {any} vertex - The current vertex.
 * @param {Set} visited - The set of visited vertices.
 * @param {Set} recursionStack - The recursion stack for DFS.
 * @returns {boolean} True if a cycle is found, false otherwise.
 * @private
 */
  _detectCycleDFS(vertex, visited, recursionStack) {
    visited.add(vertex);
    recursionStack.add(vertex);

    const edges = this.getEdges(vertex);
    for (const edge of edges) {
      if (!visited.has(edge)) {
        if (this._detectCycleDFS(edge, visited, recursionStack)) {
          return true;
        }
      } else if (recursionStack.has(edge)) {
        return true; // Cycle detected
      }
    }

    recursionStack.delete(vertex);
    return false;
  }


  /**
  * Gets all adjacent vertices for a specific vertex.
  * @param {any} vertex - The vertex for which adjacent vertices are needed.
  * @returns {Array<any>} An array of adjacent vertices.
  * @throws {Error} If the vertex doesn't exist.
  */
  getAdjacentVertices(vertex) {
    if (!this.hasVertex(vertex)) {
      throw new Error(`The given vertex ${vertex} doesn't exist`);
    }

    const index = [...this.vertices].indexOf(vertex);
    const adjacent = [];

    for (let i = 0; i < this.numVertices; i++) {
      if (this.adjMatrix[index][i] === 1) {
        adjacent.push([...this.vertices][i]);
      }
    }

    return adjacent;
  }


  /**
 * Performs a topological sort on the graph.
 * @returns {Array<any>} An array representing the topological order of vertices.
 * @throws {Error} If the graph contains a cycle.
 */
  topologicalSort() {
    const visited = new Set();
    const stack = [];

    for (const vertex of this.getVertices()) {
      if (!visited.has(vertex)) {
        this._topologicalSortDFS(vertex, visited, stack);
      }
    }

    return stack.reverse(); // Return the stack in reverse order
  }

  /**
   * Helper function for topological sort using DFS.
   * @param {any} vertex - The current vertex.
   * @param {Set} visited - The set of visited vertices.
   * @param {Array} stack - The stack to hold the topological order.
   * @private
   */
  _topologicalSortDFS(vertex, visited, stack) {
    visited.add(vertex);

    const edges = this.getEdges(vertex);
    for (const edge of edges) {
      if (!visited.has(edge)) {
        this._topologicalSortDFS(edge, visited, stack);
      }
    }

    stack.push(vertex); // Push the vertex to stack after visiting all its edges
  }
}


module.exports = {
  AdjacencyMatrixGraph
};