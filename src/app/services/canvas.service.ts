import {ElementRef, Injectable, OnInit} from '@angular/core';
import {GraphService} from "./graph.service";
import {FormControl, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Edge, GrapsDUMP, Node} from "../models/graph.model"
import {UtilsService} from "./utils.service";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  CURVE_OFFSET,
  DirectionTypes,
  GraphCreateMode,
  HEAD_ANGLE,
  HEAD_LENGTH, NODE_INSIDE_TEXT_SIZE,
  NODE_RADIUS, NODE_TO_NODE_EDGE_INSIDE_TEXT_SIZE,
  WeightTypes
} from "../contants/graph.constants";

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  private $subscriptions = new Subscription();

  activeNodeColor: string = '#324b4b';
  passiveNodeColor: string = '#101414';

  scale: number = 1;
  canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  modeControl = new FormControl(GraphCreateMode.ADD_NODE);

  // Direction settings
  // 1. Undirected Graph,
  // 2. Directed Graph
  directionTypeControl = new FormControl(DirectionTypes.UNDIRECTED_GRAPH);

  // Weight settings
  // 1. Unweighted Graph
  // 2. Weighted Graph
  weightTypeControl = new FormControl(WeightTypes.UNWEIGHTED_GRAPH);

  // Weight value
  weightControl = new FormControl(0, [Validators.required]);

  // Input DUMP Control
  inputDumpControl = new FormControl('', [Validators.required]);

  selectedNode: Node | null = null;

  constructor(
    public graphService: GraphService,
    public utilsService: UtilsService,
  ) {
  }

  handleCanvasClick(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (this.modeControl?.value === GraphCreateMode.ADD_NODE) {

      const onNode = this.findNode(x, y, (NODE_RADIUS * 2));
      if (!onNode) {
        const number = this.graphService.nodes.length + 1;
        this.graphService.nodes.push({x, y, number});
        this.drawGraph(false);
      }

    } else if (this.modeControl?.value === GraphCreateMode.ADD_EDGE) {
      const clickedNode: Node | null = this.findNode(x, y);

      if (clickedNode) {
        clickedNode.isClicked = true;
        // Draw nodes and numbers
        this.drawGraph(false);

        if (this.selectedNode) {
          const nodeId = `${this.selectedNode.number}-${clickedNode.number}`
          const reverseNodeId = nodeId.split('-').reverse().join("-");

          // EDGE CONTROL FLOW
          if (this.directionTypeControl.value === DirectionTypes.UNDIRECTED_GRAPH) {
            if (
              this.graphService.edges.find(el => el.id === nodeId) ||
              this.graphService.edges.find(el => el.id === reverseNodeId)
            ) {
              this.utilsService.showSnackBar(`EDGE ALREADY EXISTS`);
              this.selectedNode.isClicked = false;
              clickedNode.isClicked = false;
              this.selectedNode = null;
              this.drawGraph(false);
              return;
            }
          }
          let isReverseEdge = false;
          if (this.directionTypeControl.value === DirectionTypes.DIRECTED_GRAPH) {
            if (
              this.graphService.edges.find(el => el.id === nodeId)
            ) {
              this.utilsService.showSnackBar(`EDGE ALREADY EXISTS`);
              this.selectedNode.isClicked = false;
              clickedNode.isClicked = false;
              this.selectedNode = null;
              this.drawGraph(false);
              return;
            }

            if (
              this.graphService.edges.find(el => el.id === reverseNodeId)
            ) {
              isReverseEdge = true;
            }
          }
          // EDGE CONTROL FLOW END


          this.graphService.edges.push({
            from: this.selectedNode, to: clickedNode,
            ...(this.weightTypeControl.value === WeightTypes.WEIGHTED_GRAPH &&
              (!this.weightControl.invalid && this.weightControl.value !== null)) && {
              weight: this.weightControl.value
            },
            id: nodeId, isReverseEdge
          });

          this.selectedNode.isClicked = false;
          clickedNode.isClicked = false;
          this.selectedNode = null;
          this.drawGraph(false);
        } else {
          this.selectedNode = clickedNode;
          this.utilsService.showSnackBar(`Node[${this.selectedNode.number}] selected`)
        }
      }
    }
  }

  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  setCanvasRef(canvasRef: ElementRef<HTMLCanvasElement>) {
    this.canvasRef = canvasRef
  }

  clearBoard() {
    this.graphService.nodes = [];
    this.graphService.edges = [];
    this.selectedNode = null;
    this.modeControl.setValue(GraphCreateMode.ADD_NODE)
    this.drawGraph();
  }

  findNode(x: number, y: number, extraDistance: number = 0): Node | null {
    for (const node of this.graphService.nodes) {
      const dx = x - node.x;
      const dy = y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance <= (NODE_RADIUS + extraDistance)) {
        return node;
      }
    }
    return null;
  }

  updateEdgeVertexes() {

    this.graphService.edges.forEach((edge) => {

      let oldFromNumber = edge.from.number;
      let oldToNumber = edge.to.number;

      let newFromVertex = this.graphService.nodes.find((node) => node.number === oldFromNumber);
      let newToVertex = this.graphService.nodes.find((node) => node.number === oldToNumber);

      if (newFromVertex && newToVertex) {
        edge.from = newFromVertex;
        edge.to = newToVertex;
      }
    })
  }

  drawGraph(applyScale: boolean = true, edgesToHighLight: Edge[] = []) {
    this.clearCanvas();

    const BORDER_THRESHOLD = NODE_RADIUS*5; // Or your desired threshold
    let scale = 1

    if(this.graphService.nodes.length && applyScale){
      // 1. Find Min and Max X and Y (same as before)
      let minX = this.graphService.nodes[0].x;
      let maxX = this.graphService.nodes[0].x;
      let minY = this.graphService.nodes[0].y;
      let maxY = this.graphService.nodes[0].y;

      for (const vertex of this.graphService.nodes) {
        minX = Math.min(minX, vertex.x);
        maxX = Math.max(maxX, vertex.x);
        minY = Math.min(minY, vertex.y);
        maxY = Math.max(maxY, vertex.y);
      }

      // 2. Calculate Ranges (same as before)
      const rangeX = maxX - minX;
      const rangeY = maxY - minY;

      // 3. Calculate Scale Factors (adjust canvas size for threshold)
      const availableWidth = parseInt(BOARD_WIDTH) - 2 * BORDER_THRESHOLD;
      const availableHeight = parseInt(BOARD_HEIGHT) - 2 * BORDER_THRESHOLD;

      const scaleX = availableWidth / rangeX;
      const scaleY = availableHeight / rangeY;

      scale = Math.min(scaleX, scaleY);
      this.ctx.translate(BORDER_THRESHOLD - minX * scale, BORDER_THRESHOLD - minY * scale); // Translate
    }

    this.ctx.scale(scale, scale); // Apply scaling
    // Draw edges
    this.drawEdges(edgesToHighLight);

    // Draw nodes and numbers
    this.drawNodes();

    this.ctx.restore(); // Restore context state after scaling
  }

  drawEdges(edgesToHighlight: any[] = []) { // Optional parameter for edges to highlight
    for (const edge of this.graphService.edges) {
      const from = edge.from;
      const to = edge.to;
      const weight = edge.weight;
      const isReverseEdge = !!edge.isReverseEdge;

      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const angle = Math.atan2(dy, dx);

      const fromX = from.x + NODE_RADIUS * Math.cos(angle);
      const fromY = from.y + NODE_RADIUS * Math.sin(angle);
      const toX = to.x - NODE_RADIUS * Math.cos(angle);
      const toY = to.y - NODE_RADIUS * Math.sin(angle);

      let curveX = 0;
      let curveY = 0;

      if (isReverseEdge) {
        curveX = CURVE_OFFSET * Math.cos(angle + Math.PI / 2);
        curveY = CURVE_OFFSET * Math.sin(angle + Math.PI / 2);
      }

      // Check for intersection with other nodes and adjust curve dynamically
      for (const node of this.graphService.nodes) {
        if (node !== from && node !== to) {
          const intersection = this.getIntersectionPoint(fromX, fromY, toX, toY, node.x, node.y, NODE_RADIUS);

          if (intersection) {
            const dx = intersection.x - node.x;
            const dy = intersection.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxCurveOffset = CURVE_OFFSET * (1 + (NODE_RADIUS - distance) / NODE_RADIUS);
            curveX = maxCurveOffset * Math.cos(angle + Math.PI / 2);
            curveY = maxCurveOffset * Math.sin(angle + Math.PI / 2);
            break;
          }
        }
      }

      this.ctx.beginPath();
      this.ctx.moveTo(fromX, fromY);
      this.ctx.quadraticCurveTo(
        (fromX + toX) / 2 + curveX,
        (fromY + toY) / 2 + curveY,
        toX, toY
      );

      // Highlight logic
      const isHighlighted = edgesToHighlight.some(highlightedEdge =>
        highlightedEdge.from === from && highlightedEdge.to === to
      );

      this.ctx.strokeStyle = isHighlighted ? 'red' : '#324b4b'; // Highlight color
      this.ctx.stroke();

      if (this.directionTypeControl.value === DirectionTypes.DIRECTED_GRAPH) {
        this.ctx.beginPath();
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(toX - HEAD_LENGTH * Math.cos(angle - HEAD_ANGLE), toY - HEAD_LENGTH * Math.sin(angle - HEAD_ANGLE));
        this.ctx.moveTo(toX, toY);
        this.ctx.lineTo(toX - HEAD_LENGTH * Math.cos(angle + HEAD_ANGLE), toY - HEAD_LENGTH * Math.sin(angle + HEAD_ANGLE));
        this.ctx.strokeStyle = isHighlighted ? 'red' : '#324b4b'; // Highlight color
        this.ctx.stroke();
      }

      let midX = (fromX + toX) / 2;
      let midY = (fromY + toY) / 2;

      if (isReverseEdge || (curveX !== 0 && curveY !== 0)) {
        const t = 0.5;
        midX = (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * ((fromX + toX) / 2 + curveX) + t * t * toX;
        midY = (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * ((fromY + toY) / 2 + curveY) + t * t * toY;
      }

      if (this.weightTypeControl.value === WeightTypes.WEIGHTED_GRAPH && weight !== undefined) {
        this.ctx.font = `${NODE_TO_NODE_EDGE_INSIDE_TEXT_SIZE}px Arial`;
        this.ctx.fillStyle = isHighlighted ? 'red' : 'white'; // Highlight color
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(weight.toString(), midX, midY);
      }
    }
  }

  getIntersectionPoint(x1: number, y1: number, x2: number, y2: number, cx: number, cy: number, radius: number) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const t = ((cx - x1) * dx + (cy - y1) * dy) / (dx * dx + dy * dy);

    if (t < 0 || t > 1) {
      return null; // Closest point is not on the line segment
    }

    const closestX = x1 + t * dx;
    const closestY = y1 + t * dy;
    const distance = Math.sqrt((cx - closestX) ** 2 + (cy - closestY) ** 2);

    if (distance <= radius) {
      return {x: closestX, y: closestY}; // Return intersection point
    } else {
      return null;
    }
  }

  drawNodes() {
    this.ctx.font = `${NODE_INSIDE_TEXT_SIZE}px Arial, sans-serif`; // Fallback font
    this.ctx.textAlign = 'center'; // Center text horizontally
    this.ctx.textBaseline = 'middle'; // Center text vertically
    this.ctx.fillStyle = 'black'; // Set text color
    for (let i = 0; i < this.graphService.nodes.length; i++) {
      const node = this.graphService.nodes[i];
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI);
      this.ctx.fillStyle = node.isClicked ? this.activeNodeColor : this.passiveNodeColor; // Set node fill color
      this.ctx.fill();
      this.ctx.strokeStyle = 'white';
      this.ctx.stroke();
      // Draw number inside the circle
      this.ctx.strokeText((i + 1).toString(), node.x, node.y); // Draw node number (i + 1 for 1-based index)
    }
  }

  importGraph(forceImport: GrapsDUMP | null = null) {
    let graphDump!: GrapsDUMP;
    if (!forceImport && !this.inputDumpControl.value)
      return;

    try {
      this.clearBoard();

      graphDump =
        (!forceImport && this.inputDumpControl.value) ?
          {...JSON.parse(this.inputDumpControl.value)} : Object.assign({}, forceImport);

      this.directionTypeControl.patchValue(
        graphDump.direction || DirectionTypes.UNDIRECTED_GRAPH
      )

      this.weightTypeControl.patchValue(
        graphDump.weighted || WeightTypes.UNWEIGHTED_GRAPH
      )

      this.graphService.nodes = [...graphDump.vertices] || [];
      this.graphService.edges = [...graphDump.edges] || [];

      this.drawGraph(false);
    } catch (err) {
      this.utilsService.showSnackBar('Damaged JSON, please check again!')
    }
  }

  drawCircleAroundNode(x: number, y: number) {
    const circleRadius = NODE_RADIUS - 8; // Adjust 5 to make it a bit larger

    this.ctx.beginPath();
    this.ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = 'rgb(239, 169, 161)'; // RGB color for the outline
    // this.ctx.lineWidth = 1; // Adjust the line width as needed
    this.ctx.stroke();
    this.ctx.closePath();
  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.ctx.save(); // Save current context state
  }
}
