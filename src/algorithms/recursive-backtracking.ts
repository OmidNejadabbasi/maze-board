import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";
import { randRange } from "../utils";
import { Algorithm } from "./algorithm";
import { fillWithState } from "./board-utils";

export class RecursiveBackTracking
  implements Algorithm<BehaviorSubject<CellState>[][]>
{
  do(board: BehaviorSubject<CellState>[][]): void {
    this.makeReadyForStart(board);
  }

  makeReadyForStart(board: BehaviorSubject<CellState>[][]) {
    let width = board[0].length;
    let height = board.length;

    fillWithState(board, CellState.FILLED);

    board[0][randRange(1, width)].next(CellState.ENDPOINT);
    board[height - 1][randRange(1, width)].next(CellState.ENDPOINT);
  }
}
