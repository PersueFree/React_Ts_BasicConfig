import qs from "query-string";

import { getQueryParams } from "@/utils/getQueryParams";

import { randomStr } from "@/utils";

import { apiClient } from "./apiClient";
import { ApiConstants } from "./apiConstants";

/// 点击申请 / 准入接口
export const fetchProductAccessData = async (
  productId: string | number | undefined,
  scene: string | number,
) => {
  const urlParams = getQueryParams();
  scene = scene || (urlParams["ousconsci"] == "cgl_not_re_loan" ? 6 : 7);
  productId = productId || urlParams["eamcr"] || urlParams["lsefa"];

  const params = {
    "conditional": "1001",
    "doubted": "1000",
    "bequest": "1000",
    // 产品id
    "distressing": productId,
    // apiremind字段, 默认不传或0, 1:首页banner,2:首页弹窗,3:push 4:订单详情页审核成功后彩蛋产品,5:订单详情页审核失败后推荐产品',6:复贷推荐页面,7:api推荐页面,8:再来一单
    "informality": scene,
    "redress": randomStr(),
    "disregarded": randomStr(),
  };
  const response = await apiClient.post(ApiConstants.SUBMIT_APPLY, qs.stringify(params));
  return response;
};

/// 订单详情页
export const fetchOrderDetails = async () => {
  const urlParams = getQueryParams();
  const params = {
    // 产品id
    "watchfulness": urlParams["watchfulness"],
    // 订单id
    "imposing": urlParams["imposing"],
    // 混淆字段
    "studious": randomStr(),
    //
    debug: 1,
  };
  const response = await apiClient.get(ApiConstants.ORDER_DETAILS, { params });
  return response;
};

/// google评分
export const submitGoogleRating = async (score: number) => {
  const params = {
    // 分数 1-5
    "shrubbery": score,
    // 混淆字段
    "friday": randomStr(),
  };
  const response = await apiClient.post(ApiConstants.SUBMIT_GOOGLE_RATING, qs.stringify(params));
  return response;
};

/// 联登失败页
export const fetchAccessFailsData = async () => {
  const urlParams = getQueryParams();
  const params = {
    // 产品id
    "distressing": urlParams["watchfulness"],
    // 订单id
    "alliance": urlParams["alliance"] ?? "",
    // 混淆字段
    "disgracing": randomStr(),
    // 混淆字段
    "implacability": randomStr(),
    // 混淆字段
    "redress": randomStr(),
  };
  const response = await apiClient.post(ApiConstants.JOIN_LOGON_FAIL, qs.stringify(params));
  return response;
};

/// 获取还款计划信息
export const fetchSingleRepayDetails = async () => {
  const urlParams = getQueryParams();
  const params = {
    // 产品id
    "watchfulness": urlParams["watchfulness"],
    // 订单id
    "imposing": urlParams["imposing"],
    // 混淆字段
    "premeditated": randomStr(),
  };
  const response = await apiClient.post(ApiConstants.REPAYMENT_OF_PERIOD, qs.stringify(params));
  return response;
};

/// 展期详情页
export const fetchExtendedRepayDetails = async () => {
  const urlParams = getQueryParams();
  const params = {
    // 产品id
    "watchfulness": urlParams["watchfulness"],
    // 订单id
    "imposing": urlParams["imposing"],
  };
  const response = await apiClient.get(ApiConstants.REPAYMENT_OF_DELAY, { params });
  return response;
};

/// 获取还款方式
export const fetchRepaymentMethods = async () => {
  const urlParams = getQueryParams();
  const params = {
    // 产品id
    "watchfulness": urlParams["watchfulness"],
    // 订单id
    "imposing": urlParams["imposing"],
  };
  const response = await apiClient.post(ApiConstants.REPAYMENT_METHODS, qs.stringify(params));
  return response;
};

/// 获取还款code码
export const fetchRepaymentCode = async () => {
  const urlParams = getQueryParams();

  const params = {
    // 订单id
    "imposing": urlParams["imposing"],
    // 金额
    "contradict": urlParams["contradict"] ?? urlParams?.amount ?? "",
    // 是否展期 1是 0否
    "quest": urlParams["display"] == "1" ? 1 : 0,
    // 申请code代码 channel_code
    "resented": localStorage.getItem("typecode"),
    // 混淆字段
    "warmly": randomStr(),
  };
  const response = await apiClient.post(ApiConstants.REPAYMENT_CODE, qs.stringify(params));
  return response;
};

/// 还款二维码点击保存记录
export const saveQrcodeRecord = async (qrcode?: string) => {
  const urlParams = getQueryParams();
  const params = {
    // 订单id
    "imposing": urlParams["imposing"],
    // 二维码
    "allowing": qrcode,
    // 混淆字段
    "adhering": randomStr(),
  };
  const response = await apiClient.post(
    ApiConstants.SUBMIT_QRCODE_SAVED_RECORD,
    qs.stringify(params),
  );
  return response;
};

/// 推荐列表
export async function fetchRecommendationList() {
  const urlParams = getQueryParams();
  const params = {
    // 场景页面 cgl_not_re_loan->复贷客群,cgl_api_not_loan-> api上新弹窗客群
    "insignificance": urlParams["insignificance"],
  };
  const response = await apiClient.post(ApiConstants.RECOMMENDATION_LIST, qs.stringify(params));
  return response;
}

