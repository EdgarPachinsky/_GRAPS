import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {Edge, Node} from "../../models/graph.model";
import {GraphService} from "../graph.service";
import {CanvasService} from "../canvas.service";
import {DirectionTypes} from "../../contants/graph.constants";

@Injectable({
  providedIn: 'root'
})
export class MstPrimsAlgorithmService {

  private $subscriptions = new Subscription();

  iteration: number = 0;
  pausedIterator: number = 0;

  animationId: number | null = null; // Store requestAnimationFrame ID
  isPaused: boolean = false;
  isPlaying: boolean = false;

  setOfSubSets: number[][] = [ [] ];
  totalCostOfMinimumSpanningTree = 0;
  edgesSorted: Edge[] = [];
  edgesToHighLight: Edge[] = [];
  currentNode!: Node;
  visitedVertexes: number[] = [];

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
  ) {

  }

  pauseAnimation() {
    this.isPlaying = false;
    this.isPaused = true; // Set the pause flag
    cancelAnimationFrame(this.animationId!); // Stop the current animation frame
  }

  stopAnimation() {
    this.isPlaying = false;
    this.isPaused = false; // Set the pause flag

    this.animationId = null;
    this.iteration = 0;
    this.pausedIterator = this.iteration;

    this.canvasService.clearBoard();

    cancelAnimationFrame(this.animationId!); // Stop the current animation frame
  }

  createNewLayout() {
    this.isPlaying = true;
    this.isPaused = false;
    this.iteration = this.pausedIterator; // Initialize from paused iterator

    const animateLayout = () => {

      let allEdges: any[] = []

      for (let i = 0; i < this.visitedVertexes.length; i++) {
        let currentVertex: Node = this.graphService.getVertexFromNumber(this.visitedVertexes[i])

        let edges = this.parseWeightsToNumber(
          this.graphService.getWeightsSortedFromShortToLong(
            currentVertex, this.canvasService.directionTypeControl.value as DirectionTypes
          )
        );

        allEdges = allEdges.concat(edges)
      }

      let allEdgesSorted = allEdges.sort((a: any, b: any) => a.weight - b.weight)

      for (let j = 0; j < allEdgesSorted.length; j++) {
        let currentEdge = allEdgesSorted[j]

        if(this.edgesToHighLight.find((edge) => edge.id === currentEdge.id)){
          continue;
        }

        let nextToPushInVisitedEdges: Node | null = !this.visitedVertexes.includes(currentEdge.to.number) ?
          currentEdge.to: ( !this.visitedVertexes.includes(currentEdge.from.number) ? currentEdge.from : null )

        if(!nextToPushInVisitedEdges){
          continue;
        }

        this.visitedVertexes.push(
          nextToPushInVisitedEdges.number
        );
        this.edgesToHighLight.push(
          currentEdge
        )
        break;
      }

      console.log(`this.visitedVertexes ` , [...this.visitedVertexes])

      this.canvasService.drawGraph(
        false,
        this.edgesToHighLight
      )

      this.iteration++; // Update iteration
      this.pausedIterator = this.iteration; // Update paused iterator

      if(this.iteration === this.graphService.edges.length){
        this.iteration = 0;
        this.pausedIterator = this.iteration;
        this.isPlaying = false;
        this.isPaused = false;
        cancelAnimationFrame(this.animationId!);
        return;
      }

      setTimeout(() => {
        this.animationId = requestAnimationFrame(animateLayout);
      }, 100)
    };

    this.animationId = requestAnimationFrame(animateLayout);
  }

  PrimsMST(){
    this.isPlaying = true;
    this.totalCostOfMinimumSpanningTree = 0;
    this.edgesToHighLight = [];
    this.visitedVertexes = [];

    // start from first vertex as default
    // and push in visited vertexes array
    this.visitedVertexes.push(1)
    this.currentNode = this.graphService.getVertexFromNumber(1);

    this.createNewLayout()
  }

  parseWeightsToNumber(edges: Edge[]){
    return edges.map((edge) => { edge.weight = Number(edge.weight); return edge });
  }
}
