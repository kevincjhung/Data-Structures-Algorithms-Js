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
      graph.addVertex('C');
      graph.addEdge('A', 'B', 'C');
      graph.removeEdge('A', 'B');
      expect(graph.getEdges('A')).not.toContain('B');
      expect(graph.getEdges('B')).not.toContain('A');
    });
    
    describe('Returning vertices', () => {
      it('returns complete list of all vertices in the graph', () =>  {

        function addOne(){ return addOne + 1;}
        graph.addVertex('A')
        graph.addVertex('B')
        graph.addVertex('C')
        graph.addVertex(1)
        graph.addVertex(2)
        graph.addVertex(3)
        graph.addVertex(addOne)
        
        const vertexList = graph.getVertices();
        expect(vertexList).toStrictEqual(['A', 'B', 'C', 1, 2, 3, addOne])
      })
    })

  });



  describe('Breadth First Search', () => {

  })
})



