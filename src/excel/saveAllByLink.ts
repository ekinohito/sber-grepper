import { getSubcategories } from "../api/sber/getSubcategories"
import { parseUrl } from "../api/sber/parseUrl"
import { saveCategory } from "./saveCategory"

export async function saveAllByLink(link: string) {
    const collection = await parseUrl(link)
    if (collection == null) return console.log('something went wrong')
    const categories = await getSubcategories(collection)
    const total = categories.map(category => +(category.total)).reduce((a, v) => a + v)
    console.log(`** #${collection.collectionId} ${collection.title}: ${total} товаров из ${categories.length} подкатегорий **`)
    for (const category of categories) {
        await saveCategory(category, collection.title)
    }
}