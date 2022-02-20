import axios from "axios";
import { Queue } from "../../utils/queue";

export const sberApi = axios.create({
    baseURL: `https://sbermegamarket.ru/api/mobile/v1/`,
})

export const sberApiQueue = new Queue(100)