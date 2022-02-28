import { fullGoodsInformation } from "./api/sber/fullGoodsInformation";

(async () => {
    const x = await fullGoodsInformation('100022776412')
    console.log(x)
})()
