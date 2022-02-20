import axios from "axios";
import { SBER_CD } from "../../config";
import { Queue } from "../../utils/Queue";

export const sberApi = axios.create({
    baseURL: `https://sbermegamarket.ru/api/mobile/v1/`,
})

export const sberApiQueue = new Queue(SBER_CD)