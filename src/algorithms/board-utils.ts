import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";

export function fillWithState(
  board: BehaviorSubject<CellState>[][],
  state: CellState
) {
  let count = 0;
  let width = board[0].length;
  let height = board.length;
  console.log(width, height);

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      count++;
      board[i][j].next(state);
    }
  }
  console.log("count " + count);
}
