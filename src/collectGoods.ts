import { goodsbyCategory, Item } from "./api/sber/goodsByCategory";
import { sberApiQueue } from "./api/sber/sberApi";
import { ExportItem } from "./utils/prepareItem";

export async function collectGoods(collectionId: string, limit: number, step=30, offset=0) {
    const result: Promise<ExportItem[]>[] = []
    for (let currentOffset = offset; currentOffset <= limit; currentOffset += step) {
        result.push(sberApiQueue.add(async () => {
            console.log('retreiving items', {collectionId, currentOffset, step})
            return await goodsbyCategory(collectionId, Math.min(step, limit - currentOffset), currentOffset)
        }))
    }
    return Promise.all(result)
}