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
    beforeEach(() => {
      for(let i = 1; i <= 12; i++) {
        graph.addVertex(i);
      }

      graph.addEdge(1, 2);
      graph.addEdge(1, 3);
      graph.addEdge(1, 4);
      graph.addEdge(2, 5);
      graph.addEdge(2, 6);
      graph.addEdge(4, 7);
      graph.addEdge(4, 8);
      graph.addEdge(5, 9);
      graph.addEdge(5, 10);
      graph.addEdge(7, 11);
      graph.addEdge(7, 12);
    });

    it('performs BFS correctly', () => {
      const traversalOrderList = graph.breadthFirstSearch(1);
      const expectedOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      expect(traversalOrderList).toEqual(expectedOrder);
    });

    it('returns BFS distance map correctly', () => {
      const distanceMap = graph.bfsDistanceMap(1);
      expect(distanceMap.get(1)).toBe(0);
      expect(distanceMap.get(2)).toBe(1);
      expect(distanceMap.get(3)).toBe(1);
      expect(distanceMap.get(4)).toBe(1);
      expect(distanceMap.get(5)).toBe(2);
      expect(distanceMap.get(6)).toBe(2);
      expect(distanceMap.get(7)).toBe(2);
      expect(distanceMap.get(8)).toBe(2);
      expect(distanceMap.get(9)).toBe(3);
      expect(distanceMap.get(10)).toBe(3);
      expect(distanceMap.get(11)).toBe(3);
      expect(distanceMap.get(12)).toBe(3);
    });

    it('returns BFS shortest path correctly', () => {
      const shortestPath = graph.bfsShortestPath(1, 10);
      expect(shortestPath).toEqual([1, 2, 5, 10]);
    });
  });
})



