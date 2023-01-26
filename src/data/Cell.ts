export class CellState {
  static BLANK: CellState = new CellState(0);
  static BLANK_V: CellState = new CellState(0, true);
  static CHANGING: CellState = new CellState(1);
  static FILLED: CellState = new CellState(2);
  static ENDPOINT: CellState = new CellState(3);

  readonly value: number;
  readonly isVisited: boolean = false;
  constructor(val, isVisted: boolean = false) {
    this.value = val;
    this.isVisited = isVisted;
  }

  copyWithValue(newValue: number = this.value, isVisited = this.isVisited) {
    return new CellState(newValue, isVisited);
  }
}
