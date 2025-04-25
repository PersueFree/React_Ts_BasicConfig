export const ApiConstants = {
  /// 验证码登陆/注册
  LOGIN: "/dafreque/ortdep",

  /// 点击申请 / 准入接口
  SUBMIT_APPLY: "/dafreque/anaban",

  /// 确认用款页详情
  CONFIRM_OF_LOAN: "/dafreque/ionvers",

  /// 确认用款
  SUBMIT_CONFIRM_OF_LOAN: "/dafreque/ionmutat",

  /// 订单详情页
  ORDER_DETAILS: "/dafreque/rchma",

  /// 展期详情页
  REPAYMENT_OF_DELAY: "/dafreque/diora",

  /// 获取还款方式
  REPAYMENT_METHODS: "/dafreque/undref",

  /// google评分
  SUBMIT_GOOGLE_RATING: "/dafreque/eamcr",

  /// 联登失败页
  JOIN_LOGON_FAIL: "/dafreque/larsecu",

  /// 获取还款计划信息
  REPAYMENT_OF_PERIOD: "/dafreque/elyunlik",

  /// 获取还款code码
  REPAYMENT_CODE: "/dafreque/eummus",

  /// 还款二维码点击保存记录
  SUBMIT_QRCODE_SAVED_RECORD: "/dafreque/nceaccepta",

  /// 推荐列表
  RECOMMENDATION_LIST: "/dafreque/nchbra",

  // 借款协议
  LOAN_PROTOCOL: "/dafreque/aseincre",

  /// 客服参数初始化
  CUSTOMER_SERVICE_PARAMS: "/dafreque/ioncalculat",

  /// 客服图片提交
  SUBMIT_CUSTOMER_SERVICE_IMAGE: "/dafreque/earcl",

  /// 客服问题提交
  SUBMIT_CUSTOMER_SERVICE_QUESTION: "/dafreque/ioncontradict",

  /// 用户补充信息
  SUBMIT_QUESTION_ADDITIONAL_INFO: "/dafreque/uredepart",

  /// 用户结束补充反馈
  SUBMIT_END_QUESTION_FEEDBACK: "/dafreque/ionpercept",

  /// 客服提交列表
  COMPLAINT_LIST: "/dafreque/ustadj",

  /// 客服问题详情页
  COMPLAINT_DETAILS: "/dafreque/tchscra",

  /// 获取问题列表
  QUESTION_LIST: "/dafreque/werans",

  /// 问题是否解决
  SUBMIT_QUESTION_RESOLVED_STATUS: "/dafreque/ionadministrat",

  /// 评价
  SUBMIT_RATING: "/dafreque/methel",

  /// 收集智能客服点击、评价、打分、评论
  SUBMIT_CUSTOMER_SERVICE_FEEDBACK: "/dafreque/ioninvestigat",
} as const;
