import {Injectable} from '@angular/core';
import {Subscription} from "rxjs";
import {GraphService} from "../graph.service";
import {CanvasService} from "../canvas.service";
import {FormControl, Validators} from "@angular/forms";
import {Edge, Node} from "../../models/graph.model";
import {DirectionTypes} from "../../contants/graph.constants";

@Injectable({
  providedIn: 'root'
})
export class FindAllAvailablePathsService {
  private $subscriptions = new Subscription();

  visitedNodes: Node[] = [];
  result = [];

  iteration: number = 0;
  pausedIterator: number = 0;

  animationId: number | null = null; // Store requestAnimationFrame ID
  isPaused: boolean = false;
  isPlaying: boolean = false;

  showInputs: boolean = false;
  startPointControl = new FormControl(1, [Validators.required]);
  endPointControl = new FormControl(5, [Validators.required]);

  startNode!: Node;
  endNode!: Node;

  public pathDetails = '';
  public pathDetailsArray: any[] = [];
  public edgesToHighLight: Edge[] = [];

  public paths: Node[][] = [];
  public pathDetailsList: { label: string, path: Node[] }[] = [];
  public highLightCurrentPath: number = -1;

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
  ) {
  }

  toggleInputs() {
    this.showInputs = !this.showInputs
  }

  DepthFirstSearchRec(
    visitedNodes: Node[],
    node: Node,
    result: Node[],
    currentPath: Node[] = []
  ) {
    currentPath.push(node);
    visitedNodes.push(node);
    result.push(node);

    let neighbours = this.graphService.getAllNeighbourNodes(
      node,
      this.graphService.nodes,
      this.canvasService.directionTypeControl?.value as DirectionTypes
    );

    for (const neighbour of neighbours) {
      if (visitedNodes.find(n => n.number === neighbour.number)) {
        continue; // Skip already visited
      }

      if (neighbour.number === this.endNode.number) {
        // We reached the end node, record the full path
        this.paths.push([...currentPath, neighbour]); // <--- only once
        continue;
      }

      this.DepthFirstSearchRec(
        [...visitedNodes],
        neighbour,
        result,
        [...currentPath]
      );
    }
  }

  getEdgesToHighLight(path: Node[]){
    let edgesToHighLight = [];

    for (let i = 0; i < path.length - 1 ; i++) {
      let fromVertex = path[i];
      let toVertexes = path[i+1]

      let edge =
        this.graphService.edges.find(
          (edge) => (

            this.canvasService.directionTypeControl.value === 'directedGraph' ?
              edge.from.number === fromVertex.number && edge.to.number === toVertexes.number :
              (
                edge.from.number === fromVertex.number && edge.to.number === toVertexes.number ||
                edge.to.number === fromVertex.number && edge.from.number === toVertexes.number
              )
          )
        )
      if(edge)
        edgesToHighLight.push(edge)
    }

    return edgesToHighLight;
  }

  createNewLayout() {
    this.isPlaying = true;
    this.isPaused = false;

    this.iteration = this.pausedIterator; // Initialize from paused iterator

    const animateLayout = () => {
      if(this.iteration === this.paths.length ){
        this.iteration = 0;
        this.pausedIterator = this.iteration;
        this.isPlaying = false;
        this.isPaused = false;
        this.highLightCurrentPath = -1;
        cancelAnimationFrame(this.animationId!);
        this.canvasService.drawGraph(false)
        return;
      }

      let path = this.paths[this.iteration];

      let edgesToHighLight = this.getEdgesToHighLight(path)

      this.canvasService.drawGraph(
        false,
        edgesToHighLight
      )
      this.highLightCurrentPath = this.iteration;

      this.iteration++; // Update iteration
      this.pausedIterator = this.iteration; // Update paused iterator

      setTimeout(() => {
        this.animationId = requestAnimationFrame(animateLayout);
      },1000)
    };
    this.animationId = requestAnimationFrame(animateLayout);
  }

  findAllAvailablePaths() {
    this.dumpGlobals();

    this.startNode = this.graphService.getVertexFromNumber(
      parseInt(this.startPointControl.value?.toString() || '1')
    );

    this.endNode = this.graphService.getVertexFromNumber(
      parseInt(this.endPointControl.value?.toString() || '1')
    );

    this.DepthFirstSearchRec(
      this.visitedNodes,
      this.startNode,
      this.result,
      []
    );


    this.pathDetailsList = this.paths.map((path, index) => ({
      label: `Path ${index + 1}`,
      path
    }));

    this.createNewLayout();
  }


  highlightPath(index:number){
    if(this.isPlaying){
      return
    }

    let path = this.paths[index];

    let edgesToHighLight = this.getEdgesToHighLight(path)

    this.canvasService.drawGraph(
      false,
      edgesToHighLight
    )
  }

  dumpGlobals() {
    this.pathDetails = '';
    this.paths = [];
    this.pathDetailsArray = [];
    this.pathDetailsList = [];

    this.highLightCurrentPath = -1;
    this.edgesToHighLight = [];
    this.canvasService.drawGraph(false)
  }

}
