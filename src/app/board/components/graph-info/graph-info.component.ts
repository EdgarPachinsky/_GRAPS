import { Component } from '@angular/core';
import {WeightTypes} from "../../../contants/graph.constants";
import {GraphService} from "../../../services/graph.service";
import {CanvasService} from "../../../services/canvas.service";
import {JsonPipe} from "@angular/common";
import {UtilsService} from "../../../services/utils.service";
import {MatButton} from "@angular/material/button";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-graph-info',
  standalone: true,
  imports: [
    JsonPipe,
    MatButton,
    CdkCopyToClipboard
  ],
  templateUrl: './graph-info.component.html',
  styleUrl: './graph-info.component.scss'
})
export class GraphInfoComponent {

    protected readonly WeightTypes = WeightTypes;

    constructor(
      public graphService: GraphService,
      public canvasService: CanvasService,
      public utilsService: UtilsService,
    ) {
    }

    get graphJson(){
      return {
        vertices: this.graphService.nodes,
        edges: this.graphService.edges,
        direction: this.canvasService.directionTypeControl.value,
        weighted: this.canvasService.weightTypeControl.value,
      }
    }
}
