import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {GrapsDUMP} from "../models/graph.model";

const STORAGE_KEY = "graphs";

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


  // --- Save Graphs ---
  saveGraphs(graphs: GrapsDUMP[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(graphs));
    } catch (error) {
      console.error("Error saving graphs to localStorage:", error);
      // Handle the error appropriately (e.g., show a message to the user)
      // Consider using a more robust storage mechanism if localStorage is failing
    }
  }

  // --- Get Graphs ---
  getGraphs() {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData === null) {
        return null; // No data found
      }
      return JSON.parse(storedData); // Parse and cast
    } catch (error) {
      console.error("Error getting graphs from localStorage:", error);
      // Handle the error (e.g., show a message, return a default value)
      return null; // Or return an empty array: []
    }
  }

  // --- Delete All Graphs ---
  deleteAllGraphs(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error deleting graphs from localStorage:", error);
    }
  }

  // --- Add a New Graph ---
  addGraph(newGraph: any): void {
    try{
      const graphs = this.getGraphs() || []; // Get existing graphs or an empty array
      graphs.push(newGraph);
      this.saveGraphs(graphs);
    } catch(error){
      console.error("Error adding graph", error);
    }
  }

  // --- Delete a Specific Graph by ID ---
  deleteGraphByIndex(index: number): void {
    try {
      const graphs = this.getGraphs();
      if (!graphs) {
        return;
      }

      graphs.splice(index, 1)
      this.saveGraphs(graphs);
    } catch (error) {
      console.error("Error deleting graph by ID:", error);
    }
  }
}
