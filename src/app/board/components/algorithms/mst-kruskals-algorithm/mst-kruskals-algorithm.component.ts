import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MstKruskalsAlgorithmService} from "../../../../services/algorithms/mst-kruskals-algorithm.service";
import {GraphService} from "../../../../services/graph.service";
import {CanvasService} from "../../../../services/canvas.service";

@Component({
  selector: 'app-mst-kruskals-algorithm',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip
  ],
  templateUrl: './mst-kruskals-algorithm.component.html',
  styleUrl: './mst-kruskals-algorithm.component.scss'
})
export class MstKruskalsAlgorithmComponent {

  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
    public mstKruskalsAlgorithmService : MstKruskalsAlgorithmService
  ) {
  }
}
