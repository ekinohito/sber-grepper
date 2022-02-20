import { promises } from "fs";
import path from "path";
import { Category } from "../api/sber/getSubcategories";
import { collectGoods } from "../collectGoods";

export async function saveCategory(category: Category) {
    const items = await collectGoods(category.collectionId, category.total, 40)
    try {
        await promises.mkdir('output')
    } catch {}
    await promises.writeFile(path.join('output', `collection-${category.collectionId}.json`), JSON.stringify(items, undefined, 2), {})
}