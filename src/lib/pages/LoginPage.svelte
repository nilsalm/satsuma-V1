<script lang="ts">
  import PocketBase from "pocketbase";

  const client = new PocketBase("http://127.0.0.1:8090");
  console.log(client);

  let username;
  let password;

  async function handleSubmit() {
    const userData = await client.users.authViaEmail(username, password);
    console.log("userData", userData);
  }
</script>

<h3>Login</h3>
<form on:submit={handleSubmit}>
  <input
    bind:value={username}
    type="text"
    name="username"
    placeholder="Username"
  />
  <br />
  <input
    bind:value={password}
    type="password"
    name="password"
    placeholder="Password"
  />
  <br />
  <button type="submit">Login</button>
</form>
