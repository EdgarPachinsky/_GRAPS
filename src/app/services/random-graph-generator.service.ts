import { Injectable } from '@angular/core';
import {CanvasService} from "./canvas.service";
import {DirectionTypes, GraphCreateMode, NODE_RADIUS, WeightTypes} from "../contants/graph.constants";
import {GrapsDUMP, Node} from "../models/graph.model";
import {GraphService} from "./graph.service";

@Injectable({
  providedIn: 'root'
})
export class RandomGraphGeneratorService {

  private PADDING:number = 1;
  private MAX_ROWS:number = 8;
  private MAX_COLS:number = 8;

  public nodeMatrix: any[][] = []

  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
  ) { }

  generateRandomGraph() {
    this.canvasService.clearCanvas();
    this.canvasService.clearBoard();

    // let directionType:DirectionTypes = Math.random() < 0.5 ? DirectionTypes.DIRECTED_GRAPH : DirectionTypes.UNDIRECTED_GRAPH;
    let directionType:DirectionTypes = DirectionTypes.UNDIRECTED_GRAPH
    this.canvasService.directionTypeControl.patchValue(directionType)

    let weightTypes:WeightTypes = Math.random() < 0.5 ? WeightTypes.WEIGHTED_GRAPH : WeightTypes.UNWEIGHTED_GRAPH;
    // let weightTypes:WeightTypes = WeightTypes.UNWEIGHTED_GRAPH;
    this.canvasService.weightTypeControl.patchValue(weightTypes)

    // drop general matrix
    this.nodeMatrix = [];

    this.canvasService.modeControl.patchValue(GraphCreateMode.ADD_NODE);

    for (let i = 0; i < this.MAX_ROWS; i++) {
      this.nodeMatrix[i] = [];

      for (let j = 0; j < this.MAX_COLS; j++) {

        if(Math.random() < (this.densityValue / 100)){

          this.nodeMatrix[i][j] = this.generateVertexClickPlace(i,j);

          this.canvasService.handleCanvasClick(
            undefined, this.nodeMatrix[i][j]
          )

          continue;
        }

        this.nodeMatrix[i][j] = null
      }
    }

    // this.canvasService.importGraph(generatedRandomGraph)
    this.canvasService.modeControl.patchValue(GraphCreateMode.ADD_EDGE);
    for (let i = 0; i < this.MAX_ROWS; i++) {

      for (let j = 0; j < this.MAX_COLS; j++) {

        if(this.nodeMatrix[i][j]){

          let connectionCombinations = this.getRandomDirectionCombination(
            Number(this.canvasService.randomGraphMinDirectionControl.value),
            Number(this.canvasService.randomGraphMaxDirectionControl.value)
          );


          for (const direction of connectionCombinations) {
            let ni = i;
            let nj = j;
            let firstClickPlace = this.nodeMatrix[i][j];
            let secondClickPlace = null;

            switch (direction) {
              case 'left':
                nj = j - 1;
                while (nj >= 0) {
                  if (this.nodeMatrix[i][nj]) {
                    secondClickPlace = this.nodeMatrix[i][nj]
                    break;
                  }
                  nj--;
                }
                break;
              case 'right':
                nj = j + 1;
                while (nj < this.MAX_COLS) {
                  if (this.nodeMatrix[i][nj]) {
                    secondClickPlace = this.nodeMatrix[i][nj]
                    break;
                  }
                  nj++;
                }
                break;
              case 'up':
                ni = i - 1;
                this.canvasService.handleCanvasClick(
                  undefined, this.nodeMatrix[i][j]
                )
                while (ni >= 0) {
                  if (this.nodeMatrix[ni][j]) {
                    secondClickPlace = this.nodeMatrix[ni][j]
                    break;
                  }
                  ni--;
                }
                break;

              case 'down':
                ni = i + 1;
                this.canvasService.handleCanvasClick(
                  undefined, this.nodeMatrix[i][j]
                )
                while (ni < this.MAX_ROWS) {
                  if (this.nodeMatrix[ni][j]) {
                    secondClickPlace = this.nodeMatrix[ni][j]
                    break;
                  }
                  ni++;
                }
                break;

              case 'upleft':
                ni = i - 1;
                nj = j - 1;
                while (ni >= 0 && nj >= 0) {
                  if (this.nodeMatrix[ni][nj]) {
                    secondClickPlace = this.nodeMatrix[ni][nj];
                    break;
                  }
                  ni--;
                  nj--;
                }
                break;

              case 'upright':
                ni = i - 1;
                nj = j + 1;
                while (ni >= 0 && nj < this.MAX_COLS) {
                  if (this.nodeMatrix[ni][nj]) {
                    secondClickPlace = this.nodeMatrix[ni][nj];
                    break;
                  }
                  ni--;
                  nj++;
                }
                break;

              case 'downleft':
                ni = i + 1;
                nj = j - 1;
                while (ni < this.MAX_ROWS && nj >= 0) {
                  if (this.nodeMatrix[ni][nj]) {
                    secondClickPlace = this.nodeMatrix[ni][nj];
                    break;
                  }
                  ni++;
                  nj--;
                }
                break;

              case 'downright':
                ni = i + 1;
                nj = j + 1;
                while (ni < this.MAX_ROWS && nj < this.MAX_COLS) {
                  if (this.nodeMatrix[ni][nj]) {
                    secondClickPlace = this.nodeMatrix[ni][nj];
                    break;
                  }
                  ni++;
                  nj++;
                }
                break;
            }

            if(secondClickPlace){
              if(weightTypes === WeightTypes.WEIGHTED_GRAPH){
                const start = Number(this.canvasService.randomGraphWeightStartControl.value);
                const end = Number(this.canvasService.randomGraphWeightEndControl.value);

                const randomWeight = Math.floor(Math.random() * (end - start + 1)) + start;

                this.canvasService.weightControl.patchValue(randomWeight);
              }

              this.canvasService.handleCanvasClick(
                undefined, firstClickPlace
              )
              this.canvasService.handleCanvasClick(
                undefined, secondClickPlace
              )
            }
          }
        }
      }
    }
  }

  generateVertexClickPlace(i: number, j:number): {x:number, y:number}{
    let x = Number((j + this.PADDING) * (2 * NODE_RADIUS + 30));
    let y = Number((i + this.PADDING) * (2 * NODE_RADIUS + 30));

    return  {
      x,
      y,
    }
  }

  getRandomDirectionCombination(min: number = 2, max: number = 8): string[] {
    const allDirections = ['up', 'down', 'left', 'right', 'upright', 'upleft', 'downleft', 'downright'];

    // Clamp the range between 1 and the total number of directions
    min = Math.max(1, Math.min(min, allDirections.length));
    max = Math.max(min, Math.min(max, allDirections.length));

    // Randomly decide how many directions to include
    const count = Math.floor(Math.random() * (max - min + 1)) + min;

    // Shuffle the directions
    const shuffled = [...allDirections];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Return the first 'count' elements
    return shuffled.slice(0, count);
  }

  get densityValue(): number {
    return this.canvasService.randomGraphNodeDenseControl.value ?? 0;
  }

  drawGraph(){

  }
}
