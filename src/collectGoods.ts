import { goodsbyCategory, Item } from "./api/sber/goodsByCategory";
import { promises } from "fs";

export async function collectGoods(collectionId: string, limit: number, cooldown=200, step=30, offset=0) {
    const result: Item[][] = []
    let count = 0
    let satisfied = false
    const timer = await new Promise<NodeJS.Timer>((resolve) => {
        const timer: NodeJS.Timer = setInterval(async () => {
            if (offset > limit) return satisfied = true
            count += 1
            const currentOffset = offset
            offset += step
            const items = await goodsbyCategory(collectionId, Math.min(step, limit - currentOffset), currentOffset)
            result.push(items)
            count -= 1
            if (satisfied && count <= 0) resolve(timer)
        }, cooldown)
    })
    clearInterval(timer)
    return result
}