<script lang="ts">
  import { BehaviorSubject } from "rxjs";
  import { onDestroy } from "svelte";
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
        ? "yellow"
        : c.value === 3
        ? "red"
        : "black";
  });
  onDestroy(() => sub.unsubscribe());
</script>

<div use:cssVariables={{ bgColor }} />

<style>
  div {
    background-color: var(--bgColor);
  }
</style>
