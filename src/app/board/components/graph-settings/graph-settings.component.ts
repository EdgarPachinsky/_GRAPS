import {Component, OnDestroy, OnInit, signal} from '@angular/core';
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
import {BreadthFirstSearchComponent} from "../algorithms/breadth-first-search/breadth-first-search.component";
import {Subscription} from "rxjs";
import {JsonPipe} from "@angular/common";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {MaxFlowComponent} from "../algorithms/max-flow/max-flow.component";
import {DepthFirstSearchComponent} from "../algorithms/depth-first-search/depth-first-search.component";
import {AllAvailablePathsComponent} from "../algorithms/all-available-paths/all-available-paths.component";

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
    MatExpansionModule,
    BreadthFirstSearchComponent,
    JsonPipe,
    CdkCopyToClipboard,
    MaxFlowComponent,
    DepthFirstSearchComponent,
    AllAvailablePathsComponent
  ],
  templateUrl: './graph-settings.component.html',
  styleUrl: './graph-settings.component.scss'
})
export class GraphSettingsComponent implements OnInit, OnDestroy{
  private $subscriptions = new Subscription();

  protected readonly GRAPH_EXAMPLE_1: GrapsDUMP = GRAPH_EXAMPLE_1;
  protected readonly GRAPH_EXAMPLE_2: GrapsDUMP = GRAPH_EXAMPLE_2;
  protected readonly GRAPH_EXAMPLE_3: GrapsDUMP = GRAPH_EXAMPLE_3;
  protected readonly GRAPH_EXAMPLE_4: GrapsDUMP = GRAPH_EXAMPLE_4;

  protected readonly DirectionTypes = DirectionTypes;
  protected readonly WeightTypes = WeightTypes;

  public localStorageExamples: GrapsDUMP[] = []

  graphsArray: any = [];

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
    public utilsService: UtilsService,
  ) {
  }

  ngOnInit() {
    this.updateLocalGraphsArray();

    this.$subscriptions.add(
      this.canvasService.updateLocalGraphsArray.subscribe((res) => {
        if(res){
          this.updateLocalGraphsArray();
        }
      })
    )
  }

  updateLocalGraphsArray(){
    this.graphsArray = this.utilsService.getGraphs();
  }

  removeGraphFromLocalArray(index: number){
    this.utilsService.deleteGraphByIndex(index);
    this.updateLocalGraphsArray();
  }

  addToLocalExamples(){
    if(this.graphsArray.length > 2){
      this.utilsService.showSnackBar('Maximum allowed count of local example excited, please delete at least one and then try to add new graph.', 3000);
      return;
    }
    this.utilsService.addGraph(this.canvasService.graphJson);
    this.updateLocalGraphsArray();
  }

  ngOnDestroy() {
    this.$subscriptions.unsubscribe()
  }
}
