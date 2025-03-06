import {ElementRef, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {GraphService} from "./graph.service";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public showGraphJson: boolean = false;
  public showGrapsDumpImportInput: boolean = false;

  constructor(
    public matSnackBar: MatSnackBar,
  ) { }

  showSnackBar(message: string, durationInMilliseconds: number = 1000) {
    this.matSnackBar.open(message, '', {duration: durationInMilliseconds})
  }
}
