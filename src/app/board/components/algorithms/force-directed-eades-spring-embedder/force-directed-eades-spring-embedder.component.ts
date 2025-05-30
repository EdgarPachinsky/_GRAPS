import { Component } from '@angular/core';
import {CanvasService} from "../../../../services/canvas.service";
import {
  ForceDirectedEadesSpringEmbedderService
} from "../../../../services/algorithms/force-directed-eades-spring-embedder.service";
import {GraphService} from "../../../../services/graph.service";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";
import {ALGORITHM_NAMES} from "../../../../contants/graph.constants";

@Component({
  selector: 'app-force-directed-eades-spring-embedder',
  standalone: true,
  imports: [
    MatTooltip,
    MatButton
  ],
  templateUrl: './force-directed-eades-spring-embedder.component.html',
  styleUrl: './force-directed-eades-spring-embedder.component.scss'
})
export class ForceDirectedEadesSpringEmbedderComponent {

  constructor(
    public canvasService: CanvasService,
    public graphService: GraphService,
    public forceDirectedEadesSpringEmbedderService: ForceDirectedEadesSpringEmbedderService,
  ) {
  }

  protected readonly ALGORITHM_NAMES = ALGORITHM_NAMES;
}
