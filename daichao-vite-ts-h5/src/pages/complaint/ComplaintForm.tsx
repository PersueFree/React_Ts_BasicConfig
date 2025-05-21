import { ImageUploadItem, ImageUploader } from "antd-mobile";
import { FC, useEffect, useRef, useState } from "react";

import { getQueryParams } from "@/utils/getQueryParams";
import nativeUtils from "@/utils/nativeUtils";

import { complaintImage } from "@/assets/images";

import { AppConfig } from "@/AppConfig";
import {
  fetchQuestionList,
  submitCustomerServiceImage,
  submitCustomerServiceQuestion,
} from "@/api";
import { Toast } from "@/components";
import { QuestionData } from "@/modules/QuestionData";
import type { AnswerTypes } from "@/modules/QuestionData";
import { UploadData } from "@/modules/UploadData";
import { compressImage, setPageTitle } from "@/utils";

import "./ComplaintForm.less";

interface QuestionTypeModalProps {
  visible: boolean;
  data: QuestionData["answerList"] | null;
  value: number;
  onSelect: (item: AnswerTypes, index: number) => void;
  onClose: () => void;
  onDone: () => void;
}

interface QuestionModalProps {
  visible: boolean;
  data: QuestionData["answerList"] | null;
  value: number;
  onSelect: (item: AnswerTypes, index: number) => void;
  onClose: () => void;
  onDone: () => void;
}

