<script lang="ts">
  import type { Plugin } from "$lib/types";
  import { writable } from "svelte/store";

  let loading = writable(true);

  const pluginsPromise = fetch("/api/plugin/user_owned")
    .then((res) => res.json())
    .then((res) => res.data as Plugin[]);
</script>

{#await pluginsPromise}
  Loading yours plugins...
{:then plugins}
  <ul>
    {#each plugins as plugin}
      <li>
        <a href={`/plugins/${plugin.id}`}>
          {plugin.name} {JSON.stringify(plugin.versions)}
        </a>
      </li>
    {/each}
  </ul>
{:catch error}
  <p>Something happened while fetching plugins</p>
{/await}
