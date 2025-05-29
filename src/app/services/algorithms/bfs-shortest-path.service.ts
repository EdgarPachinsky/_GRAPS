import { Injectable } from '@angular/core';
import {FindAllAvailablePathsService} from "./find-all-available-paths.service";
import {FormControl, Validators} from "@angular/forms";
import {Node} from "../../models/graph.model";

@Injectable({
  providedIn: 'root'
})
export class BfsShortestPathService {


  public showInputs: boolean = false;
  public showResults: boolean = true;

  public distanceControl = new FormControl('shortest');
  public startPointControl = new FormControl(1, [Validators.required]);
  public endPointControl = new FormControl(5, [Validators.required]);

  public groupedPaths: any  = {};
  public pathsToShow: any[] = [];

  public pathLength!: number;
  public minimumOrMaximumPathLength!: number;
  public pathDetailsList: { label: string, path: Node[] }[] = [];
  public highLightCurrentPath: number = -1;

  constructor(
    public allAvailablePathsService: FindAllAvailablePathsService
  ) { }


  BFSShortestPaths(){
    this.groupedPaths = {};


    let allPaths = this.allAvailablePathsService.findAllAvailablePaths(
      true,
      this.startPointControl.value?.toString(),
      this.endPointControl.value?.toString(),
    )


    this.groupedPaths = this.groupPathsByLength(
      allPaths
    )


    let allKeysArray = Object.keys(this.groupedPaths);

    if(allKeysArray.length){
      if(this.distanceControl.value === 'shortest'){
        let firstKey = allKeysArray[0];

        this.pathsToShow = this.groupedPaths[firstKey];
      }else if(this.distanceControl.value === 'longest'){
        let lastKey = allKeysArray[allKeysArray.length - 1];

        this.pathsToShow = this.groupedPaths[lastKey];
      }else{
        //TODO: add also both case
      }
    }

    if(this.pathsToShow.length){
      this.pathLength = this.pathsToShow.length;
      this.minimumOrMaximumPathLength = this.pathsToShow[0].length
      this.pathDetailsList = this.pathsToShow.map((path, index) => ({
        label: `PATH [${index + 1}]`,
        path
      }));
    }
    else{
      this.pathLength = 0
      this.minimumOrMaximumPathLength = 0;
      this.pathDetailsList.push({
        label: `NO PATHS FOUND`,
        path: []
      })
    }
  }

  groupPathsByLength(paths: any): Record<number, any[][]> {
    const grouped: Record<number, any[][]> = {};

    for (const path of paths) {
      const len = path.length;
      if (!grouped[len]) {
        grouped[len] = [];
      }
      grouped[len].push(path);
    }

    // Ensure keys are in growing order by reconstructing the object
    const sortedKeys = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => a - b);

    const sortedGrouped: Record<number, any[][]> = {};
    for (const key of sortedKeys) {
      sortedGrouped[key] = grouped[key];
    }

    return sortedGrouped;
  }

  toggleInputs() {
    this.showInputs = !this.showInputs
  }
  toggleResults() {
    this.showResults = !this.showResults
  }
}
