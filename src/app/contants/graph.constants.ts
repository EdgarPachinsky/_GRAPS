export enum DirectionTypes {
  UNDIRECTED_GRAPH = 'undirectedGraph',
  DIRECTED_GRAPH = 'directedGraph'
}
export enum WeightTypes {
  UNWEIGHTED_GRAPH = 'unweightedGraph',
  WEIGHTED_GRAPH = 'weightedGraph'
}
export enum GraphCreateMode {
  ADD_NODE = 'addNode',
  ADD_EDGE = 'addEdge'
}
export const NODE_RADIUS = 20
export const NODE_INSIDE_TEXT_SIZE = 15
export const NODE_TO_NODE_EDGE_INSIDE_TEXT_SIZE = 12

export const HEAD_ANGLE = Math.PI / 6; // Arrow head angle (30 degrees)
export const HEAD_LENGTH = 10;
export const CURVE_OFFSET  = 35;

export const BOARD_WIDTH  = '600';
export const BOARD_HEIGHT  = '600';

// algorithm constants

// FORCE_DIRECTED - Eades Spring Embedder
export const FORCE_DIRECTED_EADES_SPRING_EMBEDDER_L = 300; // Natural spring length (adjust based on desired spacing)
export const FORCE_DIRECTED_EADES_SPRING_EMBEDDER_COOLDOWN = 0.99; // Controls movement per iteration (decrease for finer adjustments)
export const FORCE_DIRECTED_EADES_SPRING_EMBEDDER_C_REP = 1700; // Repulsion constant (increase for stronger repulsion)
export const FORCE_DIRECTED_EADES_SPRING_EMBEDDER_C_SPRING = 2; // Spring constant (increase for stronger attraction)

export const FORCE_DIRECTED_EADES_SPRING_EMBEDDER_EPSILON = 0.16; // Lower epsilon for finer convergence
export const FORCE_DIRECTED_EADES_SPRING_EMBEDDER_ITERATION_COUNT = 100000; // Start with a reasonable iteration count

export const MAXIMUM_ALLOWED_LOCAL_EXAMPLES_COUNT: number = 10;

export const ALGORITHM_NAMES = {
  FORCE_DIRECTED_EADES_SPRING_EMBEDDER: 'force-directed-eades-spring-embedder',
  DIJKSTRA: 'dijkstra',
  DFS_BASED_PATHS: 'dfs-based-paths',
  MST_KRUSKAL: 'mst-kruskal',
  MST_PRIM: 'mst-prim',
  BFS: 'bfs',
  DFS: 'dfs',
  ALL_PATHS_DFS_BASED: 'all-paths-dfs-based',
}
