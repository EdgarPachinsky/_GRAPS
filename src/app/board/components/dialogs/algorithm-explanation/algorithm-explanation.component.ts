import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {ALGORITHM_EXPANATIONS} from "../../../../contants/algorithm-explanations.constants";

interface IReceivedData {
  algorithm: string
}

@Component({
  selector: 'app-algorithm-explanation',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './algorithm-explanation.component.html',
  styleUrl: './algorithm-explanation.component.scss'
})
export class AlgorithmExplanationComponent implements OnInit{

  public explanationText!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData: IReceivedData,
  ) {
  }

  ngOnInit() {
    this.explanationText = ALGORITHM_EXPANATIONS[this.receivedData.algorithm]
  }
}
