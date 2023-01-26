<script lang="ts">
  import { BehaviorSubject } from "rxjs";
  import { run } from "svelte/internal";
  import { Algorithm } from "../algorithms/algorithm";
  import { RecursiveBackTracking } from "../algorithms/recursive-backtracking";
  import "../app.css";
  import Board from "../components/Board.svelte";
  import Button from "../components/Button.svelte";
  import Cell from "../components/Cell.svelte";
  import { CellState } from "../data/Cell";

  let cells: BehaviorSubject<CellState>[][];
  function runAlgorithm(algorithm: Algorithm<BehaviorSubject<CellState>[][]>) {
    console.log("1");

    algorithm.do(cells);
  }
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col ">
    <p class="text-center">Generate Maze with:</p>
    <div class="h-3" />
    <div class="flex">
      <Button
        color="#e32423"
        on:click={() => runAlgorithm(new RecursiveBackTracking(cells))}
        >Back tracing</Button
      >
      <Button color="#242e99">Back tracing</Button>
      <Button color="#23e324">Back tracing</Button>
    </div>
  </div>
  <div class="h-12" />
  <Board bind:cells />
</div>
