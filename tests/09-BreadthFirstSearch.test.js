const { AdjacencyListGraph } = require('../09-breadthFirstSearch/AdjacencyListGraph');


describe('AdjacencyListGraph', () => {
  let graph;

  beforeEach(() => {
    graph = new AdjacencyListGraph();
  });

  describe('Adding and Removing Vertices', () => {
    it('adds vertices correctly', () => {
      graph.addVertex('A');
      expect(graph.getVertices()).toContain('A');
    });

    it('removes vertices correctly', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.removeVertex('A');
      expect(graph.getVertices()).not.toContain('A');
    });
  });

  describe('Adding and Removing Edges', () => {
    it('adds edges correctly', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
      expect(graph.getEdges('A')).toContain('B');
      expect(graph.getEdges('B')).toContain('A');
    });

    it('removes edges correctly', () => {
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addEdge('A', 'B');
      graph.removeEdge('A', 'B');
      expect(graph.getEdges('A')).not.toContain('B');
      expect(graph.getEdges('B')).not.toContain('A');
    });
  });


  describe('Breadth First Search', () => {

  })
})



