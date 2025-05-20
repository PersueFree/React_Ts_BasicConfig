import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "query-string";

import nativeUtils from "@/utils/nativeUtils";

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

const extractExtraKeys = (a, b) =>
  Object.keys(b).reduce((acc, key) => {
    if (!(key in a)) {
      acc[key] = b[key];
    }
    return acc;
  }, {});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const newParams = { ...config.params };
    const forwordPreifx = AppConfig.forwardPrefix;
    const url = config.url?.split("?")[0] || "";

    const publicParams = (await nativeUtils.getPublicParams(url)) || {};
    config.params = { ...newParams, ...publicParams };
    const urlParams = (config.url || "").split("?")[1]; // 获取url中的参数
    const regImgUrl = new RegExp("/quixotic/wants");
    const reqMethod = config.method;
    if (regImgUrl.test((config.url || "").split("?")[0])) {
      config.url = forwordPreifx + config.url;
      return config;
    } else {
      let paramDate;
      switch (reqMethod) {
        case "get":
          paramDate = extractExtraKeys(publicParams, qs.parse(urlParams)); // 获取除去公参外的所有参数
          break;
        case "post":
          paramDate = qs.parse(config.data);
          break;
        default:
          paramDate = qs.parse(config.data);
      }
      const aesDecodeData = await nativeUtils.encryptData(JSON.stringify(paramDate || {}));
      switch (reqMethod) {
        case "get":
          config.data = qs.stringify({ unaffectedly: aesDecodeData });
          break;
        case "post":
          config.data = qs.stringify({ troubling: aesDecodeData });
          break;
        default:
          config.data = qs.stringify({ apology: aesDecodeData });
      }
      config.method = "post";
      config.url = forwordPreifx + config.url;
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

function isJSONString(str: string) {
  try {
    const parsed = JSON.parse(str);
    // 仅当解析结果为对象或数组时视为有效 JSON 格式
    return (typeof parsed === "object" && parsed !== null) || Array.isArray(parsed);
  } catch (e) {
    console.log(e);
    return false;
  }
}

apiClient.interceptors.response.use(
  async (response: AxiosResponse) => {
    const deData = await nativeUtils.decryptData(response.data.griefs || "");
    if (isJSONString(deData)) {
      response.data.griefs = JSON.parse(deData);
    } else {
      response.data.griefs = deData;
    }

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

export { apiClient };
