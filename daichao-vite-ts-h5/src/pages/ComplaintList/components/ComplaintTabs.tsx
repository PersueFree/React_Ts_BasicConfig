import { Tabs } from "antd-mobile";
import { FC } from "react";
import styled from "styled-components";

import { AppConfig } from "@/AppConfig";
import type { ComplaintListData, TabDataTypes } from "@/modules/ComplaintListData";

const Container = styled.div`
  width: 100%;
  padding-top: 0.5rem;
`;

interface ComplaintTabsProps {
  defaultActiveKey?: string;
  items: ComplaintListData["tabsData"];
  onChange(item?: TabDataTypes, key?: string): void;
}

const ComplaintTabs: FC<ComplaintTabsProps> = ({ defaultActiveKey, items, onChange }) => {
  const handleChange = (key: string) => {
    const selectedItem = items?.find((item) => `${item.id}` === `${key}`);
    onChange(selectedItem, key);
  };

  return (
    <Container className='complaintTabs'>
      <Tabs
        style={{
          "--active-title-color": AppConfig.bgFontColor,
          "--active-line-color": AppConfig.bgFontColor,
          "--active-line-height": "0.20rem",
          "--content-padding": "0",
          "--title-font-size": "0.75rem",
          color: "#999999",
          lineHeight: "1.4rem",
        }}
        defaultActiveKey={defaultActiveKey}
        onChange={(key) => handleChange(key)}
      >
        {items?.map((tab) => (
          <Tabs.Tab
            key={tab.id}
            title={tab.title}
            style={{
              background: "#fff",
            }}
          />
        ))}
      </Tabs>
    </Container>
  );
};
export { ComplaintTabs };
