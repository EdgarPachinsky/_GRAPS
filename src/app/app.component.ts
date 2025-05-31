import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BoardComponent} from "./board/board.component";
import {MatCard, MatCardActions} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {BOARD_HEIGHT, BOARD_WIDTH} from "./contants/graph.constants";
import {MatTooltip} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, MatCard, MatCardActions, MatToolbar, MatIconButton, MatIcon, MatTooltip, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public tooltips = [
    "Graph it till you make it.",
    "Edges connect, just like we do.",
    "Fueled by Dijkstra and determination.",
    "Love at first node.",
    "Drawing paths to your heart.",
    "Kruskal me softly.",
    "Keep calm and BFS on.",
    "Stay connected, stay sharp.",
    "DFS deep into your dreams.",
    "Nodes before bros.",
    "Just a node in the universe.",
    "Pathfinding through passion.",
    "Primed for greatness.",
    "I’ve got 99 problems but disconnection ain’t one.",
    "Be the edge that links it all.",
    "Shortest path to joy.",
    "No cycles, just growth.",
    "Hover, connect, repeat.",
    "Weighted with meaning.",
    "Graph vibes only.",
    "Let your edges shine.",
    "From chaos to structure — one node at a time.",
    "Hearts and hex values.",
    "My love is strongly connected.",
    "The graph awakens.",
    "Traversing the way to your heart.",
    "Where algorithms meet art.",
    "Aesthetic and asymptotic.",
    "Minimal spanning, maximum feeling.",
    "Unweighted, but not unloved.",
    "I'm rooted in recursion.",
    "You complete my component tree.",
    "Synced in every state.",
    "Locally stored love.",
    "Let's make a connection.",
    "Graph goals: beautiful and optimized.",
    "One graph to rule them all.",
    "Keep your edges soft and your nodes strong.",
    "Combinatorics and cuddles.",
    "Just a click away from connected.",
    "All your base nodes are belong to us.",
    "It’s not a bug, it’s a hidden edge.",
    "This relationship is acyclic.",
    "Highlighting more than just paths.",
    "Feeling lucky? Try DFS.",
    "Searching for love in all directions.",
    "Made with logic and love.",
    "You’re my favorite vertex.",
    "Hover if you feel connected.",
    "Let’s link and sync.",

    "You again? Still hovering?",
    "Why are you poking the heart?",
    "Hovering intensifies...",
    "Graph crush detected ❤️",
    "Don't break the heart – it graphs easily.",
    "Loading humor... complete.",
    "Edges wish they had your commitment.",
    "This tooltip brought to you by caffeine.",
    "So many nodes, so little time.",
    "A wild vertex appears!",
    "404: Logic not found. Still cute tho.",
    "Math is hard. Love is harder.",
    "You hovered. I noticed.",
    "Your curiosity is strongly connected.",
    "Feeling loopy today?",
    "Hover responsibly.",
    "Careful, it bites.",
    "Your algorithmic affection is noted.",
    "Does this hover make me look fat?",
    "Still hovering? I'm blushing.",
    "You touch the heart, you touch the graph.",
    "Somewhere, Dijkstra is smiling.",
    "Edges? I thought you said hedges.",
    "There’s no place like node.",
    "Halt! Who hovers there?",
    "Too many tooltips. Need more RAM.",
    "This tooltip is AI-approved.",
    "Even graphs need affection.",
    "Tooltip.exe has started.",
    "Achievement unlocked: Tooltip Lover. 🏆",
    "You found the easter egg! (Just kidding)",
    "Keep going. You’ll find the meaning of life.",
    "Feeling lucky, hoverer?",
    "Is this... love at first hover?",
    "You've unlocked the secret node (not really).",
    "Nice hover technique. Very elegant.",
    "If graphs had feelings, this one would hug you.",
    "You're building strong emotional edges.",
    "Graphception: a graph inside your heart.",
    "One does not simply stop hovering.",
    "Hover harder!",
    "That’s one small hover for man...",
    "Keep hovering — I dare you.",
    "Your graph-fu is strong.",
    "More hover, more power.",
    "Hover XP increased +1.",
    "Are we in a recursive tooltip?",
    "You have reached maximum heart capacity.",
    "Node by node, we build connection.",
    "This heart beats in O(1).",
    "Hover on, brave traveler."
  ];
  public currentTooltip = this.tooltips[0];

  changeTooltip() {
    const random = Math.floor(Math.random() * this.tooltips.length);
    setTimeout(() => this.currentTooltip = this.tooltips[random], 0)
  }
}
