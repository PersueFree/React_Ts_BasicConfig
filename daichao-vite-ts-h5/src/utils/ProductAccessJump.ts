import qs from "query-string";

import { getQueryParams } from "@/utils/getQueryParams";
import nativeUtils from "@/utils/nativeUtils";

import { AppConfig } from "@/AppConfig";
import { fetchProductAccessData } from "@/api";
import { Toast } from "@/components";
import { ProductAccessData } from "@/modules/ProductAccessData";

// 准入
export const ProductAccessJump = async (
  productId: string | number | undefined,
  scene: number | string,
) => {
  Toast.showLoading("loading...");
  try {
    const res = await fetchProductAccessData({ productId: productId, scene: scene });
    Toast.clear();

    const data = ProductAccessData.parseJson(res.data);
    const jumpUrl = data?.url || "";

    if (jumpUrl === "") {
      const url = `${AppConfig.schemeUrl}${AppConfig.productDetailsPath}?${qs.stringify(getQueryParams())}`;
      nativeUtils.openUrl(url);
      return;
    }

    if (jumpUrl.startsWith("http")) {
      window.location.href = data.url;
    } else {
      nativeUtils.openUrl(data.url);
    }
  } catch (error) {
    if (error instanceof Error) {
      Toast.fail(error.message);
    } else if (typeof error === "string") {
      Toast.fail(error);
    } else {
      Toast.fail("发生未知错误");
    }
  }
};
