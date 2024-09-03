"use client";
import React, { useState } from "react";
import ContentComponent from "@/components/content";
import { Col, Flex, Row, theme, Button, Input, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useQuery } from "@apollo/client";
import { GET_ROLES } from "@/apollo/query/role";
import { useRouter } from "next/navigation";
import { headers } from "next/headers";

const { Search } = Input;

interface DataType {
  id: string;
  name: string;
}

const RolePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      // title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => router.push(`/role/${record.id}`)}
        >
          Detail
        </Button>
      ),
    },
  ];

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );
  const checkStatusResponse: boolean = useAppSelector(
    (state) => state.responsive.checkStatusResponse
  );

  const [listItem, setListItem] = useState<DataType[]>();

  useQuery(GET_ROLES, {
    onCompleted: async (data) => {
      setListItem(data.getRoles.data);
    },
  });

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
              dataSource={listItem}
              scroll={{ x: 768, y: 375 }}
            />
          </ContentComponent>
        </>
      )}
    </>
  );
};

export default RolePage;
