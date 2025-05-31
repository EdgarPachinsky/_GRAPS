import {Injectable} from '@angular/core';
import {Edge, GrapsDUMP, Node} from "../models/graph.model";
import {UtilsService} from "./utils.service";
import {ALGORITHM_NAMES, DirectionTypes, WeightTypes} from "../contants/graph.constants";
import {D} from "@angular/cdk/keycodes";
import {CanvasService} from "./canvas.service";
import {MatDialog} from "@angular/material/dialog";
import {
  AlgorithmExplanationComponent
} from "../board/components/dialogs/algorithm-explanation/algorithm-explanation.component";
import {HowToUseComponent} from "../board/components/dialogs/how-to-use/how-to-use.component";
import {AchievementsComponent} from "../board/components/dialogs/achievements/achievements.component";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  public nodes: Node[] = [];
  public edges: Edge[] = [];

  public graphInstances:GrapsDUMP[] = [];

  constructor(
    public utilsService: UtilsService,
    public matDialog: MatDialog,
    // public canvasService: CanvasService,
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

  getAllNeighbourNodes(vertex: Node, NODES: Node[], graphType: DirectionTypes = DirectionTypes.DIRECTED_GRAPH) {
    let nodes: Node[] = [];

    let allOutgoingEdges = this.getAllOutgoingWeights(vertex, graphType);

    if(allOutgoingEdges.length){
      allOutgoingEdges.forEach((outgoingEdge) => {
        if(outgoingEdge.from.number === vertex.number){
          nodes.push(outgoingEdge.to);
          return
        }

        nodes.push(outgoingEdge.from);
      })
    }

    return nodes
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

  activateInstance(instance: GrapsDUMP){
    this.edges = instance.edges;
    this.nodes = instance.vertices;
  }

  openAlgorithmExplanationModal(
    algorithm: string,
  ){
    this.matDialog.open(AlgorithmExplanationComponent, {
      data: {
        algorithm
      }
    })
  }

  openHowToUse(){
    this.matDialog.open(HowToUseComponent, {})
  }

  openAchievements(){
    this.matDialog.open(AchievementsComponent, {
      autoFocus: false
    })
  }
}
