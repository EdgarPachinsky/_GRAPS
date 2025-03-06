import { Injectable } from '@angular/core';
import {Subscription} from "rxjs";
import {Edge, Node} from "../../models/graph.model";
import {GraphService} from "../graph.service";
import {CanvasService} from "../canvas.service";

@Injectable({
  providedIn: 'root'
})
export class MstKruskalsAlgorithmService {

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
      const edge = this.edgesSorted[this.iteration];

      let edgeFromNumber = edge.from.number;
      let edgeToNumber = edge.to.number;

      let edgeFromFoundInSubsets_INDEX: number | null = null;
      let edgeToFoundInSubsets_INDEX: number | null   = null;

      this.setOfSubSets.forEach((subset: number[], index: number) => {
        if(subset.includes(edgeFromNumber)) {edgeFromFoundInSubsets_INDEX = index}
        if(subset.includes(edgeToNumber))   {edgeToFoundInSubsets_INDEX   = index}
      })

      // CASES
      // create new subset if none of from to vertexes found in all subsets
      if(
        !edgeFromFoundInSubsets_INDEX && !edgeToFoundInSubsets_INDEX){
        this.setOfSubSets.push(
          [edgeFromNumber, edgeToNumber]
        )
        this.edgesToHighLight.push(edge);
        //return as no need to continue to further conditions
      }

      // found in same subsets , means there will be circle if we include vertexes,
      // so we just return no need to do something
      if(
        edgeFromFoundInSubsets_INDEX && edgeToFoundInSubsets_INDEX &&
        edgeFromFoundInSubsets_INDEX === edgeToFoundInSubsets_INDEX){
      }

      // if one vertex is included but other is not , then push in array
      if(edgeFromFoundInSubsets_INDEX && !edgeToFoundInSubsets_INDEX){
        this.setOfSubSets[edgeFromFoundInSubsets_INDEX].push(edgeToNumber);
        this.edgesToHighLight.push(edge);
      }
      if(edgeToFoundInSubsets_INDEX && !edgeFromFoundInSubsets_INDEX){
        this.setOfSubSets[edgeToFoundInSubsets_INDEX].push(edgeFromNumber);
        this.edgesToHighLight.push(edge);
      }
      if(
        edgeFromFoundInSubsets_INDEX && edgeToFoundInSubsets_INDEX &&
        edgeFromFoundInSubsets_INDEX !== edgeToFoundInSubsets_INDEX){

        let arrayOne = [...this.setOfSubSets[edgeFromFoundInSubsets_INDEX]];
        let arrayTwo = [...this.setOfSubSets[edgeToFoundInSubsets_INDEX]];

        let unionArray = arrayOne.concat(arrayTwo);

        this.setOfSubSets.splice(edgeFromFoundInSubsets_INDEX, 1);
        this.setOfSubSets.splice(edgeToFoundInSubsets_INDEX,   1);
        this.setOfSubSets.push(unionArray);

        this.edgesToHighLight.push(edge);
      }

      this.canvasService.drawGraph(
        false,
        this.edgesToHighLight
      )

      this.iteration++; // Update iteration
      this.pausedIterator = this.iteration; // Update paused iterator

      if(this.iteration === this.edgesSorted.length){
        cancelAnimationFrame(this.animationId!);
        this.iteration = 0;
        this.pausedIterator = this.iteration;
        this.isPlaying = false;
        this.isPaused = false;
        return;
      }

      setTimeout(() => {
        this.animationId = requestAnimationFrame(animateLayout);
      }, 100)
    };

    this.animationId = requestAnimationFrame(animateLayout);
  }

  KruskalsMST(){
    this.isPlaying = true;
    this.setOfSubSets = [[]];
    this.edgesToHighLight = [];
    this.totalCostOfMinimumSpanningTree = 0;

    let edges = [...this.graphService.edges];

    this.edgesSorted = this.parseWeightsToNumber(
      edges.sort((a: any, b: any) => a.weight - b.weight)
    )

    this.createNewLayout()
  }

  parseWeightsToNumber(edges: Edge[]){
    return edges.map((edge) => { edge.weight = Number(edge.weight); return edge });
  }
}
