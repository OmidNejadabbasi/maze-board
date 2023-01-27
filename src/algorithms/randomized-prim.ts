import { BehaviorSubject, first } from "rxjs";
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
    let firstP = new Point((this.height - 1) / 2 - 1, (this.width - 1) / 2 - 1);
    console.log(firstP);

    board[firstP.x][firstP.y].next(CellState.BLANK);
    walls.push(...this.getNeighburs(firstP));
    while (walls.length > 0) {
      walls = _.shuffle(walls).filter((e) => {
        return (
          this.getNeighburs(e).filter(
            (e) => board[e.x][e.y].getValue().value === CellState.BLANK.value
          ).length < 2
        );
      });
      let nextWall: Point = walls[walls.length - 1];
      walls.pop();
      let wallNeighburs: Point[] = this.getNeighburs(nextWall);

      let prevCell = wallNeighburs.find(
        (e) => board[e.x][e.y].getValue().value === CellState.BLANK.value
      );
      if (!prevCell) continue;
      let nextCell = new Point(
        nextWall.x - prevCell.x + nextWall.x,
        nextWall.y - prevCell.y + nextWall.y
      );
      board[nextCell.x][nextCell.y].next(CellState.BLANK);
      board[nextWall.x][nextWall.y].next(CellState.BLANK);
      await sleep(this.SLEEP_MS);

      let newWalls = this.getNeighburs(nextCell);
      for (let i = 0; i < newWalls.length; i++) {
        const newWall = board[newWalls[i].x][newWalls[i].y].getValue();
        if (
          newWall.value !== CellState.BLANK_V.value &&
          this.getNeighburs(newWalls[i]).filter(
            (e) => board[e.x][e.y].getValue().value === CellState.BLANK.value
          ).length < 2
        ) {
          walls.push(newWalls[i]);
        }
      }
    }
  }

  getNeighburs(p: Point): Point[] {
    let arr: Point[] = [];
    if (p.x - 1 > 0) arr.push(new Point(p.x - 1, p.y));
    if (p.x + 1 < this.height - 1) arr.push(new Point(p.x + 1, p.y));
    if (p.y + 1 < this.width - 1) arr.push(new Point(p.x, p.y + 1));
    if (p.y - 1 > 0) arr.push(new Point(p.x, p.y - 1));
    return arr;
  }
}
