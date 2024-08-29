"use client";
import React, { useState } from "react";
import ContentComponent from "@/components/content";
import { Col, Flex, Row, theme, Button, Input, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useAppSelector } from "@/lib/hooks/hooks";

const { Search } = Input;

interface DataType {
  key: string;
  name: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "USER",
  },
  {
    key: "2",
    name: "ADMIN",
  },
  {
    key: "3",
    name: "SUPERADMIN",
  },
];

const rolePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );
  const checkStatusResponse: boolean = useAppSelector(
    (state) => state.responsive.checkStatusResponse
  );

  return (
    <>
      {!checkStatusBackground ? (
        <></>
      ) : (
        <>
          <div
            style={{
              padding: "0 16px",
              marginBottom: "10px",
            }}
          >
            <Row style={{ width: "100%" }}>
              <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div
                  style={{ paddingRight: checkStatusResponse ? "0px" : "5px" }}
                >
                  <div
                    style={{
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                      padding: "16px 16px",
                    }}
                  >
                    <Flex justify="start" align="start">
                      <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        loading={true}
                      />
                    </Flex>
                  </div>
                </div>
              </Col>
              <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                <div
                  style={{
                    paddingLeft: "0px",
                    marginTop: checkStatusResponse ? "10px" : "0px",
                  }}
                >
                  <div
                    style={{
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                      padding: "16px 16px",
                    }}
                  >
                    <Flex justify="end" align="end" wrap gap="small">
                      <Button type="primary" size="large">
                        Primary
                      </Button>
                      <Button type="primary" size="large">
                        Primary
                      </Button>
                      <Button type="primary" size="large">
                        Primary
                      </Button>
                    </Flex>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <ContentComponent>
            <Table
              columns={columns}
              dataSource={data}
              scroll={{ x: 768, y: 375 }}
            />
          </ContentComponent>
        </>
      )}
    </>
  );
};

export default rolePage;
