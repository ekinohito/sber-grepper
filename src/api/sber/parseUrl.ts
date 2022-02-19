import { sberApi } from "./sberApi";


export interface Collection {
    collectionId: string,
    parentId: string,
    title: string,
    url: string,
}


export interface MenuNode {
    id: string,
    collection: Collection
}

interface FailedResponse {
    type: 'TYPE_UNKNOWN',
}

interface CollectionResponse {
    type: 'TYPE_LISTING',
    params: {
        collection: Collection
    }
}

interface MenuNodeResponse {
    type: 'TYPE_MENU_NODE',
    params: {
        menuNode: MenuNode
    }
}

export type ParseUrlResponse = CollectionResponse | MenuNodeResponse | FailedResponse

export async function parseUrl(slug: string) {
    const resp = await sberApi.post<ParseUrlResponse>('urlService/url/parse', {
        url: slug
    })
    switch (resp.data.type) {
        case 'TYPE_LISTING':
            return resp.data.params.collection
        case 'TYPE_MENU_NODE':
            return resp.data.params.menuNode.collection
        default:
            return null
    }
}