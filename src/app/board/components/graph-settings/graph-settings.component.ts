import {Component, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {CanvasService} from "../../../services/canvas.service";
import {ReactiveFormsModule} from "@angular/forms";
import {GraphService} from "../../../services/graph.service";
import {DirectionTypes, WeightTypes} from "../../../contants/graph.constants";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {UtilsService} from "../../../services/utils.service";
import {GRAPH_EXAMPLE_1, GRAPH_EXAMPLE_2, GRAPH_EXAMPLE_3, GRAPH_EXAMPLE_4} from "../../../examples/graph-examples";
import {GrapsDUMP} from "../../../models/graph.model";
import {MatTooltip} from "@angular/material/tooltip";
import {
  ForceDirectedEadesSpringEmbedderComponent
} from "../algorithms/force-directed-eades-spring-embedder/force-directed-eades-spring-embedder.component";
import {DijkstraComponent} from "../algorithms/dijkstra/dijkstra.component";
import {MstKruskalsAlgorithmComponent} from "../algorithms/mst-kruskals-algorithm/mst-kruskals-algorithm.component";
import {MstPrimsAlgorithmComponent} from "../algorithms/mst-prims-algorithm/mst-prims-algorithm.component";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-graph-settings',
  standalone: true,
  imports: [
    MatButton,
    MatButtonToggle,
    MatButtonToggleGroup,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatTooltip,
    ForceDirectedEadesSpringEmbedderComponent,
    DijkstraComponent,
    MstKruskalsAlgorithmComponent,
    MstPrimsAlgorithmComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule
  ],
  templateUrl: './graph-settings.component.html',
  styleUrl: './graph-settings.component.scss'
})
export class GraphSettingsComponent {

  protected readonly GRAPH_EXAMPLE_1: GrapsDUMP = GRAPH_EXAMPLE_1;
  protected readonly GRAPH_EXAMPLE_2: GrapsDUMP = GRAPH_EXAMPLE_2;
  protected readonly GRAPH_EXAMPLE_3: GrapsDUMP = GRAPH_EXAMPLE_3;
  protected readonly GRAPH_EXAMPLE_4: GrapsDUMP = GRAPH_EXAMPLE_4;

  protected readonly DirectionTypes = DirectionTypes;
  protected readonly WeightTypes = WeightTypes;

  readonly panelOpenState = signal(false);

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
    public utilsService: UtilsService,
  ) {
  }

}
