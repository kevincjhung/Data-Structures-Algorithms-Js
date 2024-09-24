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
      
    });

    it('removes edges correctly', () => {
      graph.addVertex(0);
      graph.addVertex(1);
      graph.addVertex(2);
      graph.addEdge(0, 1);
      graph.addEdge(0, 2);
      graph.removeEdge(0, 1);
      expect(graph.getEdges(0)).not.toContain(1);
      expect(graph.getEdges(1)).not.toContain(0);
    });
  });

  describe('Returning Vertices', () => {
    it('returns the complete list of lal vertices in the graph', () => {
      graph.addVertex(0);
      graph.addVertex(1);
      graph.addVertex(2);
      
      graph.addEdge(0,1);
      graph.addEdge(0,2);

      graph.removeEdge(0,1);

      expect(graph.getEdges(0)).not.toContain(1)
      expect(graph.getEdges(1)).not.toContain(0)
    })
  })

  describe('BreadthFirstSearch', () => {
    beforeEach(() => {
      graph.addVertex(0);
      graph.addVertex(1);
      graph.addVertex(2);
      graph.addVertex(3);
      graph.addVertex(4);

      graph.addEdge(0, 1);
      graph.addEdge(0, 2);
      graph.addEdge(1, 3);
      graph.addEdge(1, 4);
      graph.addEdge(2, 4);
    })

    it('performs BFS correctly', () => {
      const traversalOrderList = graph.breadthFirstSearch(0);
      const expectedOrder = [0, 1, 2, 3, 4];

      expect(traversalOrderList).toEqual(expectedOrder);
    })

    it('returns BFS shortest path correctly', () => {
      const shortestPath = graph.bfsShortestPath(0,4);

      expect(shortestPath).toEqual([0, 1, 4])
    })
  })
})
