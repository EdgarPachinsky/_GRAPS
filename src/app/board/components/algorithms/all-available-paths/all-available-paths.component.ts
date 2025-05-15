import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {CanvasService} from "../../../../services/canvas.service";
import {GraphService} from "../../../../services/graph.service";
import {BreadthFirstSearchService} from "../../../../services/algorithms/breadth-first-search.service";
import {FindAllAvailablePathsService} from "../../../../services/algorithms/find-all-available-paths.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-all-available-paths',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatTooltip,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './all-available-paths.component.html',
  styleUrl: './all-available-paths.component.scss'
})
export class AllAvailablePathsComponent {
  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
    public findAllAvailablePathsService: FindAllAvailablePathsService
  ) {
  }
}
