interface QuestionItem {
  ["action_type"]?: string | number; // 操作类型
  ["borne"]?: string | number; // 父级ID
  ["commendations"]?: string | number; // 父级ID
  ["impulses"]?: string | number; // 问题ID
  ["level5"]?: string | number; // 层级标识
  ["needlework"]?: string; // 标题别名
  ["pitiable"]?: string | number; // 问题ID
  ["title_cn"]?: string; // 中文标题
  ["title_local"]?: string; // 本地化标题
  ["title_local_alias"]?: string;
  ["sort"]?: string;
  ["created_at"]?: string;
  ["updated_at"]?: string;
}

interface QuestionDataProps {
  ["attending"]: QuestionItem; // 空对象
  ["amused"]: QuestionItem[]; // 问题列表
}

interface Question {
  id?: string | number;
  title?: string;
  title_local?: string;
  title_local_alias?: string;
  pid?: string | number;
  level?: string | number;
  action_type?: string | number;
  level5?: string | number;
}

interface Answer {
  id?: string | number;
  title?: string;
  title_local?: string;
  pid?: string | number;
  action_type?: string | number;
  zanClick?: boolean;
  zanNoClick?: boolean;
}

class QuestionData {
  question?: Question;
  answerList?: Answer[];

  constructor({
    question,
    answerList,
  }: {
    question?: Question;
    answerList?: Answer[];
  } = {}) {
    this.question = question;
    this.answerList = answerList;
  }

  static parseJson(data?: QuestionDataProps): QuestionData | null {
    if (!data) return null;

    return new QuestionData({
      question: QuestionData.processQuestion(data["attending"]),
      answerList: QuestionData.processAnswerList(data["amused"]),
    });
  }

  static processQuestion(item?: QuestionItem): Question | undefined {
    if (!item) return undefined;

    return {
      id: item["pitiable"],
      title: item["title_local"],
      title_local: item["title_local"],
      title_local_alias: item["needlework"],
      pid: item["commendations"],
      level: item["borne"],
      action_type: item["action_type"],
      level5: item["level5"],
    };
  }

  static processAnswerList(data?: QuestionItem[]): Answer[] | undefined {
    return data?.map((item) => ({
      id: item["pitiable"],
      title: item["title_local"],
      title_local: item["title_local"],
      pid: item["commendations"],
      action_type: item["action_type"],
    }));
  }
}

export { QuestionData };
export type { Answer, Question };
