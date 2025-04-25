import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// import { getQueryParams } from '@/utils/getQueryParams';
import { AppConfig } from "@/AppConfig";
import { ApiResponse } from "@/modules/ApiResponse";

// const params = getQueryParams();

const apiClient: AxiosInstance = axios.create({
  timeout: 60000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  } as AxiosRequestConfig["headers"],
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const newParams = { ...config.params };
    const forwordPreifx = AppConfig.forwardPrefix;
    const url = config.url?.split("?")[0] || "";

    return {
      ...config,
      params: { ...newParams },
      url: `${forwordPreifx}${url}`,
    };
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    const res = new ApiResponse(response.data);
    if (res.isSuccess) {
      response.data = res;
      return response.data;
    } else {
      return Promise.reject(new Error(res.message)) as never;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default apiClient;
