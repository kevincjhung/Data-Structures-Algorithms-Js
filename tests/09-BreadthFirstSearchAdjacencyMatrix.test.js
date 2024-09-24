const { AdjacencyMatrixGraph } = require('../09-breadthFirstSearch/AdjacencyMatrixGraph');

describe('AdjacencyMatrixGraph', () => {
  let graph;


  beforeEach(() => {
    graph = new AdjacencyMatrixGraph(5) // Initialize with a specific number of vertices
  })

  describe('Adding and removing vertices', () => {
    it('adds vertices correctly', () => {
      graph.addVertex(1);
      expect(graph.getVertices()).toContain(1)
    });

    it('removes vertices correctly', () => {
      graph.addVertex(0);
      graph.addVertex(1);
      graph.addVertex(2);
      graph.addVertex(3);
      graph.removeVertex(0);

      expect(graph.getVertices()).not.toContain(0)
    })
  })

  describe('Adding and removing edges', () => {
    it('adds edges correctly', () => {
      graph.addVertex(1);
      graph.addVertex(2);

      graph.addEdge(1, 2)
      
      expect(graph.getEdges(1)).toContain(2)
      expect(graph.getEdges(2)).toContain(1)
      
    })
  })
})
