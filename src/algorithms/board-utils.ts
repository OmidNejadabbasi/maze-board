import { BehaviorSubject } from "rxjs";
import { CellState } from "../data/Cell";

export function fillWithState(
  board: BehaviorSubject<CellState>[][],
  state: CellState
) {
  board.forEach((e) => {
    e.forEach((i) => i.next(state));
  });
}
