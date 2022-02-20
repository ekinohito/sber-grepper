import { getSubcategories } from './api/sber/getSubcategories';
import { parseUrl } from './api/sber/parseUrl';
import { sberApiQueue } from './api/sber/sberApi';
import { collectGoods } from './collectGoods';
import { saveCategory } from './json/saveCategory';
import { prepareItem } from './utils/prepareItem';

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