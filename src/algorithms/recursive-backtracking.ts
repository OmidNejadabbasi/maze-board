import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";
import { Point } from "../data/Point";
import { randRange } from "../utils";
import { Algorithm } from "./algorithm";
import { fillWithState } from "./board-utils";
import * as _ from "lodash";

export class RecursiveBackTracking
  implements Algorithm<BehaviorSubject<CellState>[][]>
{
  do(board: BehaviorSubject<CellState>[][]): void {
    let width = board[0].length;
    let height = board.length;
    let stack: Point[] = [];
    let startP = this.makeReadyForStart(board);
    startP.y++;
    stack.push();

    while (stack.length > 0) {
      let p = stack.pop();
      if (!p) break;

      let currentState = board[p.x][p.y].getValue();
      board[p.x][p.y].next({ ...currentState, isVisited: true });

      let nextPoints: Point[] = [];
      if (p?.x + 2 < height && !board[p.x + 2][p.y].getValue().isVisited) {
        nextPoints.push(new Point(p.x + 2, p.y));
      }
      if (p?.x - 2 < height && !board[p.x - 2][p.y].getValue().isVisited) {
        nextPoints.push(new Point(p.x - 2, p.y));
      }
      if (p?.y + 2 < height && !board[p.x][p.y + 2].getValue().isVisited) {
        nextPoints.push(new Point(p.x, p.y + 2));
      }
      if (p?.y - 2 < height && !board[p.x][p.y - 2].getValue().isVisited) {
        nextPoints.push(new Point(p.x, p.y - 2));
      }
      if (nextPoints.length > 0) {
        stack.push(_.sample(nextPoints));
      } else {
        stack.pop();
      }
    }
  }

  makeReadyForStart(board: BehaviorSubject<CellState>[][]): Point {
    let width = board[0].length;
    let height = board.length;
    fillWithState(board, CellState.FILLED);

    let start = new Point(height - 1, randRange(1, width));
    board[0][randRange(1, width)].next(CellState.ENDPOINT);
    board[start.x][start.y].next(CellState.ENDPOINT);
    return start;
  }
}
