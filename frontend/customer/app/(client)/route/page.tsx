"use client";
import React, { useState } from "react";
import { Col, Flex, Row, theme, Button, Input, Table, Form } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useAppSelector } from "@/lib/hooks/hooks";
// import RouteModal from "@/components/modal/route";
import ContentComponent from "@/components/route";
import styles from "./route.module.css";
import Title from "antd/es/typography/Title";
import { COLOR } from "@/constant/color";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import * as yup from "yup";

const { Search } = Input;

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
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
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Jane White",
    age: 28,
    address: "Paris No. 1 River Road",
  },
  {
    key: "6",
    name: "Jake Blue",
    age: 36,
    address: "Berlin No. 3 City Square",
  },
  {
    key: "7",
    name: "Sarah Pink",
    age: 24,
    address: "Rome No. 5 Pine Avenue",
  },
  {
    key: "8",
    name: "Emma Yellow",
    age: 30,
    address: "Toronto No. 4 Maple Street",
  },
  {
    key: "9",
    name: "Liam Violet",
    age: 40,
    address: "Dublin No. 2 Oak Lane",
  },
  {
    key: "10",
    name: "Mia Brown",
    age: 34,
    address: "Tokyo No. 6 Cherry Blossom Road",
  },
  {
    key: "11",
    name: "Noah Orange",
    age: 29,
    address: "Madrid No. 7 Sun Street",
  },
  {
    key: "12",
    name: "Sophia Grey",
    age: 31,
    address: "Moscow No. 9 Red Square",
  },
  {
    key: "13",
    name: "Isabella Green",
    age: 38,
    address: "Dubai No. 10 Palm Island",
  },
  {
    key: "14",
    name: "Ethan Blue",
    age: 33,
    address: "Singapore No. 8 Riverfront",
  },
  {
    key: "15",
    name: "Olivia Purple",
    age: 26,
    address: "Los Angeles No. 11 Sunset Boulevard",
  },
  {
    key: "16",
    name: "Mason Black",
    age: 41,
    address: "Chicago No. 12 Windy Avenue",
  },
  {
    key: "17",
    name: "Ava Silver",
    age: 35,
    address: "Hong Kong No. 13 Peak Road",
  },
  {
    key: "18",
    name: "William White",
    age: 37,
    address: "Bangkok No. 14 Golden Temple",
  },
  {
    key: "19",
    name: "Charlotte Red",
    age: 27,
    address: "Seoul No. 15 Han River",
  },
  {
    key: "20",
    name: "James Green",
    age: 39,
    address: "Melbourne No. 16 Docklands",
  },
  {
    key: "21",
    name: "Henry Blue",
    age: 32,
    address: "Vancouver No. 17 Stanley Park",
  },
  {
    key: "22",
    name: "Evelyn Yellow",
    age: 28,
    address: "Auckland No. 18 Sky Tower",
  },
  {
    key: "23",
    name: "Alexander Violet",
    age: 34,
    address: "Barcelona No. 19 Gaudi Street",
  },
  {
    key: "24",
    name: "Ella Grey",
    age: 30,
    address: "Vienna No. 20 Opera House",
  },
];

const RoutePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );
  const checkStatusResponse: boolean = useAppSelector(
    (state) => state.responsive.checkStatusResponse
  );

  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const { handleError } = useHandleError();

  // const [loginMutation, {loading}] = useMutation(LOGIN, {
  //   onCompleted: async (data) => {
  //     await setCookies('accessToken', data.login.data.accessToken);
  //     await setCookies('expiresIn', data.login.data.expiresIn);
  //     dispatch(authActions.setIsLogin(true));
  //     router.push('/');
  //     openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "Login successfully");
  //   },
  //   onError: async (error: ApolloError) => {
  //     await handleError(error);
  //   }
  // });


  return (
    <>
      {!checkStatusBackground ? (
        <></>
      ) : (
        <div style={{ width: "85%", margin: "6.5rem auto 2rem auto" }}>
          <Title level={4} style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: COLOR.TEXT,
            textAlign: "center",
            marginBottom: "3rem"
          }}>
            Routes
          </Title>

          <Table
            className={styles['table-striped-rows']}
            columns={columns}
            dataSource={data}
            onChange={handleChange}
          />

        </div>
      )}
    </>
  );
};

export default RoutePage;
