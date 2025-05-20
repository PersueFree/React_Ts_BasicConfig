interface FeedbackItem {
  ["hates"]: string; // 用户反馈文字描述
  ["defer"]: string[]; // 用户反馈图片
  ["odious"]: string; // 客服反馈文字描述
  ["unison"]: string[]; // 客服反馈图片
}

interface QuestionDetailsDataType {
  ["voluntary"]: number; // 状态
  ["shoe"]: string; // 问题类型
  ["deceitful"]: string; // 问题子类型
  ["hates"]: string; // 问题内容
  ["defer"]: string[]; // 图片列表
  ["grantley"]: 0 | 1; // 是否解决
  ["harp"]: number; // 评价分数
  ["writes"]: 0 | 1; // 是否需要补充信息
  ["pens"]: 0 | 1; // 补充信息是否过期
  ["odious"]: string; // 处理详情
  ["unison"]: string[]; // 处理图片
  ["unconcern"]: FeedbackItem[]; // 补充反馈列表
}

interface FeedbackItem {
  id?: string;
  content?: string;
  time?: string;
}

interface QuestionDetailsDataProps {
  status?: string | number;
  type?: string | number;
  sonType?: string | number;
  content?: string;
  images?: string[];
  isSolve?: 0 | 1;
  shouldReFeedback?: 0 | 1;
  isFeedbackExpired?: 0 | 1;
  appraiseScore?: number;
  disposeDetail?: string;
  disposeImages?: string[];
  feedbackList?: FeedbackItem[];
}

class QuestionDetailsData {
  status?: string | number;
  type?: string | number;
  sonType?: string | number;
  content?: string;
  images?: string[];
  isSolve?: 0 | 1;
  shouldReFeedback?: 0 | 1;
  isFeedbackExpired?: 0 | 1;
  appraiseScore?: number;
  disposeDetail?: string;
  disposeImages?: string[];
  feedbackList?: FeedbackItem[];

  constructor({
    status,
    type,
    sonType,
    content,
    images,
    isSolve,
    shouldReFeedback,
    isFeedbackExpired,
    appraiseScore,
    disposeDetail,
    disposeImages,
    feedbackList,
  }: QuestionDetailsDataProps = {}) {
    this.status = status;
    this.type = type;
    this.sonType = sonType;
    this.content = content;
    this.images = images;
    this.isSolve = isSolve;
    this.shouldReFeedback = shouldReFeedback;
    this.isFeedbackExpired = isFeedbackExpired;
    this.appraiseScore = appraiseScore;
    this.disposeDetail = disposeDetail;
    this.disposeImages = disposeImages;
    this.feedbackList = feedbackList;
  }

  static parseJson(data?: QuestionDetailsDataType): QuestionDetailsData | null {
    if (!data) return null;

    return new QuestionDetailsData({
      status: data["voluntary"],
      type: data["shoe"],
      sonType: data["deceitful"],
      content: data["hates"],
      images: data["defer"],
      isSolve: data["grantley"],
      shouldReFeedback: data["writes"],
      isFeedbackExpired: data["pens"],
      appraiseScore: data["harp"],
      disposeDetail: data["odious"],
      disposeImages: data["unison"],
      feedbackList: data["unconcern"],
    });
  }
}

export { QuestionDetailsData };
