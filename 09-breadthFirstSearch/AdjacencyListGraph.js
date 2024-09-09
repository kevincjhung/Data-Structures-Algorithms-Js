class AdjacencyListGraph {
  constructor(){
    this.adjacencyList = new Map();
  }
  
  /**
   * 
   * @param {*} vertex - The vertex to add.
   */
  addVertex(vertex){
    if(!this.adjacencyList.has(vertex)){
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
  removeVertex(vertex){
    if(!this.adjacencyList.has(vertex)){
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
  removeEdge(sourceVertex, destinationVertex){
    if(!this.adjacencyList.has(sourceVertex) || !this.adjacencyList.has(destinationVertex)){
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

  getVertices(){

  }

  getEdges(vertex){

  }

  hasVertex(vertex){
  }

  hasEdge(source, destination){
  
  }
  
  size(){

  }

  isEmpty(){

  }

  breadthFirstSearch(){

  }

  toString(){

  }
}

module.exports = {
  AdjacencyListGraph
};