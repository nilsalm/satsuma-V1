<script lang="ts">
  import ListPage from "./lib/pages/ListPage.svelte";
  import { Router, Route, Link } from "svelte-navigator";
  import LoginPage from "./lib/pages/LoginPage.svelte";
  import PrivateRoute from "./lib/PrivateRoute.svelte";
  import { user } from "./lib/stores";

  function handleLogout() {
    $user = null;
  }
</script>

<Router>
  <header>
    <nav>
      <Link to="lists">Lists</Link>
      <Link to="profile">Profile</Link>
    </nav>
  </header>

  <main>
    <Route path="login">
      <LoginPage />
    </Route>

    <Route path="lists">
      <ListPage />
    </Route>

    <PrivateRoute path="profile" let:location>
      <h3>Welcome {$user.username}</h3>
      <button on:click={handleLogout}>Logout</button>
    </PrivateRoute>
  </main>
</Router>
