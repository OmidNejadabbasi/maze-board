<script lang="ts">
  import { CellState } from "../data/Cell";

  export let cell: CellState = new CellState();
</script>

<div>
  {cell.isVisted ? "" : "*"}
</div>

<style>
  div {
    border: 1px solid gray;
  }
</style>
