<script>
  import "../app.css";
  import Board from "../components/Board.svelte";
  import Button from "../components/Button.svelte";
</script>

<div class="flex flex-col items-center">
  <div class="flex flex-col ">
    <p class="text-center">Generate Maze with:</p>
    <div class="h-3" />
    <div class="flex">
      <Button color="#e32423">Back tracing</Button>
      <Button color="#242e99">Back tracing</Button>
      <Button color="#23e324">Back tracing</Button>
    </div>
  </div>
  <div class="h-12" />
  <Board />
</div>
