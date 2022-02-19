import axios from "axios";

const sberPartnerId = '59f319fbc7d011dbaceaa05e'

export const retailRocketApi = axios.create({
    baseURL: `https://api.retailrocket.net/api/2.0/recommendation/popular/${sberPartnerId}`,
})