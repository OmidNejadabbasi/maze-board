import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";
import { Point } from "../data/Point";
import { randRange } from "../utils";
import { fillWithState } from "./board-utils";

export abstract class Algorithm<T> {
  abstract do(t: T): void;
}

export abstract class MazeGenAlgorithm extends Algorithm<
  BehaviorSubject<CellState>[][]
> {
  width: number;
  height: number;
  constructor(board: BehaviorSubject<CellState>[][]) {
    super();
    this.width = board[0].length;
    this.height = board.length;
  }

  protected makeReadyForStart(board: BehaviorSubject<CellState>[][]): Point {
    let width = board[0].length;
    let height = board.length;
    fillWithState(board, CellState.FILLED);

    let start = new Point(height - 1, randRange(1, (width - 1) / 2) * 2 - 1);
    board[0][randRange(1, (width - 1) / 2) * 2 - 1].next(CellState.ENDPOINT);
    board[start.x][start.y].next(CellState.ENDPOINT);
    return start;
  }
}
