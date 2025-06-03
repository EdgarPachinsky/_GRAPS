import { Injectable } from '@angular/core';
import {Edge, Node} from "../../models/graph.model";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  FORCE_DIRECTED_EADES_SPRING_EMBEDDER_C_REP,
  FORCE_DIRECTED_EADES_SPRING_EMBEDDER_C_SPRING, FORCE_DIRECTED_EADES_SPRING_EMBEDDER_COOLDOWN,
  FORCE_DIRECTED_EADES_SPRING_EMBEDDER_EPSILON,
  FORCE_DIRECTED_EADES_SPRING_EMBEDDER_ITERATION_COUNT,
  FORCE_DIRECTED_EADES_SPRING_EMBEDDER_L
} from "../../contants/graph.constants";
import {CanvasService} from "../canvas.service";
import {Vector} from "../../classes/vector";
import {GraphService} from "../graph.service";
import {FormControl, Validators} from "@angular/forms";
import {ACHIEVEMENT_ID} from "../../models/achievements.model";
import {AchievementsService} from "../achievements.service";

@Injectable({
  providedIn: 'root'
})
export class ForceDirectedEadesSpringEmbedderService {

  pausedIterator: number = 0;
  iteration: number = 0;
  animationId: number | null = null; // Store requestAnimationFrame ID
  isPaused: boolean = false;
  isPlaying: boolean = false;
  speedMultiplier: number = 1;
  maximumVertexForceOnIteration: number = 0;

  constructor(
    public graphService: GraphService,
    public canvasService: CanvasService,
    public achievementsService: AchievementsService,
  ) {
  }

  ForceDirectedEadesSpringEmbedder() {
    this.achievementsService.addProgressForRunAlgorithmTypeAchievements(
      ACHIEVEMENT_ID.ALGOHOLIC, "Eades"
    )
    this.isPlaying = true;
    try{
      this.createNewLayout(this.graphService.nodes, this.graphService.edges);
    }catch (e){
    }
  }

  speedUpForceDirected(multiplier: number){
    this.speedMultiplier = multiplier
  }

  createNewLayout(vertexes: Node[], edges: Edge[]) {
    this.iteration = this.pausedIterator; // Initialize from paused iterator
    let maxForceMagnitude = 0;

    const animateLayout = () => {
      let vertexToForceMapping: {[key: number]: Vector} = {};

      // Perform multiple iterations per frame
      for (let i = 0; i < this.speedMultiplier; i++) { // <-- Loop for speed control
        maxForceMagnitude = 0;

        vertexes.forEach((vertex) => {
          // maxForceMagnitude = 0;

          let vertexToVertexFRepMapping:{ [key: string]: Vector } = {}

          let F_net = new Vector(0, 0);

          let F_spring = new Vector(0, 0);

          let F_rep_sum = new Vector(0, 0);

          let F_attr_sum = new Vector(0, 0);

          const u = { position: new Vector(vertex.x, vertex.y) };

          let others = this.graphService.getAllOtherVertexes(vertex, vertexes);
          let neighbours = this.graphService.getAllNeighbourVertexes(vertex, edges);

          others.forEach((otherVertex: Node) => {
            const v = { position: new Vector(otherVertex.x, otherVertex.y) };

            const keyForMapping = `${vertex.number}-${otherVertex.number}`
            const local_f_repulsive = this.repulsiveForce(u, v);

            vertexToVertexFRepMapping[keyForMapping] = local_f_repulsive;

            F_rep_sum.add(local_f_repulsive);
          });

          neighbours.forEach((otherVertex: Node) => {
            const v = { position: new Vector(otherVertex.x, otherVertex.y) };

            const local_f_spring = this.springForce(u,v);

            const local_f_repulsion: Vector | null = vertexToVertexFRepMapping[
               `${vertex.number}-${otherVertex.number}`
              ] || null;

            let f_attractive = local_f_spring;

            if(local_f_repulsion){
              f_attractive.subtract(local_f_repulsion)
            }

            F_attr_sum.add(f_attractive);
          });

          F_net.add(F_rep_sum);
          F_net.add(F_attr_sum);

          vertexToForceMapping[vertex.number] = F_net;
        });


        vertexes.forEach((vertex) => {
          const force = vertexToForceMapping[vertex.number];
          if (!force || isNaN(force.x) || isNaN(force.y)) {
            // console.error('Invalid force for vertex', vertex.number, force);
            return; // or skip this vertex
          }

          vertex.x += vertexToForceMapping[vertex.number].x * FORCE_DIRECTED_EADES_SPRING_EMBEDDER_COOLDOWN;
          vertex.y += vertexToForceMapping[vertex.number].y * FORCE_DIRECTED_EADES_SPRING_EMBEDDER_COOLDOWN;

          let netForceMagnitude = vertexToForceMapping[vertex.number].magnitude();
          if(netForceMagnitude >= maxForceMagnitude){
            maxForceMagnitude = netForceMagnitude;
          }
        });


        this.iteration++;
        this.pausedIterator = this.iteration;
        this.maximumVertexForceOnIteration = maxForceMagnitude;

        if(maxForceMagnitude < FORCE_DIRECTED_EADES_SPRING_EMBEDDER_EPSILON){
          break;
        }
      } // End of speed control loop

      this.canvasService.updateEdgeVertexes();
      this.canvasService.drawGraph();

      if (
        this.iteration >= FORCE_DIRECTED_EADES_SPRING_EMBEDDER_ITERATION_COUNT ||
        maxForceMagnitude < FORCE_DIRECTED_EADES_SPRING_EMBEDDER_EPSILON
      ) {
        cancelAnimationFrame(this.animationId!);
        this.animationId = null;
        this.iteration = 0;
        this.pausedIterator = this.iteration;
        this.isPlaying = false;
        this.graphService.nodes = this.scaleCoordinates(this.graphService.nodes);
        this.canvasService.updateEdgeVertexes();
        this.canvasService.drawGraph();

        return;
      }

      this.animationId = requestAnimationFrame(animateLayout);
    };

    this.animationId = requestAnimationFrame(animateLayout);
  }

