<script lang="ts">
  import Item from "./components/Item.svelte";
  import ListItemView from "./components/Item.svelte";
  import type { ShoppingListItemModel } from "./models/ShoppingListItemModel.js";
  import { GetDummyShoppingList } from "./services/GetDummyShoppingList";
  import { generateString } from "./services/GetRandomId";

  const categories = [
    "Fruit",
    "Vegetable",
    "Cheese",
    "Meat",
    "Dairy",
    "Household",
    "Pasta",
    "Preserved",
  ];
  let shoppingList: ShoppingListItemModel[] = [];
  let newItemName: string = "";
  let newItemQuantity: number = 1;

  $: console.log(shoppingList);

  shoppingList = GetDummyShoppingList();

  function addNewItemToList() {
    if (newItemName.length === 0) return;
    // TODO trigger on ENTER key
    let newItem: ShoppingListItemModel = {
      id: generateString(5),
      name: newItemName,
      quantity: newItemQuantity,
      addedBy: "me",
      category: undefined,
      unit: "piece",
      gotIt: false,
    };

    // TODO if same item exists, don't add it it but increase the quantity of the existing one.
    shoppingList = [...shoppingList, newItem];
    newItemName = "";
  }
  $: filteredList = shoppingList.filter((i) => !i.gotIt);

  function updateTodo(item: ShoppingListItemModel) {
    const i = shoppingList.findIndex((i) => i.id === item.id);
    shoppingList[i] = { ...shoppingList[i], ...item };
  }
</script>

<div class="flex flex-col justify-between">
  <div class="flex flex-col overflow-scroll">
    {#each categories as cat}
      <div>{cat}</div>
      {#each filteredList as item}
        {#if item.category.name === cat}
          <ListItemView {item} on:update={(e) => updateTodo(e.detail)} />
        {/if}
      {/each}
    {/each}
  </div>
  <div class="flex flex-row">
    <input bind:value={newItemName} class="m-2" />
    <div
      class="bg-yellow-400 w-20 "
      on:click={addNewItemToList}
      on:keypress={addNewItemToList}
    >
      Add
    </div>
  </div>
</div>
