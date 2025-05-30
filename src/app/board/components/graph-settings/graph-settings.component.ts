import {Component, HostListener, OnDestroy, OnInit, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {CanvasService} from "../../../services/canvas.service";
import {ReactiveFormsModule} from "@angular/forms";
import {GraphService} from "../../../services/graph.service";
import {
  DirectionTypes,
  GraphCreateMode,
  MAXIMUM_ALLOWED_LOCAL_EXAMPLES_COUNT,
  WeightTypes
} from "../../../contants/graph.constants";
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
import {JsonPipe, NgClass} from "@angular/common";
import {CdkCopyToClipboard} from "@angular/cdk/clipboard";
import {MaxFlowComponent} from "../algorithms/max-flow/max-flow.component";
import {DepthFirstSearchComponent} from "../algorithms/depth-first-search/depth-first-search.component";
import {AllAvailablePathsComponent} from "../algorithms/all-available-paths/all-available-paths.component";
import {RandomGraphGeneratorService} from "../../../services/random-graph-generator.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSlider, MatSliderModule, MatSliderThumb} from "@angular/material/slider";
import {NgxColorsModule} from "ngx-colors";
import {DfsShortLongPathsComponent} from "../algorithms/dfs-short-long-paths/dfs-short-long-paths.component";

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
    AllAvailablePathsComponent,
    MatSliderModule,
    NgClass,
    NgxColorsModule,
    DfsShortLongPathsComponent
  ],
  templateUrl: './graph-settings.component.html',
  styleUrl: './graph-settings.component.scss',
  animations: [
    trigger('diceShake', [
      state('idle', style({ transform: 'rotate(0deg) scale(1)', opacity: 1 })),
      state('shaking', style({ transform: 'rotate(0deg) scale(1)', opacity: 1 })),
      transition('idle => shaking', [
        animate('400ms', style({ transform: 'rotate(360deg) scale(1.2)', opacity: 0.5 })),
        animate('200ms')
      ]),
    ])
  ]
})
export class GraphSettingsComponent implements OnInit, OnDestroy{
  private $subscriptions = new Subscription();
  public diceState: 'idle' | 'shaking' = 'idle';
  public isSpinningSettings = false;

  protected readonly GRAPH_EXAMPLE_1: GrapsDUMP = GRAPH_EXAMPLE_1;
  protected readonly GRAPH_EXAMPLE_2: GrapsDUMP = GRAPH_EXAMPLE_2;
  protected readonly GRAPH_EXAMPLE_3: GrapsDUMP = GRAPH_EXAMPLE_3;
  protected readonly GRAPH_EXAMPLE_4: GrapsDUMP = GRAPH_EXAMPLE_4;

  protected readonly DirectionTypes = DirectionTypes;
  protected readonly WeightTypes = WeightTypes;

  public graphsArray: any = [];

  public showRandomGraphGeneratorSettings: boolean = false;
  public isShiftPressed = false;

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
    public utilsService: UtilsService,
    public randomGraphGeneratorService: RandomGraphGeneratorService,
  ) {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      this.isShiftPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Shift') {
      this.isShiftPressed = false;
    }
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

    this.$subscriptions.add(
      this.canvasService.regularEdgeColorControl.valueChanges.subscribe((res) => {
        this.canvasService.drawGraph(false)
      })
    )

    this.$subscriptions.add(
      this.canvasService.highlightedEdgeColorControl.valueChanges.subscribe((res) => {
        this.canvasService.drawGraph(false)
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
    if(this.graphsArray && this.graphsArray.length === MAXIMUM_ALLOWED_LOCAL_EXAMPLES_COUNT){
      this.utilsService.showSnackBar('Maximum allowed count of local example excited, please delete at least one and then try to add new graph.', 3000);
      return;
    }
    this.utilsService.addGraph(this.canvasService.graphJson);
    this.updateLocalGraphsArray();
  }

  generateGraph(){
    this.diceState = 'shaking';
    setTimeout(() => this.diceState = 'idle', 600); // reset after animation

    this.randomGraphGeneratorService.generateRandomGraph()
  }

  toggleShowRandomGraphGeneratorSettings(){
    this.isSpinningSettings = true;
    this.showRandomGraphGeneratorSettings = !this.showRandomGraphGeneratorSettings;
  }

  ngOnDestroy() {
    this.$subscriptions.unsubscribe()
  }

  protected readonly MAXIMUM_ALLOWED_LOCAL_EXAMPLES_COUNT = MAXIMUM_ALLOWED_LOCAL_EXAMPLES_COUNT;
  protected readonly GraphCreateMode = GraphCreateMode;
}
