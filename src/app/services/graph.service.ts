import { Injectable } from '@angular/core';
import {Edge, Node} from "../models/graph.model";
import {UtilsService} from "./utils.service";
import {E} from "@angular/cdk/keycodes";
import {DirectionTypes} from "../contants/graph.constants";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  public nodes: Node[] = [];
  public edges: Edge[] = [];

  constructor(
    public utilsService: UtilsService,
  ) { }

  toggleGraphJson(){
    this.utilsService.showGraphJson = !this.utilsService.showGraphJson;
  }
  toggleGrapsDumpImportInput(){
    this.utilsService.showGrapsDumpImportInput = !this.utilsService.showGrapsDumpImportInput;
  }
  getVertexFromNumber(nodeNumber: number | string){
    return this.nodes.find((node) => node.number === nodeNumber) as Node
  }
  getAllOtherVertexes(vertex: Node, vertexes: Node[]) {
    return vertexes.filter(V => V !== vertex)
  }
  getAllNeighbourVertexes(vertex: Node, edges: Edge[]) {
    return edges.filter(E => E.from.number === vertex.number).map((edge) => edge.to)
  }
  getAllOutgoingWeights(vertex: Node, graphType: DirectionTypes = DirectionTypes.DIRECTED_GRAPH) {
    let weights: Edge[] = [];
    if(graphType === DirectionTypes.DIRECTED_GRAPH){
      weights = this.edges.filter((edge) => edge.from.number === vertex.number)
    }else{
      weights = this.edges.filter((edge) =>
        (edge.from.number === vertex.number) ||
        (edge.to.number === vertex.number)
      )
    }
    return weights
  }
  getWeightsSortedFromShortToLong(vertex: Node, graphType: DirectionTypes = DirectionTypes.DIRECTED_GRAPH) {
    let allOutgoingWeights = [...this.getAllOutgoingWeights(vertex, graphType)];
    return allOutgoingWeights.sort((a:any, b:any) => a.weight - b.weight);
  }
  getWeightById(id:string){
    return this.edges.find((edge) => edge.id === id)
  }
}
