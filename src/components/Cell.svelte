<script lang="ts">
  import { BehaviorSubject } from "rxjs";
  import { getContext, onDestroy } from "svelte";
  import { CellState } from "../data/Cell";
  import { cssVariables } from "../utils";

  export let cell: BehaviorSubject<CellState> = new BehaviorSubject(
    CellState.BLANK
  );
  let bgColor = "white";
  let sub = cell.subscribe((c) => {
    bgColor =
      c.value === 0
        ? "white"
        : c.value === 1
        ? "gold"
        : c.value === 3
        ? "red"
        : "#333";
  });
  onDestroy(() => sub.unsubscribe());

  function cellClick() {
    if (cell.getValue().value === 0) {
      cell.next(CellState.FILLED);
    } else {
      cell.next(CellState.BLANK);
    }
  }
  let { mouseDown } = getContext("mouseDown") as any;
  function cellMouseEnter() {
    if (mouseDown() === false) return;
    cell.next(CellState.FILLED);
  }
</script>

<div
  use:cssVariables={{ bgColor }}
  on:click={cellClick}
  on:mouseenter={cellMouseEnter}
/>

<style>
  div {
    background-color: var(--bgColor);
  }
</style>
