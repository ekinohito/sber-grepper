import { resolve } from "path/posix";
import { goodsbyCategory } from "./api/sber/goodsByCategory";

export async function collectGoods(collectionId: string, limit: number, cooldown=200, step=30, offset=0) {
    const result = []
    const timer = await new Promise<NodeJS.Timer>((resolve) => {
        const timer: NodeJS.Timer = setInterval(async () => {
            const currentOffset = offset
            if (currentOffset > limit) return resolve(timer)
            offset += limit
            const items = await goodsbyCategory(collectionId, limit, currentOffset)
            result.push(...items)
        }, cooldown)
    })
    clearInterval(timer)
}