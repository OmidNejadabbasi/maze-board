<script lang="ts">
  import { CellState } from "../data/Cell";
  import Cell from "./Cell.svelte";
  import * as _ from "lodash";
  import { cssVariables } from "../utils";

  let s: string = "inn";

  export let cells: CellState[][] = [];
  export let width: number = 15;
  export let height: number = 15;

  cells = _.chunk(_.fill(new Array(width * height), new CellState()), width);
</script>

<div id="board-container" use:cssVariables={{ width, height }}>
  {#each cells as cellRow}
    {#each cellRow as cell}
      <Cell {cell} />
    {/each}
  {/each}
</div>

<style>
  #board-container {
    display: grid;
    grid-template-rows: repeat(var(--width), 1fr);
    grid-template-columns: repeat(var(--height), 1fr);
    gap: 1px;
    background-color: black;
    border: 1px solid black;
    width: 300px;
    height: 300px;
  }
</style>
