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

  animationId: any = null; // Store requestAnimationFrame ID
  isPaused: boolean = false;
  isPlaying: boolean = false;

  public showInputs: boolean = false;
  public showResults: boolean = true;
  public startPointControl = new FormControl(1, [Validators.required]);
  public endPointControl = new FormControl(5, [Validators.required]);
  public maximumPathsAvailableControl = new FormControl(100, [Validators.required, Validators.max(100)]);

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
  toggleResults() {
    this.showResults = !this.showResults
  }

  DepthFirstSearchRec(
    visitedNodes: Node[],
    node: Node,
    result: Node[],
    currentPath: Node[] = []
  ) {
    if (this.paths.length >= (this.maximumPathsAvailableControl?.value || 100)) return;

    currentPath.push(node);
    visitedNodes.push(node);
    result.push(node);

    let neighbours = this.graphService.getAllNeighbourNodes(
      node,
      this.graphService.nodes,
      this.canvasService.directionTypeControl?.value as DirectionTypes
    );

    for (const neighbour of neighbours) {
      if (visitedNodes.find(n => n.number === neighbour.number)) continue;

      if (neighbour.number === this.endNode.number) {
        if (this.paths.length < (this.maximumPathsAvailableControl?.value || 100)) {
          this.paths.push([...currentPath, neighbour]);
        }
        continue;
      }

      this.DepthFirstSearchRec(
        [...visitedNodes],
        neighbour,
        result,
        [...currentPath]
      );

      if (this.paths.length >= (this.maximumPathsAvailableControl?.value || 100)) return;
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


  pauseAnimation() {
    clearTimeout(this.animationId);

    this.isPlaying = false;
    this.isPaused = true;
  }


  createNewLayout() {
    this.isPlaying = true;
    this.isPaused = false;

    this.iteration = this.pausedIterator;

    const animateLayout = () => {
      if (!this.isPlaying || this.isPaused) return; // STOP if paused

      if (this.iteration === this.paths.length) {
        this.iteration = 0;
        this.pausedIterator = this.iteration;
        this.isPlaying = false;
        this.isPaused = false;
        this.highLightCurrentPath = -1;
        this.canvasService.drawGraph(false);

        this.maximumPathsAvailableControl.enable();
        this.startPointControl.enable();
        this.endPointControl.enable();

        return;
      }

      let path = this.paths[this.iteration];
      let edgesToHighLight = this.getEdgesToHighLight(path);

      this.canvasService.drawGraph(false, edgesToHighLight);
      this.highLightCurrentPath = this.iteration;

      this.iteration++;
      this.pausedIterator = this.iteration;

      this.animationId = window.setTimeout(animateLayout, 1000);
    };

    animateLayout();
  }


  findAllAvailablePaths(
    callFromShortestPathsService: boolean = false,
    customStartPoint: string | undefined = undefined,
    customEndPoint: string | undefined = undefined,
  ) {
    if(!this.isPaused || callFromShortestPathsService){
      this.dumpGlobals(callFromShortestPathsService);

      this.startNode = this.graphService.getVertexFromNumber(
        parseInt(customStartPoint || this.startPointControl.value?.toString() || '1')
      );

      this.endNode = this.graphService.getVertexFromNumber(
        parseInt(customEndPoint || this.endPointControl.value?.toString() || '1')
      );

      this.DepthFirstSearchRec(
        this.visitedNodes,
        this.startNode,
        this.result,
        []
      );
      if(callFromShortestPathsService){
        return this.paths
      }

      if(!callFromShortestPathsService){
        if(this.paths.length)
          this.pathDetailsList = this.paths.map((path, index) => ({
            label: `PATH [${index + 1}]`,
            path
          }));
        else
          this.pathDetailsList.push({
            label: `NO PATHS FOUND`,
            path: []
          })
      }
    }

    if(!callFromShortestPathsService){
      this.maximumPathsAvailableControl.disable();
      this.startPointControl.disable();
      this.endPointControl.disable();
      this.createNewLayout();
    }

    return null;
  }


  highlightPath(index:number, _path: Node[] | undefined = undefined){
    if(this.isPlaying){
      return
    }

    let path = _path || this.paths[index];

    let edgesToHighLight = this.getEdgesToHighLight(path)

    this.canvasService.drawGraph(
      false,
      edgesToHighLight
    )
  }

  dumpGlobals(
    callFromShortestPathsService: boolean = false,
  ) {
    if(!callFromShortestPathsService)
      this.pathDetailsList = [];

    this.pathDetails = '';
    this.paths = [];
    this.pathDetailsArray = [];

    this.highLightCurrentPath = -1;
    this.edgesToHighLight = [];
    this.canvasService.drawGraph(false)

    this.iteration = 0;
    this.pausedIterator = 0;
    this.isPaused = false;
    this.isPlaying = false;


    this.maximumPathsAvailableControl.enable();
    this.startPointControl.enable();
    this.endPointControl.enable();
  }

}
