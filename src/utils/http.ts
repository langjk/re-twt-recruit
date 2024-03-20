import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
const instance = axios.create({
baseURL: import.meta.env.VITE_API_URL,
timeout: 5000,
});

instance.interceptors.request.use(
(config): any => { 
    config.headers['Content-Type'] = 'multipart/form-data';  
    const token = localStorage.getItem('token');  
    // 如果有token，添加到请求头部  
    config.headers['Authorization'] = `${token}`;  
    return config;  
},
(error) => {
    return Promise.reject(error);
}
);

declare module 'axios' {
    interface AxiosInstance{
        (config:AxiosRequestConfig):Promise<any>
    }
}

interface Data {
[index: string]: unknown;
// name:'',
// age:''
}
interface Http {
get(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
): Promise<any>;
post(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
): Promise<any>;
put(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
): Promise<AxiosResponse>;
patch(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
): Promise<AxiosResponse>;
delete(
    url: string,
    data: Data,
    config?: AxiosRequestConfig
): Promise<AxiosResponse>;
}
const http: any = {
get(url:any, data:any, config:any) {
    return instance.get(url, {
    params: data,
    ...config,
    });
},
getFile(url:any, data:any, config:any) {
    const requestConfig = {  
        params: data,  
        responseType: 'blob', // 指定响应类型为blob  
        ...config,  
    };  
    return instance.get(url, requestConfig)
},
post(url:any, data:any, config:any) {
    return instance.post(url, data, config);
},
put(url:any, data:any, config:any) {
    return instance.put(url, data, config);
},
patch(url:any, data:any, config:any) {
    return instance.patch(url, data, config);
},
delete(url:any, data:any, config:any) {
    return instance.delete(url, {
    data,
    ...config,
    });
},
};

instance.interceptors.response.use(
    (response): any => {
    const res = response.data;
    return res;
    },
    (error) => {
    console.log("err" + error);

    return Promise.reject(error);
    }
);
export  default  http;

