import { Component } from '@angular/core';
import {AchievementsService} from "../../../../services/achievements.service";
import {MatDialogContent} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {ACHIEVEMENT_CATEGORY_INFO} from "../../../../contants/achievements.constants";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [
    MatDialogContent,
    MatCardModule, MatChipsModule, MatTooltip, MatButton
  ],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {


  constructor(
    public achievementsService: AchievementsService,
  ) {
  }


  protected readonly ACHIEVEMENT_CATEGORY_INFO = ACHIEVEMENT_CATEGORY_INFO;
}
