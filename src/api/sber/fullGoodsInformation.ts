import { INCLUDE_NOT_AVAILABLE } from "../../config"
import { sberApi, sberApiQueue } from "./sberApi"

export interface Attribute {
    title: string,
    value: string,
}

export interface Goods {
    goodsId: string,
    categoryId: string,
    title: string,
    brand: string,
    webUrl: string,
    attributes: Attribute[],
}

interface Breadcrumb {
    collectionId: string,
    name: string,
    slug: string,
}

export interface Item {
    lastPrice: number,
    rating: number,
    goods: Goods,
    breadcrumbsV2: Breadcrumb[]
}

interface SuccessfulResponse {
    success: true,
    item: Item,
}

interface FailedResponse {
    success: false
}

export type ItemsResponse = SuccessfulResponse | FailedResponse

const defaultQuery = {
    requestVersion: 10,
}

interface FullItem {
    goodsId: string
    categoryId: string
    title: string
    webUrl: string
    price: number
    rating: number
    brand: string
    categoriesIds: string
    categoriesTitles: string
    categoriesSlugs: string
}

function prepareItem(item: Item): FullItem {
    const { goods, lastPrice, rating, breadcrumbsV2 } = item
    const { attributes, categoryId, goodsId, title, webUrl, brand } = goods
    const categoriesIds = breadcrumbsV2.map(value => value.collectionId).join(' -> ')
    const categoriesTitles = breadcrumbsV2.map(value => value.name).join(' -> ')
    const categoriesSlugs = breadcrumbsV2.map(value => value.slug).join(' -> ')
    return {
        goodsId,
        categoryId,
        title,
        webUrl,
        price: lastPrice,
        rating,
        brand,
        categoriesIds,
        categoriesTitles,
        categoriesSlugs,
        ...Object.fromEntries(attributes.map(v => [v.title, v.value]))
    }
}

export async function fullGoodsInformation(goodsId: string) {
    const resp = await sberApiQueue.add(async () => {
        console.log(`Подробная информация: ${goodsId}`)
        return await sberApi.post<ItemsResponse>('catalogService/catalog/productCard', {
            ...defaultQuery,
            goodsId,
        })
    })
    return (resp && resp.data.success) ? prepareItem(resp.data.item) : null
}