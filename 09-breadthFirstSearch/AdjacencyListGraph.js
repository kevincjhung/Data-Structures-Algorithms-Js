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
   * @param {*} sourceVertex 
   * @param {*} destinationVertex 
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
   * @param {*} vertex - The veretx to remove
   */
  removeVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      throw new Error('Vertex to be removed is not found.')
    }

    // remove edges to the vertex
    this.adjacencyList.forEach((edges, key) => {
      const index = edges.indexOf(vertex);
      if (index !== -1) {
        edges.splice(index, 1);
      }
    })

    // remove the vertex
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
      throw new Error('Both vertices are required to remove an edge.')
    }

    const sourceList = this.adjacencyList.get(sourceVertex);
    const destinationList = this.adjacencyList.get(destinationVertex);

    const sourceIndex = sourceList.indexOf(destinationVertex);
    const destinationIndex = destinationList.indexOf(sourceVertex);

    if (sourceIndex !== -1) {
      sourceList.splice(sourceIndex, 1);
    }
    if (destinationIndex !== -1) {
      destinationList.splice(destinationIndex, 1);
    }
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
   * @param {*} sourceVertex 
   * @param {*} destinationVertex 
   * @returns {boolean} True if the edge exists, false if it doesn't.
   */
  hasEdge(sourceVertex, destinationVertex) {
    if (!this.adjacencyList.has(sourceVertex) || !this.adjacencyList.has(destinationVertex)) {
      return false;
    }
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
   * Performs breadth-first search (BFS) starting from the given vertex.
   * @param {*} startVertex 
   * @returns {Object} Contains traversal order, distance map, and paths.
   * @private
   */
  _bfs(startVertex) {
    const visited = new Set();
    const queue = [startVertex];
    const traversalOrder = [];
    const distanceMap = new Map();
    const paths = new Map();

    distanceMap.set(startVertex, 0);
    paths.set(startVertex, [startVertex]);

    while (queue.length > 0) {
      const vertex = queue.shift();

      if (!visited.has(vertex)) {
        visited.add(vertex);
        traversalOrder.push(vertex);

        for (const neighbor of this.adjacencyList.get(vertex)) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
            if (!distanceMap.has(neighbor)) {
              distanceMap.set(neighbor, distanceMap.get(vertex) + 1);
            }
            if (!paths.has(neighbor)) {
              paths.set(neighbor, [...paths.get(vertex), neighbor]);
            }
          }
        }
      }
    }

    return { traversalOrder, distanceMap, paths };
  }

  /**
   * Returns the list of vertices in the order they were visited during BFS.
   * 
   * @param {*} startVertex 
   * @returns {Array} The list of vertices in BFS order.
   */
  breadthFirstSearch(startVertex) {
    const { traversalOrder } = this._bfs(startVertex);
    return traversalOrder;
  }

  /**
   * Returns the distance map from the start vertex to all other vertices.
   * 
   * @param {*} startVertex 
   * @returns {Map} The distance map.
   */
  bfsDistanceMap(startVertex) {
    const { distanceMap } = this._bfs(startVertex);
    return distanceMap;
  }

  /**
   * Returns the shortest path from the start vertex to the end vertex.
   * @param {*} startVertex 
   * @param {*} endVertex 
   * @returns {Array} The shortest path.
   */
  bfsShortestPath(startVertex, endVertex) {
    const { paths } = this._bfs(startVertex);
    return paths.get(endVertex) || [];
  }
}


module.exports = {
  AdjacencyListGraph
};