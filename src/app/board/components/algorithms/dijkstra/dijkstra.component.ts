import { Component } from '@angular/core';
import {CanvasService} from "../../../../services/canvas.service";
import {GraphService} from "../../../../services/graph.service";
import {DijkstraService} from "../../../../services/algorithms/dijkstra.service";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-dijkstra',
  standalone: true,
  imports: [
    MatTooltip,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './dijkstra.component.html',
  styleUrl: './dijkstra.component.scss'
})
export class DijkstraComponent {

  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
    public dijkstraService: DijkstraService
  ) {
  }
}
