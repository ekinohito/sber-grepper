import axios from "axios";

export const sberApi = axios.create({
    baseURL: `https://sbermegamarket.ru/api/mobile/v1/`,
})