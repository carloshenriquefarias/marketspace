import axios, { AxiosInstance } from "axios";
import { AppError } from "@utils/AppError";

const api = axios.create({
    baseURL: 'http://192.168.1.4:3333'
//   baseURL: 'http://localhost:3333',
});

api.interceptors.response.use((response) => response, error => {

    if(error.response && error.response.data) {       
        return Promise.reject(new AppError(error.response.data.message))

    } else {
        return Promise.reject(new AppError('Erro no servidor. Tente mais tarde!'))
    }
});

export { api };