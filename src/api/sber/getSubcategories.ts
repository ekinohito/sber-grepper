import { Collection } from "./parseUrl"
import { sberApi, sberApiQueue } from "./sberApi"

export type Category = Collection & { total: number }

interface SuccessfulResponse {
    success: true,
    total: number,
    categories: Collection[],
}

interface FailedResponse {
    success: false
}

export type SubcategoriesResponse = SuccessfulResponse | FailedResponse

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

export async function getSubcategories(category: Collection): Promise<Category[]> {
    const { collectionId } = category
    const resp = await sberApiQueue.add(async () => {
        console.log(`searching ${collectionId}`)
        return await sberApi.post<SubcategoriesResponse>('catalogService/catalog/search', {
        ...defaultQuery,
        collectionId,
        limit: 1,
        offset: 0,
    }
    )})
    if (!resp.data.success) return []
    const { total } = resp.data
    if (resp.data.categories.length === 0) return [{...category, total}]
    const result = await Promise.all(resp.data.categories.map(category => getSubcategories(category)))
    return result.flat()
}