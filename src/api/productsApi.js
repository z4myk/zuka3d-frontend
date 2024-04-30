import axios from 'axios'

const productApi = axios.create({
    baseURL: import.meta.env.VITE_API_DEV
})

productApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'token':localStorage.getItem('token')
    }
    return config;
})


export default productApi;