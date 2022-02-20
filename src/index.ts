import { getSubcategories } from './api/sber/getSubcategories';
import { parseUrl } from './api/sber/parseUrl';
import { saveCategory } from './excel/saveCategory';

(async () => {
    try {
        const collection = await parseUrl('/catalog/shiny')
        if (collection == null) return console.log('something went wrong')
        //const res = await collectGoods(collection.collectionId, 200)
        //console.log(res.flat().map(prepareItem))
        const r = await getSubcategories(collection)
        saveCategory(r[0])

    } catch (e) {
        console.error(e)
    }
})()
console.log('scrap started')