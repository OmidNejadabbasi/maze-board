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
  async do(board: BehaviorSubject<CellState>[][]): Promise<void> {
    debugger;
    let width = board[0].length;
    let height = board.length;
    let stack: Point[] = [];
    let startP = this.makeReadyForStart(board);
    startP.x--;
    board[startP.x][startP.y].next(CellState.BLANK_V);
    stack.push(startP);

    while (stack.length > 0) {
      let p = stack[stack.length - 1];
      if (!p) break;

      let currentState = board[p.x][p.y].getValue();
      board[p.x][p.y].next(
        currentState.copyWithValue(currentState.value, true)
      );

      let nextPoints: Point[] = [];
      if (p.x + 2 < height && !board[p.x + 2][p.y].getValue().isVisited) {
        nextPoints.push(new Point(p.x + 2, p.y));
      }
      if (p.x - 2 > 0 && !board[p.x - 2][p.y].getValue().isVisited) {
        nextPoints.push(new Point(p.x - 2, p.y));
      }
      if (p.y + 2 < width && !board[p.x][p.y + 2].getValue().isVisited) {
        nextPoints.push(new Point(p.x, p.y + 2));
      }
      if (p.y - 2 > 0 && !board[p.x][p.y - 2].getValue().isVisited) {
        nextPoints.push(new Point(p.x, p.y - 2));
      }
      debugger;

      if (nextPoints.length > 0) {
        let np = _.sample(nextPoints);
        let midPoint = new Point(
          p.x + (np.x - p.x) / 2,
          p.y + (np.y - p.y) / 2
        );
        board[np.x][np.y].next(CellState.BLANK_V);
        board[midPoint.x][midPoint.y].next(CellState.BLANK_V);
        stack.push(np);
      } else {
        stack.pop();
      }
    }
  }

  makeReadyForStart(board: BehaviorSubject<CellState>[][]): Point {
    let width = board[0].length;
    let height = board.length;
    fillWithState(board, CellState.FILLED);

    let start = new Point(height - 1, randRange(1, (width - 1) / 2) * 2 - 1);
    board[0][randRange(1, (width - 1) / 2) * 2 - 1].next(CellState.ENDPOINT);
    board[start.x][start.y].next(CellState.ENDPOINT);
    return start;
  }
}