  pauseAnimation() {
    this.isPlaying = false;
    this.isPaused = true; // Set the pause flag
    cancelAnimationFrame(this.animationId!); // Stop the current animation frame
  }

  stopAnimation() {
    this.isPlaying = false;
    this.isPaused = false; // Set the pause flag
    cancelAnimationFrame(this.animationId!); // Stop the current animation frame
    this.animationId = null;
    this.iteration = 0;
    this.pausedIterator = this.iteration;
    this.canvasService.clearBoard();
  }

  repulsiveForce(u: any, v: any) {
    // 1. Calculate the displacement vector (p_u - p_v) - REVERSED DIRECTION
    const displacement = new Vector(u.position.x - v.position.x, u.position.y - v.position.y);

    // 2. Calculate the squared distance between u and v (|p_u - p_v|^2)
    const distanceSquared = displacement.magnitudeSquared();

    // 3. Calculate the magnitude of the repulsive force (C_rep / |p_u - p_v|^2)
    const forceMagnitude = FORCE_DIRECTED_EADES_SPRING_EMBEDDER_C_REP / distanceSquared;

    // 4. Calculate the repulsive force vector:
    //    (C_rep / |p_u - p_v|^2) * (p_u - p_v)  (scale the displacement vector)
    return displacement.normalize().scale(forceMagnitude);
  }

  springForce(u: any, v: any) {
    const displacement = new Vector(v.position.x - u.position.x, v.position.y - u.position.y); // Use v - u for direction
    const distance = displacement.magnitude();

    const f_springMagnitude = FORCE_DIRECTED_EADES_SPRING_EMBEDDER_C_SPRING * Math.log(distance / FORCE_DIRECTED_EADES_SPRING_EMBEDDER_L);

    // Apply the force in the direction of the displacement
    return displacement.normalize().scale(f_springMagnitude);
  }

  scaleCoordinates(vertices: any[]) {
    if (!vertices || vertices.length === 0) {
      return [];
    }

    let minX = vertices[0].x;
    let maxX = vertices[0].x;
    let minY = vertices[0].y;
    let maxY = vertices[0].y;

    for (const vertex of vertices) {
      minX = Math.min(minX, vertex.x);
      maxX = Math.max(maxX, vertex.x);
      minY = Math.min(minY, vertex.y);
      maxY = Math.max(maxY, vertex.y);
    }

    const rangeX = maxX - minX;
    const rangeY = maxY - minY;

    const scaleX = parseInt(BOARD_WIDTH) / rangeX;
    const scaleY = parseInt(BOARD_HEIGHT) / rangeY;
    const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

    return vertices.map(vertex => ({
      ...vertex,
      x: (vertex.x - minX) * scale,
      y: (vertex.y - minY) * scale,
    }));
  }

  get forceDirectedSpringEmbedderCompleteStatus() {
    const percentage = (this.iteration / FORCE_DIRECTED_EADES_SPRING_EMBEDDER_ITERATION_COUNT) * 100;
    return Math.min(100, Math.max(0, percentage)).toFixed(2) ; // Ensure percentage is within 0-100 range
  }

  get maxForceInIteration(){
    return this.maximumVertexForceOnIteration.toFixed(2)
  }

  get residualForcesUntilEquilibrium(){
    return (this.maximumVertexForceOnIteration - FORCE_DIRECTED_EADES_SPRING_EMBEDDER_EPSILON).toFixed(2)
  }
}
