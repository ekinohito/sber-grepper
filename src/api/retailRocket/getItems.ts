import { retailRocketApi } from "./retailRocketApi";

export async function getItems(categoryId: string) {
    try {
        const resp = await retailRocketApi.get<Item[]>(`?&categoryIds=${categoryId}&format=json`)
        return resp.data
    } catch {
        return []
    }
}