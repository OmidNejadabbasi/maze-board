import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";
import { Algorithm, MazeAlgorithm } from "./algorithm";

export class Dijkastra extends MazeAlgorithm {
  do(t: BehaviorSubject<CellState>[][]): void {
    console.log("dijkastra was here!");
  }
}
