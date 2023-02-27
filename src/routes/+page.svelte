<script lang="ts">
  import { BehaviorSubject } from "rxjs";
  import { run } from "svelte/internal";
  import { Algorithm } from "../algorithms/algorithm";
  import { Dijkastra } from "../algorithms/Dijkastra";
  import { RandomizedPrim } from "../algorithms/randomized-prim";
  import { RecursiveBackTracking } from "../algorithms/recursive-backtracking";
  import "../app.css";
  import Board from "../components/Board.svelte";
  import Button from "../components/Button.svelte";
  import Cell from "../components/Cell.svelte";
  import { CellState } from "../data/Cell";

  let cells: BehaviorSubject<CellState>[][];
  function runAlgorithm(algorithm: Algorithm<BehaviorSubject<CellState>[][]>) {
    algorithm.do(cells);
  }
</script>

<div class="flex flex-col items-center min-h-full">
  <div class="flex flex-col ">
    <div class="flex">
      <div>
        <p class="text-center">Generate Maze with:</p>
        <div class="h-3" />
        <div class="flex">
          <Button
            color="#e32423"
            on:click={() => runAlgorithm(new RecursiveBackTracking(cells))}
            >Back tracing</Button
          >
          <Button
            color="#242e99"
            on:click={() => runAlgorithm(new RandomizedPrim(cells))}
            >Prim's Algorithm</Button
          >
          <Button color="#23e324">Back tracing</Button>
        </div>
      </div>
      <div>
        <p class="text-center">Solve Maze with:</p>
        <div class="h-3" />
        <div class="flex">
          <Button
            color="#e32423"
            on:click={() => runAlgorithm(new Dijkastra(cells))}
          >
            Dijkastra
          </Button>
          <Button
            color="#242e99"
            on:click={() => runAlgorithm(new RandomizedPrim(cells))}
            >A* Search</Button
          >
          <Button color="#23e324">Back tracing</Button>
        </div>
      </div>
    </div>
  </div>
  <div class="h-12" />
  <Board bind:cells width={65} height={65} />

  <div class="flex mt-auto text-center p-1 align-center gap-4">
    <div>Made with ❤ by Omid.N</div>
    <a href="https://github.com/OmidNejadabbasi">
      <img src="./github-mark.svg" alt="" class="w-5 h-5" />
    </a>
  </div>
</div>
