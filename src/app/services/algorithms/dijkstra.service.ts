import {Injectable} from '@angular/core';
import {GraphService} from "../graph.service";
import {CanvasService} from "../canvas.service";
import {Edge, Node} from "../../models/graph.model";
import {FormControl, Validators} from "@angular/forms";
import {from, Subscription} from "rxjs";
import {DirectionTypes} from "../../contants/graph.constants";

@Injectable({
  providedIn: 'root'
})
export class DijkstraService {

  private $subscriptions = new Subscription();

  pausedIterator: number = 0;
  iteration: number = 0;

  animationId: number | null = null; // Store requestAnimationFrame ID
  isPaused: boolean = false;
  isPlaying: boolean = false;

  showInputs: boolean = false;
  startPointControl = new FormControl(1, [Validators.required]);
  endPointControl = new FormControl(5, [Validators.required]);

  visitedVertexes: string[] = [];
  vertexToLengthAndParentMapping: {
    // key will hold vertex number
    [key: number]: {
      distance: number // lengths array
      parent?: number  // parents
    }
  } = {}

  totalDistanceToEndpoint: number | null = null;
  directionMapVertexes: any = [];
  directionMapVertexObjects: Node[] = [];
  pathDetails: string = '';

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
  ) {

    this.$subscriptions.add(
      this.startPointControl.valueChanges.subscribe((res) => {
        this.dropGlobals();
      })
    )

    this.$subscriptions.add(
      this.endPointControl.valueChanges.subscribe((res) => {
        this.dropGlobals();
      })
    )
  }

  toggleInputs(){
    this.showInputs = !this.showInputs
  }

  dropGlobals(){
    cancelAnimationFrame(this.animationId!)
    this.iteration = 0;
    this.pausedIterator = this.iteration;
    this.pathDetails = ``;
    this.isPlaying = false;
    this.totalDistanceToEndpoint = null;
    this.directionMapVertexes = [];
    this.canvasService.drawGraph(false)
  }

  Diijkstra() {
    this.dropGlobals();
    this.findShortestPath();

    let startVertexNumber: number = parseInt(this.startPointControl.value?.toString() || '1');
    let endpointVertexNumber: number = parseInt(this.endPointControl.value?.toString() || '1');

    this.totalDistanceToEndpoint = this.vertexToLengthAndParentMapping[endpointVertexNumber].distance;

    if(this.vertexToLengthAndParentMapping[endpointVertexNumber].distance === Infinity){
      this.pathDetails = `No Path Found From ${startVertexNumber} to ${endpointVertexNumber}`
      return;
    }

    this.createDirectionMap(
      startVertexNumber, endpointVertexNumber
    )
    this.directionMapVertexes = this.directionMapVertexes.reverse()
    this.directionMapVertexObjects = this.directionMapVertexes.map((vertexInfo: any) => {
      return this.graphService.getVertexFromNumber(vertexInfo.vertex)
    })

    for (let i = 0; i < this.directionMapVertexObjects.length - 1; i++) {

      let fromEdge = this.directionMapVertexObjects[i];
      let toEdge = this.directionMapVertexObjects[i+1];

      let weight = this.graphService.edges.find((edge: Edge) => {
        return edge.from.number === fromEdge.number && edge.to.number === toEdge.number
      })

      this.pathDetails += `${fromEdge.number} -> ${toEdge.number} [${weight?.weight}]`;

      if(i !== this.directionMapVertexObjects.length - 2){
        this.pathDetails += `, `
      }
    }

    this.createNewLayout(this.directionMapVertexObjects);
  }

  createDirectionMap(startPoint: number, endPoint: number): any{

    this.directionMapVertexes.push({
      vertex: endPoint,
    });

    if(this.vertexToLengthAndParentMapping[endPoint].parent === startPoint){
      this.directionMapVertexes.push({
        vertex: startPoint,
      });

      return null;
    }

    if(this.vertexToLengthAndParentMapping[endPoint].parent)
      return this.createDirectionMap(startPoint, this.vertexToLengthAndParentMapping[endPoint].parent)

    return  null;
  }

  createNewLayout(vertexes: Node[]) {
    this.isPlaying = true;
    this.isPaused = false;

    this.iteration = this.pausedIterator; // Initialize from paused iterator
    let pathIndex = this.iteration; // Use iteration as path index
    let circleX = vertexes[pathIndex].x;
    let circleY = vertexes[pathIndex].y;
    let animationSpeed = 0.5; // Adjust speed as needed
    let currentVertex = vertexes[pathIndex];
    let nextVertex = vertexes[pathIndex + 1];

    const animateLayout = () => {

      if (pathIndex < vertexes.length - 1) { // Check if there's a next vertex

        if (nextVertex) {
          const dx = nextVertex.x - circleX;
          const dy = nextVertex.y - circleY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0) {
            const moveX = (dx / distance) * animationSpeed;
            const moveY = (dy / distance) * animationSpeed;

            circleX += moveX;
            circleY += moveY;

            // Check if we've reached the next vertex (or close enough)
            if (Math.abs(circleX - nextVertex.x) < animationSpeed && Math.abs(circleY - nextVertex.y) < animationSpeed) {
              pathIndex++;
              currentVertex = nextVertex;
              nextVertex = vertexes[pathIndex + 1];
            }
          } else {
            // Already at the next vertex
            pathIndex++;
            currentVertex = nextVertex;
            nextVertex = vertexes[pathIndex + 1];
          }
        }
        // Draw the animated circle
        this.canvasService.drawGraph(false); // Clear and redraw the graph
        this.canvasService.drawCircleAroundNode(circleX, circleY);
      } else {
        // Path animation complete
        cancelAnimationFrame(this.animationId!);
        this.animationId = null;
        this.iteration = 0;
        this.pausedIterator = this.iteration;

        this.isPlaying = false;
        this.isPaused = false;
        return;
      }

      this.iteration = pathIndex; // Update iteration
      this.pausedIterator = this.iteration; // Update paused iterator

      this.animationId = requestAnimationFrame(animateLayout);
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
    cancelAnimationFrame(this.animationId!); // Stop the current animation frame
    this.animationId = null;
    this.iteration = 0;
    this.pausedIterator = this.iteration;
    this.canvasService.clearBoard();
  }

  findShortestPath() {
    this.vertexToLengthAndParentMapping = {};
    this.visitedVertexes = [];

    let vertexNumber = parseInt(this.startPointControl.value?.toString() || '1');

    const startNode: Node = this.graphService.getVertexFromNumber(vertexNumber);
    // this.visitedVertexes.push(startNode.number)

    const allOtherVertexes = this.graphService.getAllOtherVertexes(
      startNode, this.graphService.nodes
    );

    [
      this.startPointControl.value,
      ...allOtherVertexes.map((vertex) => vertex.number)
    ].forEach((v, index: number) => {

      let vertexNumber: number = v as number

      this.vertexToLengthAndParentMapping[vertexNumber] = this.vertexToLengthAndParentMapping[vertexNumber] || {
        distance: 0,
      }

      if (index === 0) {
        this.vertexToLengthAndParentMapping[vertexNumber].distance = 0;
      } else {
        this.vertexToLengthAndParentMapping[vertexNumber].distance = Infinity;
      }
    });

    this.processVertexes(startNode);
  }

  processVertexes(startVertex: Node): any {
    const outgoingEdges = this.graphService.getAllOutgoingWeights(startVertex, this.canvasService.directionTypeControl.value as DirectionTypes);

    outgoingEdges.forEach((outgoingEdge) => {

      outgoingEdge.weight = parseInt(outgoingEdge.weight?.toString() || '0');

      if (!outgoingEdge || !outgoingEdge.weight) {
        return;
      }

      if (
        this.vertexToLengthAndParentMapping[startVertex.number].distance + (outgoingEdge.weight) <
        this.vertexToLengthAndParentMapping[outgoingEdge.to.number].distance
      ) {
        this.vertexToLengthAndParentMapping[outgoingEdge.to.number].distance =
          this.vertexToLengthAndParentMapping[startVertex.number].distance + (outgoingEdge.weight)

        this.vertexToLengthAndParentMapping[outgoingEdge.to.number].parent = startVertex.number
      }
    })
    this.visitedVertexes.push(startVertex.number.toString())

    let filteredObject: any = {}
    Object.keys(this.vertexToLengthAndParentMapping).forEach((vertexNumber: any) => {
      if(this.visitedVertexes.includes(vertexNumber)) {
        return
      }

      filteredObject[vertexNumber] = this.vertexToLengthAndParentMapping[vertexNumber]
    })

    let shortestDistanceKey = this.findShortestDistanceVertex(filteredObject)

    if(this.visitedVertexes.length !== this.graphService.nodes.length && shortestDistanceKey){
      return this.processVertexes(
        this.graphService.getVertexFromNumber(parseInt(
          shortestDistanceKey as string
        ))
      )
    }else{
      return null
    }
  }

  findShortestDistanceVertex(distances: any) {
    if (!distances || typeof distances !== 'object') {
      return null; // Handle invalid input
    }

    let shortestKey = null;
    let shortestDistance = Infinity; // Initialize with a large value

    for (const key in distances) {
      if (distances.hasOwnProperty(key)) {
        const distanceObj = distances[key];
        if (distanceObj && typeof distanceObj.distance === 'number' && distanceObj.distance < shortestDistance) {
          shortestDistance = distanceObj.distance;
          shortestKey = key;
        }
      }
    }

    return shortestKey;
  }
}
