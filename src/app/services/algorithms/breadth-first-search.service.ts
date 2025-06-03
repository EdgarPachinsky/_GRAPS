import {Injectable} from "@angular/core";
import {CanvasService} from "../canvas.service";
import {GraphService} from "../graph.service";
import {Edge, Node} from "../../models/graph.model";
import {DirectionTypes} from "../../contants/graph.constants";
import {FormControl, Validators} from "@angular/forms";
import {AchievementsService} from "../achievements.service";
import {ACHIEVEMENT_CATEGORY, ACHIEVEMENT_ID} from "../../models/achievements.model";

interface BFSLayer {
  // ley will act like node number
  [key: string]: {
    generic?: boolean,
    // this will hold neighbour layers
    connectedWith: Node[],
    // in next layer we will form same structure
    nextLayer: BFSLayer
  }
}

@Injectable({
  providedIn: 'root'
})
export class BreadthFirstSearchService {
  public iteration: number = 0;
  public pausedIterator: number = 0;

  public animationId: number | null = null; // Store requestAnimationFrame ID
  public isPaused: boolean = false;
  public isPlaying: boolean = false;


  public visitedNodes: Node[] = [];

  public visitedNodesV2: Node[] = [];
  public resultV2 = [];
  public startNode!: Node;

  public BFSLayers: BFSLayer = {};
  public iterationCount: number = 0;

  showInputs: boolean = false;
  startPointControl = new FormControl(1, [Validators.required]);
  endPointControl = new FormControl(5, [Validators.required]);

  public pathDetails: string = ''
  public pathDetailsArray: any[] = []
  public edgesToHighLight: Edge[] = [];

  constructor(
    public graphService:GraphService,
    public canvasService: CanvasService,
    public achievementsService: AchievementsService,
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

  BreadthFirstSearch(){

    let firstNode = this.graphService.getVertexFromNumber(1);
    this.visitedNodes.push(firstNode)

    let neighbourNodes = this.graphService.getAllNeighbourNodes(firstNode, this.graphService.nodes, this.canvasService.directionTypeControl.value as DirectionTypes)
    neighbourNodes.forEach((neighbourNode) =>{
      this.visitedNodes.push(neighbourNode)
    })

    // forming first layer of graph
    this.BFSLayers = {
      [firstNode.number]: {
        connectedWith: neighbourNodes,
        nextLayer: {},
        generic: true
      }
    }

    // passing layer to generator to form it
    this.generateLayers(neighbourNodes, this.BFSLayers[firstNode.number].nextLayer, this.visitedNodes);

    // console.log(`++++++++++++++ this.BFSLayers ++++++++++++++`)
    // console.log(this.BFSLayers)
    // console.log(`this.iterationCount ${this.iterationCount}`)
  }

  generateLayers(currentNodeNeighbours: Node[], layer: BFSLayer, visitedNodes: Node[]){

    currentNodeNeighbours.forEach((currentNodeNeighbour) => {

      let subNeighbours = this.graphService.getAllNeighbourNodes(currentNodeNeighbour, this.graphService.nodes, this.canvasService.directionTypeControl.value as DirectionTypes)
      let subNeighboursClone = [...subNeighbours];

      subNeighbours = subNeighbours.filter((node) => (
        !visitedNodes.find((visitedNode) => visitedNode.number === node.number)
      ))

      visitedNodes.push(currentNodeNeighbour);
      subNeighbours.forEach((subNeighbour) =>{
        visitedNodes.push(subNeighbour)
      })

      layer[currentNodeNeighbour.number] = {
        connectedWith: subNeighboursClone,
        nextLayer: {},
        generic: false
      }

      if(visitedNodes.length === (this.graphService.nodes.length * 2) ){
        return null;
      }

      this.iterationCount ++;
      return this.generateLayers([...subNeighbours], layer[currentNodeNeighbour.number].nextLayer, visitedNodes);
    })
  }

  BFSv2Rec(
    visitedNodes: Node[],
    node: Node,
    result: Node[]
  ){
    visitedNodes.push(
      node
    )

    let neighbours = this.graphService.getAllNeighbourNodes(
      node,
      this.graphService.nodes,
      this.canvasService.directionTypeControl?.value as DirectionTypes
    )

    let nextIterationNodes: Node[] = [];

    neighbours.forEach((neighbour) => {
      if(!visitedNodes.find((visitedNode: Node) => visitedNode.number === neighbour.number)){
        visitedNodes.push(neighbour)
        nextIterationNodes.push(neighbour)
      }
    })

    let toPointerSting = nextIterationNodes.map((nextIterationNode) => nextIterationNode.number).join(', ');
    this.pathDetails +=
      `From ${node.number} -> ${ toPointerSting?'To '+toPointerSting:'NO ANY AVAILABLE VERTEX'} <br>`

    this.pathDetailsArray.push({
      from: node.number,
      to: nextIterationNodes
    })

    if(nextIterationNodes.length)
      nextIterationNodes.forEach((nextIterationNode) => {
        return this.BFSv2Rec(
          visitedNodes, nextIterationNode, result
        )
      })
  }

  BFSv3Queue(startNode: Node) {
    const visitedNodes: Node[] = [];
    const result: Node[] = [];
    const queue: Node[] = [];

    queue.push(startNode);
    visitedNodes.push(startNode);

    this.pathDetails = '';
    this.pathDetailsArray = [];

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      result.push(currentNode);

      const neighbours = this.graphService.getAllNeighbourNodes(
        currentNode,
        this.graphService.nodes,
        this.canvasService.directionTypeControl?.value as DirectionTypes
      );

      const nextNodes: Node[] = [];

      for (const neighbour of neighbours) {
        const alreadyVisited = visitedNodes.find(v => v.number === neighbour.number);
        if (!alreadyVisited) {
          visitedNodes.push(neighbour);
          queue.push(neighbour);
          nextNodes.push(neighbour);
        }
      }

      const toString = nextNodes.map(n => n.number).join(', ');
      this.pathDetails += `From ${currentNode.number} -> ${toString ? 'To ' + toString : 'NO ANY AVAILABLE VERTEX'} <br>`;

      this.pathDetailsArray.push({
        from: currentNode.number,
        to: nextNodes
      });
    }

    return result; // optional, if you want to return traversal
  }

  // recursion based
  BFSv2(){
    this.achievementsService.addProgressForRunAlgorithmTypeAchievements(
      ACHIEVEMENT_ID.THE_TRAVERSER, "BFS"
    )
    this.achievementsService.addProgressForRunAlgorithmTypeAchievements(
      ACHIEVEMENT_ID.ALGOHOLIC, "BFS"
    )

    this.dumpGlobals();

    this.startNode = this.graphService.getVertexFromNumber(
      parseInt(this.startPointControl.value?.toString() || '1')
    );

    this.BFSv2Rec(
      this.visitedNodesV2,
      this.startNode,
      this.resultV2
    )

    this.createNewLayout()
  }

  // queue based
  BFSv3(){
    this.dumpGlobals();

    this.startNode = this.graphService.getVertexFromNumber(
      parseInt(this.startPointControl.value?.toString() || '1')
    );

    this.BFSv3Queue(this.startNode)

    this.createNewLayout()
  }

  dumpGlobals(){
    this.pathDetails = '';
    this.pathDetailsArray = [];
    this.resultV2 = [];
    this.visitedNodesV2 = [];

    this.edgesToHighLight = [];
    this.canvasService.drawGraph(false)
  }
}