/// 借款协议
export const fetchBorrowMoney = async () => {
  const urlParams = getQueryParams();
  const params = {
    "rising": urlParams["rising"],
    "conscientiously": urlParams["conscientiously"],
  };
  const response = await apiClient.get(ApiConstants.LOAN_PROTOCOL, { params });
  return response;
};

/// 客服参数初始化
export const fetchCustomerServiceParams = async (orderNo) => {
  const urlParams = getQueryParams();
  orderNo = orderNo || urlParams["tempered"];

  const params = {
    // 订单号
    "tempered": orderNo,
    // 混淆字段
    "imperfection": randomStr(),
  };
  const response = await apiClient.post(ApiConstants.CUSTOMER_SERVICE_PARAMS, qs.stringify(params));
  return response;
};

/// 客服图片提交
export async function submitCustomerServiceImage(file: File) {
  const formData = new FormData();
  // 资源文件
  formData.append("occupied", file);
  // 混淆字段
  formData.append("craned", randomStr());
  // 混淆字段
  formData.append("dejectedly", randomStr());

  const response = await apiClient.post(ApiConstants.SUBMIT_CUSTOMER_SERVICE_IMAGE, formData);
  return response;
}

/// 客服问题提交
export async function submitCustomerServiceQuestion({
  questionType,
  sonQuestion,
  questionDesc,
  imageUrl,
  orderNo,
}) {
  const params = {
    //	问题类型
    "execution": questionType,
    // 问题小类
    "deceitful": sonQuestion,
    // 问题描述
    "reproof": questionDesc,
    // 图片地址
    "disarm": imageUrl,
    // 订单号
    "tempered": orderNo,
    // 混淆字段
    "correspondents": randomStr(),
  };

  const response = await apiClient.post(
    ApiConstants.SUBMIT_CUSTOMER_SERVICE_QUESTION,
    qs.stringify(params),
  );
  return response;
}

/// 用户补充信息
export async function submitQuestionAdditionalInfo({ questionId, content, imageUrls }) {
  const params = {
    // 客服问题id
    "convey": questionId,
    // 问题描述
    "reproof": content,
    // 图片地址
    "disarm": imageUrls,
  };

  const response = await apiClient.post(
    ApiConstants.SUBMIT_QUESTION_ADDITIONAL_INFO,
    qs.stringify(params),
  );
  return response;
}

/// 用户结束补充反馈
export async function submitEndQuestionFeedback(questionId) {
  const params = {
    // 客服问题id
    "convey": questionId,
    // 混淆字段
    "endurable": randomStr(),
  };

  const response = await apiClient.post(
    ApiConstants.SUBMIT_END_QUESTION_FEEDBACK,
    qs.stringify(params),
  );
  return response;
}

/// 客服提交列表
export const fetchCustomerServiceSubmissionList = async () => {
  const params = {
    // 混淆字段
    "scandalous": randomStr(),
    // 混淆字段
    "endurable": randomStr(),
  };

  const response = await apiClient.post(ApiConstants.COMPLAINT_LIST, qs.stringify(params));
  return response;
};

/// 客服问题详情页
export const fetchCustomerServiceQuestionDetails = async (questionId) => {
  const params = {
    /// 客服问题id
    "convey": questionId,
    // 混淆字段
    "syllables": randomStr(),
  };
  const response = await apiClient.post(ApiConstants.COMPLAINT_DETAILS, qs.stringify(params));

  return response;
};

/// 获取问题列表
export const fetchQuestionList = async (
  questionId?: string | number,
  orderNo?: string | null,
  actionType?: string | number,
) => {
  const params = {
    "evenness": actionType,
    "commendations": questionId,
    "tempered": orderNo,
    // 混淆字段
    "excess": randomStr(),
  };

  const response = await apiClient.get(ApiConstants.QUESTION_LIST, {
    params,
  });

  return response;
};

/// 问题是否解决
export const submitQuestionResolvedStatus = async ({ questionId, resolved }) => {
  const params = {
    // 问题id
    "convey": questionId,
    // 是否解决 1:已解决 2:未解决
    "piquet": resolved ? 1 : 2,
    // 混淆字段
    "cluster": randomStr(),
    // 混淆字段
    "messages": randomStr(),
  };

  const response = await apiClient.post(
    ApiConstants.SUBMIT_QUESTION_RESOLVED_STATUS,
    qs.stringify(params),
  );
  return response;
};

/// 评价
export const submitRating = async ({ questionId, score }) => {
  const params = {
    // 问题id
    "convey": questionId,
    // 分数
    "shrubbery": score,
    // 混淆字段
    "veneration": randomStr(),
    // 混淆字段
    "recollections": randomStr(),
  };

  const response = await apiClient.post(ApiConstants.SUBMIT_RATING, qs.stringify(params));
  return response;
};

interface FeedbackParams {
  orderNo?: string;
  type?: string | number;
  content?: number | string;
  questionId?: string | number;
}
/// 收集智能客服点击、评价、打分、评论
export const submitCustomerServiceFeedback = async ({
  orderNo,
  type,
  content,
  questionId,
}: FeedbackParams) => {
  const params = {
    // 订单id
    "tempered": orderNo,
    // 类型
    "shoe": type,
    // 内容
    "impartial": content,
    // 问题id
    "seated": questionId,
    // 混淆字段
    "mend": randomStr(),
  };

  const response = await apiClient.post(
    ApiConstants.SUBMIT_CUSTOMER_SERVICE_FEEDBACK,
    qs.stringify(params),
  );
  return response;
};
