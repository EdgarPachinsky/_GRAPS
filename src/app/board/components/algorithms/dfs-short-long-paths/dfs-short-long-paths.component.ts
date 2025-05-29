import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {GraphService} from "../../../../services/graph.service";
import {CanvasService} from "../../../../services/canvas.service";
import {BfsShortestPathService} from "../../../../services/algorithms/bfs-shortest-path.service";
import {NgClass} from "@angular/common";
import {FindAllAvailablePathsService} from "../../../../services/algorithms/find-all-available-paths.service";

@Component({
  selector: 'app-dfs-short-long-paths',
  standalone: true,
  imports: [
    FormsModule,
    MatAccordion,
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatTooltip,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './dfs-short-long-paths.component.html',
  styleUrl: './dfs-short-long-paths.component.scss'
})
export class DfsShortLongPathsComponent {
  constructor(
    public  graphService: GraphService,
    public  canvasService: CanvasService,
    public  bfsShortestPathService: BfsShortestPathService,
    public  findAllAvailablePathsService: FindAllAvailablePathsService,
  ) {
  }

  protected readonly Object = Object;
}
