import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { fetchCustomerServiceSubmissionList } from "@/api";
import { Toast } from "@/components";
import { ComplaintListData } from "@/modules/ComplaintListData";
import type { ComplaintItemFun, TabData } from "@/modules/ComplaintListData";
import { setPageTitle } from "@/utils";

import { ComplaintItem } from "./components/ComplaintItem";
import { ComplaintTabs } from "./components/ComplaintTabs";

const Container = styled.div`
  max-width: 750px;
  min-height: 100%;
  overflow-y: scroll;
  padding-bottom: 6rem;

  -webkit-overflow-scrolling: touch;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0.8rem;
`;

const ComplaintList: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tabsData, setTabsData] = useState<ComplaintListData["tabsData"]>([]);
  // const [activeKey, setActiveKey] = useState<string | number | undefined>();
  const [listData, setListData] = useState<ComplaintItemFun[] | null>();

  useEffect(() => {
    setPageTitle("Input List");
    fetchData();
  }, []);

  const fetchData = async () => {
    Toast.showLoading("loading...");
    try {
      const res = await fetchCustomerServiceSubmissionList();
      Toast.clear();
      const data = ComplaintListData.parseJson(res.data);
      console.log("ComplaintListData", data);

      // let _activeKey;
      let tabsData = null;
      let listData = null;

      if (data?.tabsData && data.tabsData.length > 0) {
        tabsData = data.tabsData;
        // _activeKey = data.tabsData[0].id;
        listData = data.tabsData[0].list;
      }
      setIsLoading(false);
      setTabsData(tabsData);
      // setActiveKey(_activeKey);
      setListData(listData);
    } catch (error) {
      setIsLoading(false);
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

  const handleTabChange = (item?: TabData, key?: string) => {
    console.log("handleTabChange", item, key);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <Container className='complaintListPage'>
      <div>
        <ComplaintTabs
          items={tabsData}
          onChange={(item?: TabData, key?: string) => handleTabChange(item, key)}
        />
      </div>

      {listData && (
        <ListContainer className='complaintList'>
          {listData.map((item, index) => {
            return <ComplaintItem key={index} item={item} />;
          })}
        </ListContainer>
      )}
    </Container>
  );
};

export { ComplaintList };
