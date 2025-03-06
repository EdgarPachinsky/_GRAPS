import { Component } from '@angular/core';
import {CanvasService} from "../../../../services/canvas.service";
import {GraphService} from "../../../../services/graph.service";
import {MstPrimsAlgorithmService} from "../../../../services/algorithms/mst-prims-algorithm.service";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-mst-prims-algorithm',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip
  ],
  templateUrl: './mst-prims-algorithm.component.html',
  styleUrl: './mst-prims-algorithm.component.scss'
})
export class MstPrimsAlgorithmComponent {

  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
    public mstPrimsAlgorithmService : MstPrimsAlgorithmService
  ) {
  }
}
