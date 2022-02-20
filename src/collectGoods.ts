import ProgressBar from "progress";
import { Category } from "./api/sber/getSubcategories";
import { goodsbyCategory, Item } from "./api/sber/goodsByCategory";
import { sberApiQueue } from "./api/sber/sberApi";
import { ExportItem } from "./utils/prepareItem";

export async function collectGoods(category: Category, limit: number, step=30, offset=0) {
    const result: Promise<ExportItem[] | null>[] = []
    limit = +limit
    const bar = new ProgressBar(`${category.title} :bar :current/:total`, { total: limit })
    for (let currentOffset = offset; currentOffset <= limit; currentOffset += step) {
        result.push(sberApiQueue.add(async () => {
            const increment = Math.min(step, limit - currentOffset)
            const res = await goodsbyCategory(category.collectionId, increment, currentOffset)
            bar.tick(increment)
            return res
        }))
    }
    return (await Promise.all(result)).map(items => items ?? [])
}