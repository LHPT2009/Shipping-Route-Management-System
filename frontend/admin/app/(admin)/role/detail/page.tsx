"use client";
import ContentComponent from "@/components/content";
import React, { useEffect, useState } from "react";
import { Transfer, Typography } from "antd";
import type { TransferProps } from "antd";

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const { Title } = Typography;

const DetailRolePage = () => {
  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);

  const getMock = () => {
    const tempTargetKeys = [];
    const tempMockData = [];

    for (let i = 0; i < 8; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: i % 2 === 0,
      };
      if (data.chosen) {
        tempTargetKeys.push(data.key);
      }
      tempMockData.push(data);
    }
    setMockData(tempMockData);
    setTargetKeys(tempTargetKeys);
  };

  useEffect(() => {
    getMock();
  }, []);

  const filterOption = (inputValue: string, option: RecordType) =>
    option.description.indexOf(inputValue) > -1;

  const handleChange: TransferProps["onChange"] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const handleSearch: TransferProps["onSearch"] = (dir, value) => {
    console.log("search:", dir, value);
  };

  return (
    <>
      <ContentComponent>
        <div style={{ height: "577px" }}>
          <Title level={2}>role name</Title>
          <Transfer
            dataSource={mockData}
            showSearch
            filterOption={filterOption}
            targetKeys={targetKeys}
            onChange={handleChange}
            onSearch={handleSearch}
            render={(item) => item.title}
            listStyle={{
              width: 250,
              height: 300,
            }}
          />
        </div>
      </ContentComponent>
    </>
  );
};

export default DetailRolePage;
