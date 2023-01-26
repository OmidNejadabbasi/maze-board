import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";
import { Point } from "../data/Point";
import { randRange, sleep } from "../utils";
import { Algorithm, MazeGenAlgorithm } from "./algorithm";
import { fillWithState } from "./board-utils";
import * as _ from "lodash";
import Cell from "../components/Cell.svelte";

export class RecursiveBackTracking extends MazeGenAlgorithm {
  private SLEEP_MS = 20;
  async do(board: BehaviorSubject<CellState>[][]): Promise<void> {
    let stack: Point[] = [];
    let startP = super.makeReadyForStart(board);
    startP.x--;
    board[startP.x][startP.y].next(CellState.BLANK_V);
    stack.push(startP);

    while (stack.length > 0) {
      let p = stack[stack.length - 1];
      if (!p) break;

      let nextPoints: Point[] = [];
      if (p.x + 2 < this.height && !board[p.x + 2][p.y].getValue().isVisited) {
        nextPoints.push(new Point(p.x + 2, p.y));
      }
      if (p.x - 2 > 0 && !board[p.x - 2][p.y].getValue().isVisited) {
        nextPoints.push(new Point(p.x - 2, p.y));
      }
      if (p.y + 2 < this.width && !board[p.x][p.y + 2].getValue().isVisited) {
        nextPoints.push(new Point(p.x, p.y + 2));
      }
      if (p.y - 2 > 0 && !board[p.x][p.y - 2].getValue().isVisited) {
        nextPoints.push(new Point(p.x, p.y - 2));
      }

      let np;
      if (nextPoints.length > 0) {
        board[p.x][p.y].next(CellState.BLANK_V);
        np = _.sample(nextPoints);
        stack.push(np);
      } else {
        stack.pop();
        np = stack[stack.length - 1];
      }
      let midPoint = new Point(p.x + (np.x - p.x) / 2, p.y + (np.y - p.y) / 2);
      board[midPoint.x][midPoint.y].next(CellState.CHANGING);
      await sleep(this.SLEEP_MS);
      board[midPoint.x][midPoint.y].next(CellState.BLANK_V);
      board[np.x][np.y].next(CellState.CHANGING);
      await sleep(this.SLEEP_MS);
      board[np.x][np.y].next(CellState.BLANK_V);
    }
  }
}
