<script lang="ts">
  import { CellState } from "../data/Cell";

  export let cell: CellState = CellState.BLANK;
  let bgColor =
    cell.value === 0 ? "white" : cell.value === 1 ? "yellow" : "black";
</script>

<div />

<style>
  div {
    background-color: white;
  }
</style>
