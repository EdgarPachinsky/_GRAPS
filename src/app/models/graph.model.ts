import {DirectionTypes, WeightTypes} from "../contants/graph.constants";

export interface Node {
  x: number;
  y: number;
  isClicked?: boolean
  number: number
}

export interface Edge {
  id: string;
  isReverseEdge?: boolean
  from: Node;
  to: Node;
  weight?: number | string;
}

export interface GrapsDUMP {
  vertices: Node[],
  edges: Edge[],
  direction: DirectionTypes.DIRECTED_GRAPH | DirectionTypes.UNDIRECTED_GRAPH,
  weighted: WeightTypes.WEIGHTED_GRAPH | WeightTypes.UNWEIGHTED_GRAPH
}
