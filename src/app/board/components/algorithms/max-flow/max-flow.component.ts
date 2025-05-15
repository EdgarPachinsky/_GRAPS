import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {CanvasService} from "../../../../services/canvas.service";
import {GraphService} from "../../../../services/graph.service";
import {BreadthFirstSearchService} from "../../../../services/algorithms/breadth-first-search.service";
import {MaxFlowService} from "../../../../services/algorithms/max-flow.service";

@Component({
  selector: 'app-max-flow',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip
  ],
  templateUrl: './max-flow.component.html',
  styleUrl: './max-flow.component.scss'
})
export class MaxFlowComponent {
  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
    public breadthFirstSearchService: BreadthFirstSearchService,
    public maxFlowService: MaxFlowService,
  ) {
  }
}
