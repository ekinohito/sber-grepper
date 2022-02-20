import { Item } from "../api/sber/goodsByCategory";

export function prepareItem(item: Item) {
    const { price, rating, goods } = item
    const { goodsId, categoryId, title, webUrl, attributes } = goods
    return {
        goodsId,
        categoryId,
        title,
        webUrl,
        price,
        rating,
        ...Object.fromEntries(attributes.map(v => [v.title, v.value]))
    }
}