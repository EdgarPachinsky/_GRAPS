import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {CanvasService} from "../../../../services/canvas.service";
import {GraphService} from "../../../../services/graph.service";
import {MstKruskalsAlgorithmService} from "../../../../services/algorithms/mst-kruskals-algorithm.service";
import {BreadthFirstSearchService} from "../../../../services/algorithms/breadth-first-search.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ALGORITHM_NAMES} from "../../../../contants/graph.constants";

@Component({
  selector: 'app-breadth-first-search',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './breadth-first-search.component.html',
  styleUrl: './breadth-first-search.component.scss'
})
export class BreadthFirstSearchComponent {
  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
    public breadthFirstSearchService: BreadthFirstSearchService
  ) {
  }

    protected readonly ALGORITHM_NAMES = ALGORITHM_NAMES;
}
