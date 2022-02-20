import { getSubcategories } from './api/sber/getSubcategories';
import { parseUrl } from './api/sber/parseUrl';
import { collectGoods } from './collectGoods';
import { prepareItem } from './utils/prepareItem';

(async () => {
    try {
        const collection = await parseUrl('/catalog/shiny-i-diski')
        if (collection == null) return console.log('something went wrong')
        //const res = await collectGoods(collection.collectionId, 200)
        //console.log(res.flat().map(prepareItem))
        console.log(await getSubcategories(collection))
    } catch (e) {
        console.error(e)
    }
})()
console.log('scrap started')