class AdjacencyMatrixGraph {
  constructor() {
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
    if (this.hasVertex(sourceVertex) || this.hasVertex(destinationVertex)){
      throw new Error(`One or both vertices do not exist`)
    }

    const srcIndex = [...this.vertices].indexOf(sourceVertex)
    const destIndex = [...this.vertices].indexOf(destinationVertex)
    this.adjMatrix = [srcIndex][destIndex] // set edge from source to destination
  }
  
  /**
   * Removes a vertex from the graph along with its edges
   * @param {any} vertex - The vertex to be removed
   * @throws {Error} If the veretx does not exist
   */
  removeVertex(vertex) {
    if(!this.hasVertex){
      throw new Error(`Vertex ${vertex} does not exist`)
    }

    this.vertices.delete(vertex);
    const index = [...this.vertices].indexOf(vertex)

    this.adjMatrix.splice(index, 1) // remove the row
    this.adjMatrix.forEach(row => row.splice(index, 1))
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

    const index = [...this.vertex].indexOf(vertex)
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


  hasEdge(sourceVertex, destinationVertex) {
   
  }

  vertexCount() {
   
  }

  isEmpty() {
    
  }


  _bfs(startVertex) {

  }


  breadthFirstSearch(startVertex) {

  }

  bfsDistanceMap(startVertex) {
    
  }

  bfsShortestPath(startVertex, endVertex) {
    
  }
}


module.exports = {
  AdjacencyMatrixGraph
};