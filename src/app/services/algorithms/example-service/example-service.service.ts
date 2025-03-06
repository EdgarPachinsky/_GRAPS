// @Injectable({
//   providedIn: 'root'
// })
// export class MstKruskalsAlgorithmService {
//
//   private $subscriptions = new Subscription();
//
//   iteration: number = 0;
//   pausedIterator: number = 0;
//
//   animationId: number | null = null; // Store requestAnimationFrame ID
//   isPaused: boolean = false;
//   isPlaying: boolean = false;
//
//   constructor(
//     public graphService: GraphService,
//     public canvasService: CanvasService,
//   ) {
//
//   }
//
//   createNewLayout(vertexes: Node[]) {
//     this.isPlaying = true;
//     this.isPaused = false;
//
//     this.iteration = this.pausedIterator; // Initialize from paused iterator
//
//     const animateLayout = () => {
//
//
//       this.canvasService.drawGraph(false); // Clear and redraw the graph
//
//       this.iteration++; // Update iteration
//       this.pausedIterator = this.iteration; // Update paused iterator
//
//       this.animationId = requestAnimationFrame(animateLayout);
//     };
//
//     this.animationId = requestAnimationFrame(animateLayout);
//   }
//
//
//   pauseAnimation() {
//     this.isPlaying = false;
//     this.isPaused = true; // Set the pause flag
//     cancelAnimationFrame(this.animationId!); // Stop the current animation frame
//   }
//
//   stopAnimation() {
//     this.isPlaying = false;
//     this.isPaused = false; // Set the pause flag
//
//     this.animationId = null;
//     this.iteration = 0;
//     this.pausedIterator = this.iteration;
//
//     this.canvasService.clearBoard();
//
//     cancelAnimationFrame(this.animationId!); // Stop the current animation frame
//   }
//
// }
