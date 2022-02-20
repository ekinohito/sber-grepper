import { saveAllByLink } from './excel/saveAllByLink';

(async () => {
    try {
        saveAllByLink('https://sbermegamarket.ru/catalog/organajzery-setki-nakidki/')
    } catch (e) {
        console.error(e)
    }
})()
console.log('scrap started')