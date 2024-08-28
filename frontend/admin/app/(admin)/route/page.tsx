"use client";
import React, { useState } from 'react';
import ContentComponent from "@/components/content";
import { Col, Flex, Row, theme, Button, Input, Table } from "antd";
import type { TableColumnsType, TableProps } from 'antd';
import { useAppSelector } from '@/lib/hooks/hooks';

const { Search } = Input;

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '5',
    name: 'Jane White',
    age: 28,
    address: 'Paris No. 1 River Road',
  },
  {
    key: '6',
    name: 'Jake Blue',
    age: 36,
    address: 'Berlin No. 3 City Square',
  },
  {
    key: '7',
    name: 'Sarah Pink',
    age: 24,
    address: 'Rome No. 5 Pine Avenue',
  },
  {
    key: '8',
    name: 'Emma Yellow',
    age: 30,
    address: 'Toronto No. 4 Maple Street',
  },
  {
    key: '9',
    name: 'Liam Violet',
    age: 40,
    address: 'Dublin No. 2 Oak Lane',
  },
  {
    key: '10',
    name: 'Mia Brown',
    age: 34,
    address: 'Tokyo No. 6 Cherry Blossom Road',
  },
  {
    key: '11',
    name: 'Noah Orange',
    age: 29,
    address: 'Madrid No. 7 Sun Street',
  },
  {
    key: '12',
    name: 'Sophia Grey',
    age: 31,
    address: 'Moscow No. 9 Red Square',
  },
  {
    key: '13',
    name: 'Isabella Green',
    age: 38,
    address: 'Dubai No. 10 Palm Island',
  },
  {
    key: '14',
    name: 'Ethan Blue',
    age: 33,
    address: 'Singapore No. 8 Riverfront',
  },
  {
    key: '15',
    name: 'Olivia Purple',
    age: 26,
    address: 'Los Angeles No. 11 Sunset Boulevard',
  },
  {
    key: '16',
    name: 'Mason Black',
    age: 41,
    address: 'Chicago No. 12 Windy Avenue',
  },
  {
    key: '17',
    name: 'Ava Silver',
    age: 35,
    address: 'Hong Kong No. 13 Peak Road',
  },
  {
    key: '18',
    name: 'William White',
    age: 37,
    address: 'Bangkok No. 14 Golden Temple',
  },
  {
    key: '19',
    name: 'Charlotte Red',
    age: 27,
    address: 'Seoul No. 15 Han River',
  },
  {
    key: '20',
    name: 'James Green',
    age: 39,
    address: 'Melbourne No. 16 Docklands',
  },
  {
    key: '21',
    name: 'Henry Blue',
    age: 32,
    address: 'Vancouver No. 17 Stanley Park',
  },
  {
    key: '22',
    name: 'Evelyn Yellow',
    age: 28,
    address: 'Auckland No. 18 Sky Tower',
  },
  {
    key: '23',
    name: 'Alexander Violet',
    age: 34,
    address: 'Barcelona No. 19 Gaudi Street',
  },
  {
    key: '24',
    name: 'Ella Grey',
    age: 30,
    address: 'Vienna No. 20 Opera House',
  },
];

const routePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const checkStatusBackground: boolean = useAppSelector(state => state.responsive.checkStatusBackground)
  const checkStatusResponse: boolean = useAppSelector(state => state.responsive.checkStatusResponse)

  return (
    <>
      {!checkStatusBackground ? <></> : <>
        <div
          style={{
            padding: "0 16px",
            marginBottom: "10px",
          }}
        >
          <Row style={{ width: "100%" }}>
            <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div style={{ paddingRight: checkStatusResponse ? "0px" : "5px" }}>
                <div
                  style={{
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    padding: "16px 16px",
                  }}
                >
                  <Flex justify="start" align="start">
                    <Search placeholder="input search text" enterButton="Search" size="large" loading={true} />
                  </Flex>
                </div>
              </div>
            </Col>
            <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <div style={{ paddingLeft: "0px", marginTop: checkStatusResponse ? "10px" : "0px" }}>
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
          <Table columns={columns} dataSource={data} onChange={handleChange} scroll={{ x: 768 }} />
        </ContentComponent>
      </>}
    </>
  );
};

export default routePage;
