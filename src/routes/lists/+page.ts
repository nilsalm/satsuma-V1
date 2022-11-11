import PocketBase from 'pocketbase';
import type { ShoppingList } from 'src/models/ShoppingList';

const client = new PocketBase('http://127.0.0.1:8090');

// fetch a paginated records list
export const resultList = await client.records.getList('shoppingLists', 1, 50, {
	filter: 'created >= "2022-01-01 00:00:00"'
});
