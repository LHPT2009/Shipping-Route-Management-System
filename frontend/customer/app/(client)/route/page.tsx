"use client";
import React, { useEffect, useRef, useState } from "react";
import { Col, Flex, Row, theme, Button, Input, Table, Form, Space, Menu } from "antd";
import type { GetProp, InputRef, TableColumnsType, TableColumnType, TableProps } from "antd";
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
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_ROUTES } from "@/apollo/query/route";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import type { SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import { useRouter } from "next/navigation";

const { Search } = Input;

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  id: number;
  name: string;
  departure: string;
  arrival: string;
  shipping_type: string;
  status: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

type DataIndex = keyof DataType;

const RoutePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [data, setData] = useState<DataType[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );
  const checkStatusResponse: boolean = useAppSelector(
    (state) => state.responsive.checkStatusResponse
  );

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    if (clearFilters) {
      clearFilters();
    }
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: "1rem" }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ borderRadius: "0.3rem", marginBottom: "1rem", display: 'block', padding: "0.4rem 1rem", width: "18rem" }}
        />
        <Space style={{ float: "right", marginBottom: "1rem" }}>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{ width: 100, height: 34, borderRadius: "0.3rem" }}
          >
            Reset
          </Button>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            style={{ width: 100, height: 34, borderRadius: "0.3rem" }}
          >
            Search
          </Button>

        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? COLOR.PRIMARY : undefined, fontSize: "1.1rem" }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      key: 'id',
      render: (text, record, index) => index,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      // width: '20%',
    },
    {
      title: 'Departure',
      dataIndex: 'departure',
      key: 'departure',
      ...getColumnSearchProps('departure'),
      // width: '20%',
    },
    {
      title: 'Arrival',
      dataIndex: 'arrival',
      key: 'arrival',
      ...getColumnSearchProps('arrival'),
      // width: '20%',
    },
    {
      title: 'Shipping Type',
      dataIndex: 'shipping_type',
      key: 'shipping_type',
      filters: [
        { text: 'Finished', value: 'finished' },
        { text: 'In Progress', value: 'in_progress' },
        { text: 'Canceled', value: 'canceled' },
      ],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Menu
            selectedKeys={selectedKeys.map(String)}
            onClick={({ key }) => {
              if (key === 'all') {
                handleReset(clearFilters!);
                confirm();
              } else {
                setSelectedKeys([key]);
                confirm();
              }
            }}
          >
            <Menu.Item key="all" > All </Menu.Item>
            <Menu.Item key="finished"> Finished </Menu.Item>
            <Menu.Item key="in_progress"> In Progress </Menu.Item>
            <Menu.Item key="canceled"> Canceled </Menu.Item>
          </Menu>
        </div>
      ),
      // width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
      ],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Menu
            selectedKeys={selectedKeys.map(String)}
            onClick={({ key }) => {
              if (key === 'all') {
                handleReset(clearFilters!);
                confirm();
              } else {
                setSelectedKeys([key]);
                confirm();
              }
            }}
          >
            <Menu.Item key="all" > All </Menu.Item>
            <Menu.Item key="active"> Active </Menu.Item>
            <Menu.Item key="inactive"> Inactive </Menu.Item>
          </Menu>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_, record) => (
        <Button
          onClick={() => router.push(`/role/${record.id}`)}
          style={{ width: 100, height: 34, borderRadius: "0.3rem" }}
        >
          Detail
        </Button>
      ),
    },

  ];

  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const { handleError } = useHandleError();

  const [getRoutes, { loading }] = useLazyQuery(GET_ROUTES, {
    onCompleted: async (data) => {
      console.log(data.getRoutes.data);
      setData(data.getRoutes.data.routes);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.getRoutes.data.total,
        },
      });
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  useEffect(() => {
    const fetchRoutes = async () => {
      const { accessToken, expiresIn } = await fetchCookies();
      if (accessToken && expiresIn) {
        await getRoutes({
          context: {
            headers: {
              accesstoken: accessToken
            }
          },
          variables: {
            input: {
              page: 1,
              limit: 2,
              name: "",
              departure: "",
              arrival: "",
              shipping_type: "",
              status: ""
            }
          },
        });
      }
    };
    fetchRoutes();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  // const fetchData = () => {
  //   fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
  //     .then((res) => res.json())
  //     .then(({ results }) => {
  //       console.log('url', `https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`);
  //       console.log(getRandomuserParams(tableParams));
  //       setData(results);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams.pagination,
  //           total: 200,
  //         },
  //       });
  //       console.log("tableParams", tableParams);
  //     });
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [
  //   tableParams.pagination?.current,
  //   tableParams.pagination?.pageSize,
  //   tableParams?.sortOrder,
  //   tableParams?.sortField,
  //   JSON.stringify(tableParams.filters),
  // ]);

  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <>
      {!checkStatusBackground ? (
        <></>
      ) : (
        <div style={{ width: "88rem", margin: "6.5rem auto 2rem auto" }}>
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
            rowKey={(record) => record.id}
            className={styles['table-striped-rows']}
            columns={columns}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            dataSource={data}
          />

        </div>
      )}
    </>
  );
};

export default RoutePage;
