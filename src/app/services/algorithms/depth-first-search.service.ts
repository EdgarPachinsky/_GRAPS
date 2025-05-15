import { Injectable } from '@angular/core';
import {Subscription} from "rxjs";
import {Edge, Node} from "../../models/graph.model";
import {GraphService} from "../graph.service";
import {CanvasService} from "../canvas.service";
import {DirectionTypes} from "../../contants/graph.constants";
import {FormControl, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DepthFirstSearchService {

  private $subscriptions = new Subscription();

  visitedNodes: Node[] = [];
  result = [];

  iteration: number = 0;
  pausedIterator: number = 0;
  showInputs: boolean = false;

  animationId: number | null = null; // Store requestAnimationFrame ID
  isPaused: boolean = false;
  isPlaying: boolean = false;

  startNode!: Node;
  endNode!: Node;

  public pathDetails = '';
  public pathDetailsArray:any[] = [];
  public edgesToHighLight: Edge[] = [];

  startPointControl = new FormControl(1, [Validators.required]);
  endPointControl = new FormControl(5, [Validators.required]);

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
  ) {

  }

  toggleInputs(){
    this.showInputs = !this.showInputs
  }

  createNewLayout() {
    this.isPlaying = true;
    this.isPaused = false;

    this.iteration = this.pausedIterator; // Initialize from paused iterator

    const animateLayout = () => {

      let fromVertex = this.pathDetailsArray[this.iteration].from;
      let toVertexes = this.pathDetailsArray[this.iteration].to;

      toVertexes.forEach((vertex: Node) => {
        let edge =
          this.graphService.edges.find(
            (edge) => (

              this.canvasService.directionTypeControl.value === 'directedGraph' ?
                edge.from.number === fromVertex && edge.to.number === vertex.number :
                (
                  edge.from.number === fromVertex && edge.to.number === vertex.number ||
                  edge.to.number === fromVertex && edge.from.number === vertex.number
                )
            )
          )
        if(edge)
          this.edgesToHighLight.push(edge)
      })

      this.canvasService.drawGraph(
        false,
        this.edgesToHighLight
      )

      this.iteration++; // Update iteration
      this.pausedIterator = this.iteration; // Update paused iterator

      if(this.iteration === this.pathDetailsArray.length){
        console.log(`Animation over!`)
        this.iteration = 0;
        this.pausedIterator = this.iteration;
        this.isPlaying = false;
        this.isPaused = false;
        cancelAnimationFrame(this.animationId!);
        return;
      }
      setTimeout(() => {
        this.animationId = requestAnimationFrame(animateLayout);
      },300)
    };
    this.animationId = requestAnimationFrame(animateLayout);
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

  DepthFirstSearchRec(
    visitedNodes: Node[],
    node: Node,
    result: Node[]
  ){

    visitedNodes.push(
      node
    );

    result.push(node);

    let neighbours = this.graphService.getAllNeighbourNodes(
      node,
      this.graphService.nodes,
      this.canvasService.directionTypeControl?.value as DirectionTypes
    )


    if(neighbours.length){
      neighbours.forEach((neighbour: Node) => {

        if(!visitedNodes.find((visitedNode: Node) => visitedNode.number === neighbour.number)){
          this.pathDetails +=
            `From ${node.number} -> To ${neighbour.number} <br>`

          this.pathDetailsArray.push({
            from: node.number,
            to: [neighbour]
          })

          this.DepthFirstSearchRec(
            visitedNodes, neighbour, result
          )
        }
      })
    }
  }

  DepthFirstSearch(){
    this.dumpGlobals();
    this.startNode = this.graphService.getVertexFromNumber(
      parseInt(this.startPointControl.value?.toString() || '1')
    );

    this.DepthFirstSearchRec(
      this.visitedNodes,
      this.startNode,
      this.result
    );

    this.createNewLayout();
  }

  dumpGlobals(){
    this.pathDetails = '';
    this.pathDetailsArray = [];
    this.result = [];
    this.visitedNodes = [];

    this.edgesToHighLight = [];
    this.canvasService.drawGraph(false)
  }
}
