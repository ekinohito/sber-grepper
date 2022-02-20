import { Item } from "../api/sber/goodsByCategory";

export interface ExportItem {
    goodsId: string,
    categoryId: string,
    title: string,
    webUrl: string,
    price: number,
    rating: number,
}

export function prepareItem(item: Item): ExportItem {
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