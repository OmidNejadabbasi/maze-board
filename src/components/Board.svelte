<script lang="ts">
  import { CellState } from "../data/Cell";
  import Cell from "./Cell.svelte";
  import * as _ from "lodash";
  import { cssVariables } from "../utils";
  import { BehaviorSubject } from "rxjs";
  import { setContext } from "svelte";

  let s: string = "inn";

  export let cells: BehaviorSubject<CellState>[][] = [];
  export let width: number = 45;
  export let height: number = 45;
  let mouseDown = false;
  setContext("mouseDown", { mouseDown: () => mouseDown });

  cells = _.chunk(_.fill(new Array(width * height), null), width);

  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      cells[i][j] = new BehaviorSubject<CellState>(CellState.BLANK);
    }
  }

  function onMouseDown() {
    mouseDown = true;
  }
  function onMouseUp() {
    mouseDown = false;
  }
</script>

<div
  id="board-container"
  use:cssVariables={{ width, height }}
  on:mousedown={onMouseDown}
  on:mouseup={onMouseUp}
>
  {#each cells as cellRow}
    {#each cellRow as cell}
      <Cell {cell} />
    {/each}
  {/each}
</div>

<style>
  #board-container {
    display: grid;
    grid-template-rows: repeat(var(--height), 1fr);
    grid-template-columns: repeat(var(--width), 1fr);
    gap: 0px;
    border: 1px solid black;
    width: 500px;
    height: 500px;
  }
</style>
