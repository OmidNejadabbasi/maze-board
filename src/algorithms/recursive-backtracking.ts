import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";
import { Algorithm } from "./algorithm";

export class RecursiveBackTracking
  implements Algorithm<BehaviorSubject<CellState>[][]>
{
  do(board: BehaviorSubject<CellState>[][]): void {}

  makeReadyForStart(board: BehaviorSubject<CellState>[][]) {}
}
