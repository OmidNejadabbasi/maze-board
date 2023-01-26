import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";
import { Point } from "../data/Point";
import { randRange, sleep } from "../utils";
import { Algorithm, MazeGenAlgorithm } from "./algorithm";
import { fillWithState } from "./board-utils";
import * as _ from "lodash";
import Cell from "../components/Cell.svelte";

export class RandomizedPrim extends MazeGenAlgorithm {
  private SLEEP_MS = 20;

  async do(board: BehaviorSubject<CellState>[][]): Promise<void> {
    let stack: Point[] = [];
    let startP = this.makeReadyForStart(board);
    startP.x--;

    let walls: Point[] = [];
    while (true) {}
  }
}
