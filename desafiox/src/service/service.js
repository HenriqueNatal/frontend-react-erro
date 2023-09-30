import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:3400'
});

//isso será utilizado em todas as requisições
service.interceptors.request.use(
    config => {
        config.headers.Authorization = localStorage.getItem("token")
        return config;
    }
);

export default service;