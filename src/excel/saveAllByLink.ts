import { getSubcategories } from "../api/sber/getSubcategories"
import { parseUrl } from "../api/sber/parseUrl"
import { FULL_INFO, PROBABILITY, SBER_CD } from "../config"
import { saveCategory } from "./saveCategory"

export async function saveAllByLink(link: string) {
    const collection = await parseUrl(link)
    if (collection == null) return console.log('something went wrong')
    const categories = await getSubcategories(collection)
    const total = categories.map(category => +(category.total)).reduce((a, v) => a + v)
    console.log(`** #${collection.collectionId} ${collection.title}: ${total} товаров из ${categories.length} подкатегорий **`)
    const totalTime = ((FULL_INFO ? 1.025 : 0.025) * total * SBER_CD / 1000 * PROBABILITY)
    console.log(`* Сбор информации займет примерно ${(totalTime / 3600).toFixed()} часов ${(totalTime % 3600 / 60).toFixed()} минут *`)
    for (const category of categories) {
        await saveCategory(category, collection.title)
    }
}