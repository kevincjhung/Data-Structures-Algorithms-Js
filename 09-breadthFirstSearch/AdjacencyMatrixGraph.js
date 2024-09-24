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
   if (this.hasVertex(vertex)){
    throw new Error(`Vertex ${vertex} already exists`);
   }

   this.vertices.add(vertex)
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
    this.adjMatrix[srcIndex][destIndex] = 1; // Set edge from source to destination
    this.adjMatrix[destIndex][srcIndex] = 1; // If undirected, also set edge from destination to source
  }
  
  /**
   * Removes a vertex from the graph along with its edges
   * @param {any} vertex - The vertex to be removed
   * @throws {Error} If the veretx does not exist
   */
  removeVertex(vertex) {
    if (!this.hasVertex(vertex)) {
      throw new Error(`Vertex ${vertex} does not exist`);
    }
  
    this.vertices.delete(vertex);
    const index = [...this.vertices].indexOf(vertex);
  
    this.adjMatrix.splice(index, 1); // Remove the row
    this.adjMatrix.forEach(row => row.splice(index, 1)); // Remove the column
    this.numVertices--;
  }
  /**
   * Removes an edge between two vertices
   * @param {any} sourceVertex - The source vertex
   * @param {*} destinationVertex - The destination vertex
   * @throws {Error} If the edge doesn't exist
   */
  removeEdge(sourceVertex, destinationVertex) {
    if(this.hasEdge(sourceVertex, destinationVertex)){
      throw new Error(`the edge ${sourceVertex} - ${destinationVertex} does not exist`)
    }

    const srcIndex = [...this.vertices].indexOf(sourceVertex)
    const destIndex = [...this.vertices].indexOf(destinationVertex)
    this.adjMatrix[srcIndex][destIndex] = 0; // remove the edge
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
    if(!this.hasVertex(vertex)){
      throw new Error(`The given vertex ${vertex} doesn't exist`)
    }

    const index = [...this.vertices].indexOf(vertex)
    const edges = [];
    for(let i = 0; i < this.numVertices; i++){
      if(this.adjMatrix[index][i] === 1){
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
   if (!this.hasVertex(sourceVertex) || !this.hasVertex(destinationVertex)){
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
   * Performs a breadth-first search starting from a given vertex
   * @param {any} startVertex - The starting vertex
   * @returns {Array<any>} the order of vertices visited 
   * @throws {Error} If the start vertex does not exist
   * @private
   */
  _bfs(startVertex) {
    const visited = new Set()
    const queue = [];
    const traversalOrder = [];
    
    visited.add(startVertex)
    queue.push(startVertex)

    while(queue.length > 0){
      const vertex = queue.shift
      traversalOrder.push(vertex);

      const edges = this.getEdges(vertex);

      for(const edge of edges){
        if(!visited.has(edge)){
          visited.add(edge);
          queue.push(edge);
        }
      }
    }

    return traversalOrder;
  }

  /**
   * Initiates breadth-first search from a starting vertex
   * @param {*} startVertex 
   */
  breadthFirstSearch(startVertex) {
    if(!this.hasVertex(startVertex)){
      throw new Error(`The vertex ${startVertex} does not exist`)
    }

    return this._bfs(startVertex);
  }

  /**
   * Gets a distance map from the starting vertex to all other vertices using BFS
   * @param {*} startVertex - The starting vertex. 
   * @returns {Object} A map of vertices and their distance from the starting vertex
   */
  bfsDistanceMap(startVertex) {
    const distanceMap = {};
    const queue = [];
    const visited = new Set() // use of set to ensure that each vertex is only marked as visited once

    visited.add(startVertex);
    queue.push([startVertex, 0]);

    while(queue.length > 0){
      const [vertex, distance] = queue.shift();
      distanceMap[vertex] = distance;

      const edges = this.getEdges(vertex);
      for(const edge of edges){
        if (!visited.has(edge)){
          visited.add(edge) // mark edge as visited
          queue.push([edge, distance + 1])
        }
      }
    }

    return distanceMap;
  }

  /**
   * Gets the shortest path distance between two vertices using BFS
   * @param {any} startVertex - The starting vertex
   * @param {any} endVertex - The ending vertex
   */
  bfsShortestPath(startVertex, endVertex) {
    const distanceMap = this.bfsDistanceMap(startVertex)
    return distanceMap[endVertex] !== undefined ? distanceMap[endVertex] : null;
  }
}


module.exports = {
  AdjacencyMatrixGraph
};