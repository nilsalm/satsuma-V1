<script lang="ts">
  let user = { loggedIn: true };
  function toggle() {
    user.loggedIn = !user.loggedIn;
  }
</script>

<div class="flex flex-row">
  <div class="text-xl">Satsuma</div>

  {#if user.loggedIn}
    <button on:click={toggle}> Log out </button>
    <div />
  {/if}

  {#if !user.loggedIn}
    <button on:click={toggle}> Log in </button>
  {/if}
</div>
