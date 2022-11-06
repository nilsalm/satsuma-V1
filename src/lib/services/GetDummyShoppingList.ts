import type { Category } from "../models/CategoryModel";
import type { ShoppingListItemModel } from "../models/ShoppingListItemModel";
import { generateString } from "./GetRandomId";

export function GetDummyShoppingList() {
  const fruit: Category = {
    id: generateString(5),
    name: "Fruit",
  }
  const vegetable: Category = {
    id: generateString(5),
    name: "Vegetable",
  }
  const cheese: Category = {
    id: generateString(5),
    name: "Cheese",
  }
  const meat: Category = {
    id: generateString(5),
    name: "Meat",
  }
  const dairy: Category = {
    id: generateString(5),
    name: "Dairy",
  }
  const household: Category = {
    id: generateString(5),
    name: "Household",
  }
  const pasta: Category = {
    id: generateString(5),
    name: "Pasta",
  }
  const preserved: Category = {
    id: generateString(5),
    name: "Preserved",
  }


  let shoppingList: ShoppingListItemModel[] = [];

  // FRUITS
  shoppingList.push({
    id: generateString(5),
    name: "Banan",
    category: fruit,
    quantity: 5,
    unit: "piece",
    gotIt: false,
  } as ShoppingListItemModel);
  shoppingList.push({
    id: generateString(5),
    name: "Melon",
    category: fruit,
    quantity: 1,
    unit: "piece",
    gotIt: false,
  } as ShoppingListItemModel);
  shoppingList.push({
    id: generateString(5),
    name: "Citron",
    category: fruit,
    quantity: 2, unit: "piece",
    gotIt: false,
  } as ShoppingListItemModel);
  shoppingList.push({
    id: generateString(5),
    name: "Satsuma",
    category: fruit,
    quantity: 14, unit: "piece",
    gotIt: false,
  } as ShoppingListItemModel);

  // VEGETABLES
  shoppingList.push({
    id: generateString(5),
    name: "Potatos",
    category: vegetable,
    quantity: 1, unit: "kg",
    gotIt: false,
  } as ShoppingListItemModel);
  shoppingList.push({
    id: generateString(5),
    name: "Carrot",
    category: vegetable,
    quantity: 5, unit: "piece",
    gotIt: false,
  } as ShoppingListItemModel);

  // Cheese
  shoppingList.push({
    id: generateString(5),
    name: "Hushållsost",
    category: cheese,
    quantity: 1, unit: "kg",
    gotIt: false,
  } as ShoppingListItemModel);
  shoppingList.push({
    id: generateString(5),
    name: "Feta",
    category: cheese,
    quantity: 2, unit: "package",
    gotIt: false,
  } as ShoppingListItemModel);

  // Meat
  shoppingList.push({
    id: generateString(5),
    name: "Köttbullar",
    category: meat,
    quantity: 0.5, unit: "kg",
    gotIt: false,
  } as ShoppingListItemModel);
  shoppingList.push({
    id: generateString(5),
    name: "Kokt skinka",
    category: meat,
    quantity: 2, unit: "package",
    gotIt: false,
  } as ShoppingListItemModel);

  // more
  shoppingList.push({
    id: generateString(5),
    name: "Spaghetti",
    category: pasta,
    quantity: 0.5, unit: "kg",
    gotIt: false,
  } as ShoppingListItemModel);
  shoppingList.push({
    id: generateString(5),
    name: "Peas",
    category: preserved,
    quantity: 2, unit: "package",
    gotIt: false,
  } as ShoppingListItemModel);
  shoppingList.push({
    id: generateString(5),
    name: "Trash bags",
    category: household,
    quantity: 4, unit: "package",
    gotIt: false,
  } as ShoppingListItemModel);


  return shoppingList.sort(() => Math.random() - 0.5);
}