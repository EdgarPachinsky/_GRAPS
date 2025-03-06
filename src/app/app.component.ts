import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BoardComponent} from "./board/board.component";
import {MatCard, MatCardActions} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {BOARD_HEIGHT, BOARD_WIDTH} from "./contants/graph.constants";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoardComponent, MatCard, MatCardActions, MatToolbar, MatIconButton, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'graph-visualisations';

  protected readonly BOARD_WIDTH = BOARD_WIDTH;
  protected readonly BOARD_HEIGHT = BOARD_HEIGHT;
}
