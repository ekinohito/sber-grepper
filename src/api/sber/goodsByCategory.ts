import { prepareItem } from "../../utils/prepareItem"
import { sberApi } from "./sberApi"

export interface Attribute {
    title: string,
    value: string,
}

export interface Goods {
    goodsId: string,
    categoryId: string,
    title: string,
    webUrl: string,
    attributes: Attribute[],
}

export interface Item {
    price: number,
    rating: number,
    goods: Goods,
}

interface SuccessfulResponse {
    success: true,
    items: Item[],
}

interface FailedResponse {
    success: false
}

export type ItemsResponse = SuccessfulResponse | FailedResponse

const defaultQuery = {
    requestVersion: 8,
    selectedAssumedCollectionId: "",
    isMultiCategorySearch: false,
    searchByOriginalQuery: false,
    selectedSuggestParams: [],
    sorting: 0,
    ageMore18: 2,
    showNotAvailable: true,
}

export async function goodsbyCategory(collectionId: string, limit: number, offset: number) {
    const resp = await sberApi.post<ItemsResponse>('catalogService/catalog/search', {
        ...defaultQuery,
        collectionId,
        limit,
        offset,
    })
    return resp.data.success ? resp.data.items.map(prepareItem) : []
}