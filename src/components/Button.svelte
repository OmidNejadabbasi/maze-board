<script>
  import { cssVariables } from "../utils";
  export let color = "grey";
</script>

<button
  on:click
  class="p-3 border rounded-md text-white"
  use:cssVariables={{ color }}
>
  <slot />
</button>

<style>
  button {
    background-color: var(--color);
  }
</style>
