<script lang="ts">
  import { CellState } from "../data/Cell";
  import Cell from "./Cell.svelte";
  import * as _ from "lodash";

  let s: string = "inn";

  export let cells: CellState[][] = [];
  export let width: number = 15;
  export let height: number = 15;

  cells = _.chunk(_.fill(new Array(width * height), new CellState()), width);

  function cssVariables(node: any, variables: any) {
    setCssVariables(node, variables);

    return {
      update(variables: any) {
        setCssVariables(node, variables);
      },
    };
  }
  function setCssVariables(node, variables) {
    for (const name in variables) {
      node.style.setProperty(`--${name}`, variables[name]);
    }
  }
</script>

<div class="grid" use:cssVariables={{ width, height }}>
  {#each cells as cellRow}
    {#each cellRow as cell}
      <Cell {cell} />
    {/each}
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-rows: repeat(var(--width), 1fr);
    grid-template-columns: repeat(var(--height), 1fr);
    width: 300px;
    height: 300px;
  }
</style>
