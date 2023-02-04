import axios, { AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";

const baseURL = () => {
    return 'http://192.168.0.2:3333'
}


const api = axios.create({
    baseURL: baseURL()
});

api.interceptors.response.use((response) => response, error => {

    if(error.response && error.response.data) {       
        return Promise.reject(new AppError(error.response.data.message))

    } else {
        return Promise.reject(new AppError('Erro no servidor. Tente mais tarde!'))
    }
});

export { api , baseURL};