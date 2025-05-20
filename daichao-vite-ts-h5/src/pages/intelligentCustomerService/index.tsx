import { FC, useEffect, useRef, useState } from "react";

import { getQueryParams } from "@/utils/getQueryParams";

// import nativeUtils from "@/utils/nativeUtils";
import { complaintImage } from "@/assets/images";

import { AppConfig } from "@/AppConfig";
import { fetchQuestionList, submitCustomerServiceFeedback } from "@/api";
// import styled from "styled-components";
import { ScoreModal, ScoreResultModal, Toast } from "@/components";
import { QuestionData } from "@/modules/QuestionData";
import type { Answer, Question } from "@/modules/QuestionData";
import { RouterConfig } from "@/router/routerConfig";
import { currentDate as _currentDate, setPageTitle } from "@/utils";

import "./index.less";

interface QuestionProps extends Question {
  currentIndex?: number;
}

interface AnswerDataListProps {
  answerList: QuestionData["answerList"] | null;
  question?: QuestionProps;
  fork?: {
    title_local: string;
  };
  reportResultData: string;
  date: string;
}

const IntelligentCustomerService: FC = () => {
  const [currentDate] = useState<string>(_currentDate());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerDataList, setAnswerDataList] = useState<AnswerDataListProps[]>([]);
  const [questionTypeList, setQuestionTypeList] = useState<QuestionData["answerList"] | null>();
  const [scoreResTitle, setScoreResTitle] = useState("");
  const [inputValue, setInputValue] = useState<string>("");
  const [currentQuestionId, setCurrentQuestionId] = useState<string | number>();
  const [scoreModalVisible, setScoreModalVisible] = useState<boolean>(false);
  const [scoreResModalVisible, setScoreResModalVisible] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageTitle("Customer Service");
    const selectedIndex = parseInt(localStorage.getItem("selectedIndex") ?? "0");
    setCurrentIndex(selectedIndex);
    fetchData(0);
  }, []);

  useEffect(() => {
    scrollToBottom();
  });

  const fetchData = async (index?: number | string) => {
    Toast.showLoading("loading...");

    const params = getQueryParams();
    const orderNo = localStorage.getItem("orderNo") || params.orderNo;
    try {
      const res = await fetchQuestionList(index, orderNo);
      Toast.clear();
      const data = QuestionData.parseJson(res.data);
      if (index === 0) {
        handleFetchQuestionTypeList(data);
      } else {
        handleFetchQuestionList(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.fail(error.message);
      } else if (typeof error === "string") {
        Toast.fail(error);
      } else {
        Toast.fail("发生未知错误");
        console.error("捕获到非标准错误:", error);
      }
    }
  };

  const handleFetchQuestionTypeList = (data: QuestionData | null) => {
    setQuestionTypeList(data?.answerList);
    const questionId = data?.answerList?.[currentIndex]?.id ?? "";
    fetchData(questionId);
  };

  const handleFetchQuestionList = (data: QuestionData | null) => {
    const result = {
      answerList: data?.answerList,
      question: {
        ...data?.question,
        currentIndex: currentIndex,
      },
      reportResultData: "",
      date: _currentDate(),
    };
    answerDataList.push(result);
    setAnswerDataList(answerDataList);
  };

  // 收集评分数据上报
  const submitQuestionRecordData = async (
    type: number,
    value: number,
    questionId?: number | string,
  ) => {
    Toast.showLoading("loading...");

    const params = getQueryParams();
    const orderNo = localStorage.getItem("orderNo") || params.orderNo;
    try {
      const res = await submitCustomerServiceFeedback({
        orderNo: orderNo,
        type: type,
        content: value,
        questionId: questionId,
      });
      Toast.clear();
      if (type === 2 || type === 4) {
        const list = answerDataList;
        const result = {
          answerList: [],
          question: {
            title: "",
          },
          reportResultData: res.data == undefined ? "" : res.data,
          date: _currentDate(),
        };

        list.push(result);
        setAnswerDataList(list);
      }
      if (type === 3) {
        if (value < 4) {
          setScoreResTitle(res.data);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Toast.fail(error.message);
      } else if (typeof error === "string") {
        Toast.fail(error);
      } else {
        Toast.fail("发生未知错误");
        console.error("捕获到非标准错误:", error);
      }
    }
  };

  // 提交评分
  const handleScoreSubmit = (clickIndex: number) => {
    if (clickIndex == 0) {
      Toast.show("Please select");
      return;
    }
    setScoreModalVisible(false);
    setScoreResModalVisible(clickIndex < 4);
    setScoreResTitle("");
    submitQuestionRecordData(3, clickIndex, currentQuestionId);
  };

  const handleSelectDetailType = (item: Answer, index: number) => {
    console.log("handleSelectDetailType", item, index);
    if (item.action_type == 4) {
      jumpToCustomerService(item);
    } else {
      fetchData(item.id);
    }
  };

  const handleSelectType = (item: Answer, index: number) => {
    console.log(item);
    setCurrentIndex(index);
    fetchData(item.id);
  };

  const handleResolvedClick = (item: AnswerDataListProps, index: number) => {
    console.log("handleResolvedClick", item);
    if (item.answerList) {
      item.answerList[0].zanClick = true;
      item.answerList[0].zanNoClick = false;
    }
    const data = answerDataList;
    data[index] = item;

    setAnswerDataList(data);
    setScoreModalVisible(true);
    setCurrentQuestionId(item.question?.id);

    submitQuestionRecordData(2, 1, item.question?.id);
  };

  const handleNotResolvedClick = (item: AnswerDataListProps, index: number) => {
    console.log("handleNotResolvedClick", item);
    if (item.answerList) {
      item.answerList[0].zanClick = false;
      item.answerList[0].zanNoClick = true;
    }
    const data = answerDataList;
    data[index] = item;

    setAnswerDataList(data);
    setCurrentQuestionId(item.question?.id);

    submitQuestionRecordData(2, 2, item.question?.id);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleCommentChange", e.target.value);
    setInputValue(e.target.value);
  };

  const handleSendButtonClick = () => {
    if (inputValue.length > 0) {
      const list = answerDataList;
      const result = {
        answerList: [],
        fork: {
          title_local: inputValue,
        },
        reportResultData: "",
        date: _currentDate(),
      };
      list.push(result);
      submitQuestionRecordData(4, Number(inputValue));
      setInputValue("");
      setAnswerDataList(list);
    }
  };

  const jumpToCustomerService = (item) => {
    const params = getQueryParams();
    submitQuestionRecordData(1, 1, item.id);
    localStorage.setItem("problemIndex", String(currentIndex));
    window.location.href = `#${RouterConfig.COMPLAINT_FORM}?problemIndex=${currentIndex}&orderNo=${params.orderNo}`;
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const scrollHeight = messagesEndRef.current.scrollHeight; //里面div的实际高度  2000px
      const clientHeight = messagesEndRef.current.clientHeight; //网页可见高度  200px
      const maxScrollTop = scrollHeight - clientHeight;
      messagesEndRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      //如果实际高度大于可见高度，说明是有滚动条的，则直接把网页被卷去的高度设置为两个div的高度差，实际效果就是滚动到底部了。
    }
  };

  return (
    <div className='intelligentService'>
      <div className='topComponment' ref={messagesEndRef}>
        <div>
          <p className='timeRecode left'>{currentDate}</p>
          <div className='answerBg'>
            <p className='answerData'>
              Hello! I am the Sacred chatbot service, how may I assist you?
            </p>
          </div>
        </div>
        {answerDataList.map((item: AnswerDataListProps, index) => {
          return (
            <div key={index}>
              <div
                className='answerBg'
                style={{
                  display: item.answerList && item?.answerList?.length > 1 ? "block" : "none",
                }}
              >
                <ul>
                  <li className='questionIcon'>
                    <img
                      src={complaintImage.COMICON_1}
                      style={{ display: item.question?.currentIndex == 0 ? "block" : "none" }}
                      alt=''
                    />
                    <img
                      src={complaintImage.COMICON_2}
                      style={{ display: item.question?.currentIndex == 1 ? "block" : "none" }}
                      alt=''
                    />
                    <img
                      src={complaintImage.COMICON_3}
                      style={{ display: item.question?.currentIndex == 2 ? "block" : "none" }}
                      alt=''
                    />
                    <img
                      src={complaintImage.COMICON_4}
                      style={{ display: item.question?.currentIndex == 3 ? "block" : "none" }}
                      alt=''
                    />
                    <p className='questionTitle' style={{ color: AppConfig.bgFontColor }}>
                      {item.question?.title}
                    </p>
                  </li>

                  {item?.answerList?.map((item: Answer, key) => {
                    return (
                      <li
                        key={key}
                        className='questionItem'
                        onClick={() => handleSelectDetailType(item, key)}
                      >
                        <p>{item.title}</p>
                        <img src={complaintImage.MORE} alt='' />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div style={{ display: item.answerList?.length === 1 ? "block" : "none" }}>
                <div>
                  <p className='timeRecode right'>{item.date}</p>
                  <div className='questeionBg'>
                    <p>{item?.question?.title}</p>
                  </div>
                </div>
                {item.answerList?.map((nItem, key) => {
                  return (
                    <div key={key}>
                      <p className='timeRecode left'>{item.date}</p>
                      <div className='answerBg'>
                        <div className='answerData'>{nItem.title_local}</div>
                        <div className='feedbackZan'>
                          <div
                            className='zan_sure'
                            onClick={() => handleResolvedClick(item, index)}
                          >
                            <p style={{ color: nItem?.zanClick ? "#0167F2" : "#444444" }}>
                              Resolved
                            </p>
                            <img
                              src={
                                nItem.zanClick
                                  ? complaintImage.ZAN_SURE_SELECTED
                                  : complaintImage.ZAN_SURE
                              }
                              alt=''
                            />
                          </div>
                          <div
                            className='zan_no'
                            onClick={() => handleNotResolvedClick(item, index)}
                          >
                            <p style={{ color: nItem.zanNoClick ? "#0167F2" : "#444444" }}>
                              Not yet resolved
                            </p>
                            <img
                              src={
                                nItem.zanNoClick
                                  ? complaintImage.ZAN_NO_SELECTED
                                  : complaintImage.ZAN_NO
                              }
                              alt=''
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display:
                    item.answerList?.length === 0 && item.question?.title && item.question?.title.length > 0
                      ? "block"
                      : "none",
                }}
              >
                <p className='timeRecode right'>{item.date}</p>
                <div className='questeionBg'>
                  <p>{item.question?.title}</p>
                </div>
              </div>
              <div
                className='answerBg'
                style={{ display: item.reportResultData.length > 0 ? "block" : "none" }}
              >
                <div className='answerData'>{item.reportResultData}</div>
                <div
                  className='satrBtn'
                  onClick={() => jumpToCustomerService(item)}
                  style={{ background: AppConfig.background }}
                >
                  Please contact Customer Service
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className='intelligentBottom'>
        <QuestionTypeList
          list={questionTypeList}
          currentIndex={currentIndex}
          onSelect={(item, index) => handleSelectType(item, index)}
        />

        <div className='inputCompment'>
          <div className='inputBg'>
            <input
              type='text'
              placeholder='Please elaborate on the problem in detail'
              className='data-input'
              value={inputValue}
              onChange={(e) => handleCommentChange(e)}
            />
            <div
              className='sendBtn'
              onClick={() => handleSendButtonClick()}
              style={{ background: AppConfig.background }}
            >
              Sent
            </div>
          </div>
        </div>
      </section>

      {/* 评分功能弹窗               */}
      <ScoreModal
        visible={scoreModalVisible}
        onClose={() => setScoreModalVisible(false)}
        onSubmit={(index: number) => handleScoreSubmit(index)}
      />

      {/*  评分结果弹窗 */}
      <ScoreResultModal
        visible={scoreResModalVisible}
        onClose={() => setScoreResModalVisible(false)}
      >
        {scoreResTitle}
      </ScoreResultModal>
    </div>
  );
};

interface QuestionTypeListProps {
  list: QuestionData["answerList"] | null;
  currentIndex: number;
  onSelect: (item: Question, index: number) => void;
}

const QuestionTypeList: FC<QuestionTypeListProps> = ({ list, currentIndex, onSelect }) => {
  return (
    <div className='complainTypeList'>
      <ul>
        {list?.map((item: Answer, index: number) => {
          const isBold = index == currentIndex;
          return (
            <li
              key={index}
              onClick={() => onSelect(item, index)}
              className={isBold ? "borderLine" : "none"}
              style={{
                color: AppConfig.bgFontColor,
                borderColor: isBold ? AppConfig.bgFontColor : "none",
              }}
            >
              <img
                src={complaintImage.COMICON_1}
                style={{ display: index == 0 ? "block" : "none" }}
                alt=''
              />
              <img
                src={complaintImage.COMICON_2}
                style={{ display: index == 1 ? "block" : "none" }}
                alt=''
              />
              <img
                src={complaintImage.COMICON_3}
                style={{ display: index == 2 ? "block" : "none" }}
                alt=''
              />
              <img
                src={complaintImage.COMICON_4}
                style={{ display: index == 3 ? "block" : "none" }}
                alt=''
              />
              <p>{item.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { IntelligentCustomerService };
