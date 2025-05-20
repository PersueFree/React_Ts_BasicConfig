import { ImageUploadItem, ImageUploader, Modal } from "antd-mobile";
import { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";

import { getQueryParams } from "@/utils/getQueryParams";

import { complaintImage } from "@/assets/images";

import { AppConfig } from "@/AppConfig";
import {
  fetchCustomerServiceQuestionDetails,
  submitCustomerServiceImage,
  submitEndQuestionFeedback,
  submitQuestionAdditionalInfo,
  submitQuestionResolvedStatus,
  submitRating,
} from "@/api";
// import styled from "styled-components";
import { ScoreModal, ScoreResultModal, Toast } from "@/components";
import { QuestionDetailsData } from "@/modules/QuestionDetailsData";
import UploadData from "@/modules/UploadData";
import { compressImage, setPageTitle } from "@/utils";

import "./ComplaintDetails.less";

const ComplaintDetails = () => {
  // const [status, setStatus] = useState('');
  const [type, setType] = useState<string | number>();
  const [sonType, setSonType] = useState<string | number>();
  const [content, setContent] = useState<string>();
  const [images, setImages] = useState<string[]>();
  // const [isSolve, setIsSolve] = useState(false);
  const [shouldReFeedback, setShouldReFeedback] = useState<0 | 1>();
  const [isFeedbackExpired, setIsFeedbackExpired] = useState<0 | 1>();
  const [appraiseScore, setAppraiseScore] = useState<number>();
  const [disposeDetail, setDisposeDetail] = useState<string>();
  const [disposeImages, setDisposeImages] = useState<string[]>();
  // const [feedbackList, setFeedbackList] = useState([]);
  const [evaluateModalVisible, setEvaluateModalVisible] = useState<boolean>(true);
  const [scoreModalVisible, setScoreModalVisible] = useState<boolean>(false);
  const [scoreResModalVisible, setScoreResModalVisible] = useState<boolean>(false);
  const [complaintText, setComplaintText] = useState<string>();
  const [files, setFiles] = useState<ImageUploadItem[]>([]);
  // const [dialogue, setDialogue] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const additionEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPageTitle("Customer service");
    fetchData();
  }, []);

  const fetchData = async () => {
    Toast.showLoading("loading...");

    const params = getQueryParams();
    try {
      const res = await fetchCustomerServiceQuestionDetails(params.problemId);
      Toast.clear();

      const data = QuestionDetailsData.parseJson(res.data);
      // setStatus(data.status)
      setType(data?.type);
      setSonType(data?.sonType);
      setContent(data?.content);
      setImages(data?.images);
      // setIsSolve(data.isSolve)
      setShouldReFeedback(data?.shouldReFeedback);
      setIsFeedbackExpired(data?.isFeedbackExpired);
      setAppraiseScore(data?.appraiseScore);
      setDisposeDetail(data?.disposeDetail);
      setDisposeImages(data?.disposeImages);
      // setFeedbackList(data.feedbackList)

      if (data?.status == 2) {
        if (data.isSolve == 0 && data.appraiseScore == 0) {
          setEvaluateModalVisible(true);
        } else if (data.isSolve == 0) {
          setEvaluateModalVisible(true);
        } else if (data.appraiseScore == 0) {
          setScoreModalVisible(true);
        }
      }

      scrollToBottom();
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

  // 提交评价
  const handleQuestionResolveStatusClick = async (resolved: boolean) => {
    Toast.showLoading("loading...");
    const params = getQueryParams();
    try {
      await submitQuestionResolvedStatus({
        questionId: params.problemId,
        resolved: resolved,
      });
      Toast.clear();
      setEvaluateModalVisible(false);
      setScoreModalVisible(appraiseScore == 0);
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
  const handleScoreSubmit = async (index: number) => {
    const params = getQueryParams();
    if (index == 0) {
      Toast.show("Please choose");
      return;
    }

    Toast.showLoading("loading...");
    try {
      await submitRating({
        questionId: params.problemId,
        score: index,
      });
      Toast.clear();
      setScoreResModalVisible(index < 4);
      setScoreModalVisible(false);
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

  // const closeScoreResModal = () => {
  //   setScoreResModalVisible(false);
  //   fetchData();
  // }

  const closeEvaluateModal = () => {
    setEvaluateModalVisible(false);
  };

  // 获取补充信息
  const handleComplaintTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 200) {
      return;
    } else {
      setComplaintText(e.target.value);
    }
  };

  // 上传图片
  const handleFileUpload = async (file: File): Promise<ImageUploadItem> => {
    const compressedFile = await compressImage(file);
    // blob转file, 因为大文件会被转成blob类型
    let result = compressedFile;
    result = new File([result], file.name, { type: file.type, lastModified: Date.now() });
    const res = await submitCustomerServiceImage(result);
    const data = UploadData.parseJson(res.data);

    return {
      url: data.imageUrl,
    };
  };

  // 提交补充信息
  const handleAdditionSendButtonClick = async () => {
    if (files.length == 0) {
      Toast.show("Please upload pictures");
      return;
    }
    Toast.showLoading("loading...");
    const params = getQueryParams();
    try {
      await submitQuestionAdditionalInfo({
        questionId: params.problemId,
        content: complaintText,
        imageUrls: files.map((file) => file.url).toString(),
      });
      Toast.clear();
      fetchData();
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

  const handleQuestionFinishButtonClick = async () => {
    const params = getQueryParams();
    const questionId = params.problemId;
    Toast.showLoading("loading...");
    try {
      await submitEndQuestionFeedback(questionId);
      Toast.clear();
      fetchData();
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

  const scrollToBottom = () => {
    if (messagesEndRef.current && additionEndRef.current) {
      const scrollHeight = messagesEndRef.current.scrollHeight; // Total div height (e.g., 2000px)
      const clientHeight = messagesEndRef.current.clientHeight; // Visible height (e.g., 200px)
      const maxScrollTop = scrollHeight - additionEndRef.current.scrollHeight - clientHeight;

      messagesEndRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  return (
    <div className='complainPage complainDetails' ref={messagesEndRef}>
      <div className='complainType clearfix'>
        <div className='title'>
          <span className='topLine' style={{ background: AppConfig.bgFontColor }}></span>Complaint
          Type
        </div>
        <div className='typeDesc' style={{ color: AppConfig.bgFontColor }}>
          {type}
        </div>
      </div>
      <div className='complainType clearfix'>
        <div className='title'>
          <span className='topLine' style={{ background: AppConfig.bgFontColor }}></span>subtype
        </div>
        <div className='typeDesc' style={{ color: AppConfig.bgFontColor }}>
          {sonType}
        </div>
      </div>
      <div className='complanitContent'>
        <div className='textWrap'>
          <textarea value={content} disabled={true} placeholder='Enter Details.'></textarea>
          <p>
            <span style={{ color: "#333" }}>{content?.length}</span>/200
          </p>
        </div>
      </div>
      <div className='imageDetails'>
        <ul className='clearfix'>
          {images?.map((item, index) => {
            return (
              <li key={index}>
                <img src={item} alt='' className='complainImg' />
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className='complainType complainDispos clearfix'
        style={{ display: disposeDetail != "" ? "block" : "none" }}
      >
        <div className='title'>
          <span className='topLine' style={{ background: AppConfig.bgFontColor }}></span>Process
          Results
        </div>
        <div className='disposDetails'>
          <section className='disposTop'>
            <img src={complaintImage.CUSTOM_LOGO} className='customLogo' alt='' />
            <span>cs</span>
          </section>
          <p>{disposeDetail}</p>
          <div className='imageDetails'>
            <ul className='clearfix'>
              {disposeImages?.map((item, index) => {
                return (
                  <li key={index}>
                    <img src={item} alt='' className='complainImg' />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* <div className='dialogue' style={{ display: dialogue.length == 0 ? "none" : "block" }}>
        <div className='dialogueTop'>Supplementary part</div>
        {dialogue.map((item, index) => {
          return (
            <div key={index} className='dialogueDetail'>
              <div className='client'>
                <div className='clientText'>
                  <div>{item.technicolor == "" ? ". . ." : item.technicolor}</div>
                  <img src={complaintImage.AVATAR}></img>
                </div>
                <div className='clientPic'>
                  {item.dare.map((val, index) => {
                    return <img src={val} key={index}></img>;
                  })}
                </div>
              </div>

              <div className='client CSreply'>
                <div className='clientText CSreplyText'>
                  <img src={complaintImage.CUSTOM_LOGO}></img>
                  <div>{item.mortal == "" ? "Waiting for reply..." : item.mortal}</div>
                </div>
                <div className='clientPic CSpic'>
                  {item.outrage.map((val, index) => {
                    return <img src={val} key={index}></img>;
                  })}
                </div>
              </div>

              <div className='detailLine'></div>
            </div>
          );
        })}
      </div> */}
      <div
        className='addition'
        style={{ display: shouldReFeedback == 1 ? "block" : "none" }}
        ref={additionEndRef}
      >
        <div
          className='complanitContent'
          style={{ display: isFeedbackExpired == 0 ? "block" : "none" }}
        >
          <div className='title'>
            <span className='topLine' style={{ background: AppConfig.background }}></span>
            Additional description
          </div>
          <div className='textWrap'>
            <textarea
              value={complaintText}
              onChange={(e) => handleComplaintTextAreaChange(e)}
              placeholder='Detailed Feedback'
            ></textarea>
            <p>
              <span style={{ color: "#333" }}>{complaintText?.length}</span>/200
            </p>
          </div>
        </div>

        <div className='addImgs' style={{ display: isFeedbackExpired == 0 ? "block" : "none" }}>
          <div className='title'>Supplementary pictures</div>
          <div className='imgWrap'>
            <div>
              <ImageUploader
                style={{
                  "--adm-color-box": "#fff",
                }}
                value={files}
                onChange={(files) => setFiles(files)}
                upload={(file) => handleFileUpload(file)}
                multiple={false}
                maxCount={3}
              />
            </div>
          </div>
        </div>

        <div className='addBottom'>
          <div
            className='submit'
            style={{
              display: isFeedbackExpired == 1 ? "none" : "block",
              background: AppConfig.background,
            }}
            onClick={() => handleAdditionSendButtonClick()}
          >
            Sent
          </div>
          <div className='over' onClick={() => handleQuestionFinishButtonClick()}>
            Finish
          </div>
        </div>
      </div>

      {/* 问题是否解决弹窗      */}
      <Modal
        visible={evaluateModalVisible}
        closeOnMaskClick={true}
        onClose={() => closeEvaluateModal()}
        className={"evaluateWrap"}
        content={
          <div className='evaModal'>
            <p className='evaTitle'>Is Your Problem Resolved ?</p>
            <div
              className='chooseEva yesContent'
              onClick={() => handleQuestionResolveStatusClick(true)}
            >
              <img src={complaintImage.GOOD} className='goodImg' alt='' />
              <span>Resolved</span>
            </div>
            <div
              className='chooseEva noContent'
              onClick={() => handleQuestionResolveStatusClick(false)}
            >
              <img src={complaintImage.BAD} className='goodImg' alt='' />
              <span>Not finished</span>
            </div>
          </div>
        }
      />

      {/* 评分功能弹窗 */}
      {
        <ScoreModal
          visible={scoreModalVisible}
          onClose={() => setScoreModalVisible(false)}
          onSubmit={(value) => handleScoreSubmit(value)}
        />
      }

      {/*  评分结果弹窗 */}
      <ScoreResultModal
        visible={scoreResModalVisible}
        onClose={() => setScoreResModalVisible(false)}
      />
    </div>
  );
};

export { ComplaintDetails };
