import { saveAllByLink } from './excel/saveAllByLink';

(async () => {
    try {
        const link = process.argv[2]
        if (!link) return console.error('no link provided')
        console.log('scrap started')
        saveAllByLink(link)
    } catch (e) {
        console.error(e)
    }
})()