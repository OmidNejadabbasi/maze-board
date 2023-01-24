export class CellState {
  value: number;
  static BLANK: CellState = new CellState(0);
  static CHANGING: CellState = new CellState(1);
  static FILLED: CellState = new CellState(2);
  static ENDPOINT: CellState = new CellState(3);

  isVisited: boolean = false;
  constructor(val, isVisted: boolean = false) {
    this.value = val;
    this.isVisited = isVisted;
  }
}
