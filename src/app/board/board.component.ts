import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild} from '@angular/core';
import {GraphService} from "../services/graph.service";
import {CanvasService} from "../services/canvas.service";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatCard, MatCardActions} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {MatButton} from "@angular/material/button";
import {GraphSettingsComponent} from "./components/graph-settings/graph-settings.component";
import {BOARD_HEIGHT, BOARD_WIDTH, WeightTypes} from "../contants/graph.constants";
import {GraphInfoComponent} from "./components/graph-info/graph-info.component";
import {NgIf} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    MatCard,
    MatCardActions,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    GraphSettingsComponent,
    GraphInfoComponent,
    NgIf,
    MatTooltip
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease', style({ left: '-100%', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            style({ left: '100%', opacity: 0 }),
            animate('300ms ease', style({ left: '0%', opacity: 1 }))
          ], { optional: true })
        ])
      ]),
      transition(':decrement', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          })
        ], { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease', style({ left: '100%', opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            style({ left: '-100%', opacity: 0 }),
            animate('300ms ease', style({ left: '0%', opacity: 1 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class BoardComponent implements AfterViewInit, OnDestroy{
  private $subscriptions = new Subscription();

  protected readonly WeightTypes = WeightTypes;
  protected readonly BOARD_WIDTH = BOARD_WIDTH;
  protected readonly BOARD_HEIGHT = BOARD_HEIGHT;
  protected readonly window = window;

  // scale: number = 1;
  @ViewChild('graphCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  // @ViewChild('zoomBox', { static: false }) zoomBoxRef!: ElementRef<HTMLDivElement>;
  // @ViewChild('zoomCanvas', { static: false }) zoomCanvasRef!: ElementRef<HTMLCanvasElement>;
  //
  ctx!: CanvasRenderingContext2D;
  // zoomCtx!: CanvasRenderingContext2D;
  //
  // showZoomBox = false;
  // zoomBoxX = 0;
  // zoomBoxY = 0;
  // zoomBoxWidth = 100; // Adjust zoom box size
  // zoomBoxHeight = 100;
  // zoomCanvasWidth = 200; // Double the size for magnification
  // zoomCanvasHeight = 200;
  // zoomFactor = 2; // Magnification factor

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
  ) {
  }

  // @HostListener('wheel', ['$event'])
  // onMouseWheel(event: WheelEvent) {
  //   event.preventDefault(); // Prevent default scrolling behavior
  //
  //   if (event.ctrlKey) { // Check if Ctrl key is pressed
  //     const zoomFactor = event.deltaY * -0.001; // Adjust zoom speed
  //     this.scale += zoomFactor;
  //
  //     // Limit zoom scale (optional)
  //     this.scale = Math.max(0.5, Math.min(2, this.scale)); // Example: 50% to 200%
  //
  //     this.canvasService.drawGraph(this.scale); // Redraw the graph with the new scale
  //   }
  // }

  ngAfterViewInit() {
    this.canvasService.onNewInstance(true);

    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    // this.zoomCtx = this.zoomCanvasRef.nativeElement.getContext('2d')!;

    console.log(`Canvas CONTEXT in [BOARD COMPONENT][${this.ctx}]`);
    console.log(`Canvas REF in [BOARD COMPONENT][${this.ctx}]`);

    this.canvasService.setContext(this.ctx)
    this.canvasService.setCanvasRef(this.canvasRef)

    this.$subscriptions.add(
      this.canvasService.modeControl.valueChanges.subscribe((mode) => {
        console.log(`Canvas Mode Selected: [${mode}]`);

        this.canvasService.selectedNode = null; // Deselect any node when changing modes
      })
    )

  }

  // handleMouseMove(event: MouseEvent) {
  //   this.showZoomBox = true;
  //   this.zoomBoxX = event.offsetX - this.zoomBoxWidth / 2;
  //   this.zoomBoxY = event.offsetY - this.zoomBoxHeight / 2;
  //
  //   // Keep zoom box within canvas bounds
  //   this.zoomBoxX = Math.max(0, Math.min(this.zoomBoxX, this.canvasRef.nativeElement.width - this.zoomBoxWidth));
  //   this.zoomBoxY = Math.max(0, Math.min(this.zoomBoxY, this.canvasRef.nativeElement.height - this.zoomBoxHeight));
  //
  //   this.drawZoomBoxContent();
  // }

  // drawZoomBoxContent() {
  //   if (!this.showZoomBox) return;
  //
  //   const sourceX = this.zoomBoxX;
  //   const sourceY = this.zoomBoxY;
  //   const sourceWidth = this.zoomBoxWidth;
  //   const sourceHeight = this.zoomBoxHeight;
  //
  //   const destX = 0;
  //   const destY = 0;
  //   const destWidth = this.zoomCanvasWidth;
  //   const destHeight = this.zoomCanvasHeight;
  //
  //   this.zoomCtx.drawImage(
  //     this.canvasRef.nativeElement,
  //     sourceX,
  //     sourceY,
  //     sourceWidth,
  //     sourceHeight,
  //     destX,
  //     destY,
  //     destWidth,
  //     destHeight
  //   );
  // }

  // handleMouseLeave() {
  //   this.showZoomBox = false;
  // }

  get currentIndex() {
    return this.canvasService.graphInstanceIndex;
  }

  ngOnDestroy() {
    this.$subscriptions.unsubscribe();
  }

  exportCanvasAsPNG(): void {
    if (!this.canvasRef) return;

    const canvas = this.canvasRef.nativeElement;
    const dataURL = canvas.toDataURL('image/png');

    // Create a link and simulate download
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'graph-canvas.png';
    a.click();
  }

}