const ComplaintForm: FC = () => {
  const [bigAnswerList, setBigAnswerList] = useState<QuestionData["answerList"] | null>();
  const [problemStatus] = useState([
    {
      title: "Delivered",
      value: 0,
    },
    {
      title: "In Progress",
      value: 1,
    },
    {
      title: " Waiting for Review",
      value: 2,
    },
    {
      title: "Completed",
      value: 3,
    },
  ]);
  const [problemIndex, setProblemIndex] = useState<number>(0);
  const [agreePayTimer, setAgreePayTimer] = useState<number>(1);
  const [questionTypeModalVisible, setQuestionTypeModalVisible] = useState<boolean>(false);
  const [questionTypeModalIndex, setQuestionTypeModalIndex] = useState<number>(0);
  const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false);
  const [complaintText, setComplaintText] = useState<string>("");
  const [files, setFiles] = useState<ImageUploadItem[]>([]);
  const [sonAnswerList, setSonAnswerList] = useState<QuestionData["answerList"] | null>();
  const [questionModalVisible, setQuestionModalVisible] = useState<boolean>(false);
  const [sonProblemIndex, setSonProblemIndex] = useState<number>(0);
  const [questionModalIndex, setQuestionModalIndex] = useState<number>(0);
  const [smallId, setSmallId] = useState<string | number>();
  const [questionSelectedId, setQuestionSelectedId] = useState<string | number>();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPageTitle("Customer Service");

    const params = getQueryParams();
    fetchData(0);

    const _problemIndex = parseInt(
      (localStorage.getItem("problemIndex") ?? params.problemIndex) || "0",
    );
    setProblemIndex(_problemIndex);
    setQuestionTypeModalIndex(_problemIndex);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const fetchData = async (pid?: number | string, type?: number) => {
    Toast.showLoading("loading...");

    const params = getQueryParams();
    const orderNo = localStorage.getItem("orderNo")
      ? localStorage.getItem("orderNo")
      : params.orderNo;
    try {
      const res = await fetchQuestionList(pid, orderNo, type);

      Toast.clear();
      const data = QuestionData.parseJson(res.data);
      if (pid == 0) {
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
    const { problemIndex } = getQueryParams();
    console.log("handleQuestionTypeList", problemIndex);
    setBigAnswerList(data?.answerList);
    // 获取默认大类的子类
    fetchData(data?.answerList?.[Number(problemIndex || "0")]?.id, 8);
  };

  const handleFetchQuestionList = (data: QuestionData | null) => {
    setSonAnswerList(data?.answerList);
    setSmallId(data?.answerList?.[0]?.id ?? "");
    setQuestionSelectedId(data?.answerList?.[0]?.id ?? "");
  };

  // 获取投诉内容
  const handleComplaintTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;

    if (content.length > 200) {
      return;
    }
    setComplaintText(content);
  };

  // 上传图片
  const handleFileUpload = async (file: File) => {
    console.log("files", files);
    console.log("handleFileUpload", file);

    const compressedFile = await compressImage(file);
    // blob转file, 因为大文件会被转成blob类型
    const processedFile =
      compressedFile instanceof Blob
        ? new File([compressedFile], file.name, {
            type: file.type || "application/octet-stream",
            lastModified: Date.now(),
          })
        : compressedFile;
    const res = await submitCustomerServiceImage(processedFile);
    const data = UploadData.parseJson(res.data);

    Toast.show("Successful upload!");

    return {
      url: data.imageUrl,
    };
  };

  const startCountDown = () => {
    if (agreePayTimer > 1) {
      setAgreePayTimer((agreePayTimer) => agreePayTimer - 1);
    } else {
      setAgreePayTimer(1);
      setSuccessModalVisible(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // DamiCredit.finish();
      nativeUtils.closeSyn();
    }
  };

  // 提交投诉
  const handleSendButtonClick = async () => {
    if (complaintText == "") {
      Toast.show("please enter your criticize and suggestions");
      return;
    }

    Toast.showLoading("loading...");

    const params = getQueryParams();
    const orderNo = localStorage.getItem("orderNo")
      ? localStorage.getItem("orderNo")
      : params.orderNo;
    try {
      await submitCustomerServiceQuestion({
        questionType: problemIndex + 1,
        sonQuestion: smallId,
        questionDesc: complaintText,
        imageUrl: files.length == 0 ? "" : files.map((file) => file.url).toString(),
        orderNo: orderNo,
      });
      Toast.clear();
      setSuccessModalVisible(true);
      intervalRef.current = setInterval(startCountDown, 1000);
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

  const showQuestionTypeModal = () => {
    setQuestionTypeModalVisible(true);
  };

  const handleQuestionTypeSelect = (item: AnswerTypes, index: number) => {
    console.log("handleQuestionTypeSelect", item);
    setQuestionTypeModalIndex(index);
  };

  const handleQuestionTypeModalClose = () => {
    setQuestionTypeModalIndex(problemIndex);
    setQuestionTypeModalVisible(false);
  };

  const handleQuestionTypeModalDone = () => {
    const selectedIndex = questionTypeModalIndex;
    const item = bigAnswerList?.[selectedIndex];
    console.log("handleQuestionTypeModalDone", item);
    fetchData(item?.id, 8);
    setQuestionTypeModalVisible(false);
    setProblemIndex(selectedIndex);
    setSonProblemIndex(0);
    setQuestionModalIndex(0);
  };

  const showQuestionModal = () => {
    setQuestionModalVisible(true);
  };

  const handleQuestionSelect = (item: AnswerTypes, index: number) => {
    console.log("handleQuestionSelect", item);
    setQuestionModalIndex(index);
    setQuestionSelectedId(item.id);
  };

  const handleQuestionModalCancel = () => {
    setQuestionModalVisible(false);
    setQuestionModalIndex(sonProblemIndex);
    setQuestionSelectedId(smallId);
  };

  const handleQuestionModalDone = () => {
    setQuestionModalVisible(false);
    setSonProblemIndex(questionModalIndex);
    setSmallId(questionSelectedId);
  };

  return (
    <div className='complainPage'>
      <div className='complainStep'>
        <ul className='steps'>
          {problemStatus.map((item, index) => {
            return (
              <li key={index} className={index == 0 ? "step_pass" : "step_no"}>
                <div className='step-content'>
                  <div className='step-num' style={{ borderColor: AppConfig.bgFontColor }}></div>
                  <div className='sub_title'>{item.title}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 父类 */}
      <div className='complainType'>
        <div className='title'>
          <span className='topLine' style={{ background: AppConfig.background }}></span>Type of
          Complaint
        </div>
        <div className='complainContent'>
          {bigAnswerList?.map((item, index) => {
            return (
              <span
                key={index}
                style={{
                  display: problemIndex == index ? "inline-block" : "none",
                  color: AppConfig.bgFontColor,
                }}
                className='typeTag active'
                onClick={() => showQuestionTypeModal()}
              >
                {item.title_local}
              </span>
            );
          })}
          <img className='dropdown' src={complaintImage.ARROW_DOWN} alt='' />
        </div>
      </div>

      {/* 子类 */}
      <div
        className='complainType'
        style={{ display: sonAnswerList?.length ? "block" : "none", paddingTop: "0" }}
      >
        <div className='title'>
          <span className='topLine' style={{ background: AppConfig.background }}></span>Type of
          Complaint
        </div>
        <div className='complainContent'>
          {sonAnswerList?.map((item, index) => {
            return (
              <span
                key={index}
                style={{
                  display: sonProblemIndex == index ? "inline-block" : "none",
                  color: AppConfig.bgFontColor,
                }}
                className='typeTag active'
                onClick={() => showQuestionModal()}
              >
                {item.title_local}
              </span>
            );
          })}
          <img className='dropdown' src={complaintImage.ARROW_DOWN} alt='' />
        </div>
      </div>

      <div className='complanitContent'>
        <div className='title'>
          <span className='topLine' style={{ background: AppConfig.background }}></span>Short
          Description
        </div>
        <div className='textWrap'>
          <textarea
            value={complaintText}
            onChange={(e) => handleComplaintTextAreaChange(e)}
            placeholder='Detailed Feedback'
          ></textarea>
          <p>
            <span style={{ color: "#333" }}>{complaintText.length}</span>/200
          </p>
        </div>
      </div>

      <div className='addImgs'>
        <div className='title'>Upload Image Description</div>
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

      <div className='tipWord'>
        Please upload a screenshot so we can understand the problem you are experiencing more
        accurately.
      </div>

      <div
        className='submitComplain'
        onClick={() => handleSendButtonClick()}
        style={{ background: AppConfig.background, color: "#fff", fontSize: "0.8rem" }}
      >
        Sent
      </div>

      {/* 父类选项弹窗 */}
      <QuestionTypeModal
        visible={questionTypeModalVisible}
        data={bigAnswerList}
        value={questionTypeModalIndex}
        onSelect={(item, index) => handleQuestionTypeSelect(item, index)}
        onClose={() => handleQuestionTypeModalClose()}
        onDone={() => handleQuestionTypeModalDone()}
      />

      {/* 子类问题的弹窗 */}
      <QuestionModal
        visible={questionModalVisible}
        data={sonAnswerList}
        value={questionModalIndex}
        onSelect={(item, index) => handleQuestionSelect(item, index)}
        onClose={() => handleQuestionModalCancel()}
        onDone={() => handleQuestionModalDone()}
      />

      {successModalVisible && (
        <div className='complaintSuccessModel'>
          <div className='complaintSuccessModelWrap'>
            <img src={complaintImage.SUCCESS_TIP} alt='' />
            <p>Sent successfully</p>
          </div>
        </div>
      )}
    </div>
  );
};

const QuestionTypeModal: FC<QuestionTypeModalProps> = ({
  visible,
  data,
  value,
  onSelect,
  onClose,
  onDone,
}) => {
  return (
    <>
      <div className='allOrdersWrap' style={{ display: visible ? "block" : "none" }}></div>
      <div className='allProblemLists' style={{ display: visible ? "flex" : "none" }}>
        <div className='topDetail'>
          <div className='topLeft' onClick={onClose}>
            Cancel
          </div>
          <div className='topRight' onClick={onDone} style={{ color: AppConfig.bgFontColor }}>
            Done
          </div>
        </div>
        <ul>
          {data?.map((item, index) => {
            return (
              <li key={index} onClick={() => onSelect(item, index)}>
                <div className={value == index ? "typeChoose" : ""}>{item.title_local}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const QuestionModal: FC<QuestionModalProps> = ({
  visible,
  data,
  value,
  onSelect,
  onClose,
  onDone,
}) => {
  return (
    <>
      {/* 遮罩 */}
      <div className='allOrdersWrap' style={{ display: visible ? "block" : "none" }}></div>;
      {/* 弹窗内容 */}
      <div className='allProblemLists' style={{ display: visible ? "flex" : "none" }}>
        <div className='topDetail'>
          <div className='topLeft' onClick={onClose}>
            Cancel
          </div>
          <div className='topRight' onClick={onDone} style={{ color: AppConfig.bgFontColor }}>
            Done
          </div>
        </div>
        <ul>
          {data?.map((item, index) => {
            return (
              <li key={index} onClick={() => onSelect(item, index)}>
                <div className={value == index ? "typeChoose" : ""}>{item.title_local}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export { ComplaintForm };
