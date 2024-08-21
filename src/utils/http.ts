import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config): any => {
    config.headers["Content-Type"] = "multipart/form-data";
    const token = localStorage.getItem("token");
    // 如果有token，添加到请求头部
    config.headers["Authorization"] = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

declare module "axios" {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
}

interface Data {
  [index: string]: unknown;
  // name:'',
  // age:''
}
interface Http {
  get(url: string, data: Data, config?: AxiosRequestConfig): Promise<any>;
  getFile(url: string, data: Data, config?: AxiosRequestConfig): Promise<any>;
  post(url: string, data: Data, config?: AxiosRequestConfig): Promise<any>;
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
const http: Http = {
  get(url: any, data: any, config: any) {
    return instance.get(url, {
      params: data,
      ...config,
    });
  },
  getFile(url: any, data: any, config: any) {
    const requestConfig = {
      params: data,
      responseType: "blob", // 指定响应类型为blob
      ...config,
    };
    return instance.get(url, requestConfig);
  },
  post(url: any, data: any, config: any) {
    return instance.post(url, data, config);
  },
  put(url: any, data: any, config: any) {
    return instance.put(url, data, config);
  },
  patch(url: any, data: any, config: any) {
    return instance.patch(url, data, config);
  },
  delete(url: any, data: any, config: any) {
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
    // 处理错误响应
    if (error.response) {
      // 请求已发出，服务器也响应了状态码，但状态码不在 2xx 范围内
      const status = error.response.status; // 这里可以获取到HTTP状态码，如400
      const data = error.response.data; // 这里可以获取到服务器返回的数据
      if (data && data.code) {
        // 如果服务器返回了自定义的错误码，可以在这里处理
        ElMessage.error(
          `请求失败，状态码: ${status}, 错误码: ${data.code}, 错误信息: ${data.message}`
        );
      } else {
        // 如果没有自定义错误码，可以只显示HTTP状态码
        ElMessage.error(`请求失败，状态码: ${status}`);
      }
    } else if (error.request) {
      // 请求已发出，但没有收到任何响应
      ElMessage.error("请求已发出，但没有收到响应");
    } else {
      // 发送请求时发生了某些事情，导致请求没有成功发出
      ElMessage.error("请求设置时发生错误");
    }
    return Promise.reject(error);
  }
);
export default http;
