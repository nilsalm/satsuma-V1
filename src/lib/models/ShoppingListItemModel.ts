import type { Category } from "./CategoryModel"

export type ShoppingListItemModel = {
  id: string,
  name: string,
  category: Category | undefined,
  addedBy: string | undefined,
  gotIt: boolean,
  quantity: number,
  unit: "piece" | "package" | "kg" | "gramm"
}
