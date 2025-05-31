import { Component } from '@angular/core';
import {CanvasService} from "../../../../services/canvas.service";
import {GraphService} from "../../../../services/graph.service";
import {BreadthFirstSearchService} from "../../../../services/algorithms/breadth-first-search.service";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {DepthFirstSearchService} from "../../../../services/algorithms/depth-first-search.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ALGORITHM_NAMES} from "../../../../contants/graph.constants";

@Component({
  selector: 'app-depth-first-search',
  standalone: true,
  imports: [
    MatButton,
    MatTooltip,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './depth-first-search.component.html',
  styleUrl: './depth-first-search.component.scss'
})
export class DepthFirstSearchComponent {
  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
    public depthFirstSearchService: DepthFirstSearchService
  ) {
  }

    protected readonly ALGORITHM_NAMES = ALGORITHM_NAMES;
}
