import { getItems } from './api/retailRocket/getItems';
import { goodsbyCategory } from './api/sber/goodsByCategory';
import { parseUrl } from './api/sber/parseUrl';

; (async () => {
    try {
        const collection = await parseUrl('/catalog/shiny-i-diski')
        if (!collection) return console.error('invalid url')
        console.log(collection.collectionId)
        console.log(await goodsbyCategory(collection.collectionId, 20, 0))
    } catch (e) {
        console.error(e)
    }
})()
console.log('hello world of sber 1')