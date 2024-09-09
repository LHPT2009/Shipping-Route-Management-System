"use client";
import React, { useEffect, useRef, useState } from "react";
import { Col, Flex, Row, theme, Button, Input, Table, Form, Space, Menu, Tag } from "antd";
import type { GetProp, InputRef, TableColumnsType, TableColumnType, TableProps } from "antd";
import { useAppSelector } from "@/lib/hooks/hooks";
// import RouteModal from "@/components/modal/route";
import styles from "./route.module.css";
import Title from "antd/es/typography/Title";
import { COLOR } from "@/constant/color";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import * as yup from "yup";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_ROUTES } from "@/apollo/query/route"
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { FilterDropdownProps } from "antd/es/table/interface";
import type { SorterResult } from 'antd/es/table/interface';
import { useRouter } from "next/navigation";
import MapIcon from "@/public/svg/route/map.svg";
import InformationIcon from "@/public/svg/route/information.svg";
import CustomModal from "@/components/modal/route";
import { DeleteOutlined, EditOutlined, InfoCircleFilled, InfoCircleOutlined, InfoOutlined, SearchOutlined } from "@ant-design/icons";
import ContentComponent from "@/components/content";

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
  departureLongitude: number,
  departureLatitude: number,
  arrivalLongitude: number,
  arrivalLatitude: number,
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
  const [departure, setDeparture] = useState<number[]>([]);
  const [arrival, setArrival] = useState<number[]>([]);

  const [data, setData] = useState<DataType[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
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
          style={{ background: "white", borderRadius: "0.3rem", marginBottom: "1rem", display: 'block', padding: "0.4rem 1rem", width: "18rem" }}
        />
        <Space style={{ float: "right", marginBottom: "1rem" }}>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{ background: "white", width: 100, height: 34, borderRadius: "0.3rem" }}
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

  const menuStatus = [
    {
      key: 'all',
      label: 'All',
    },
    {
      key: 'Progress',
      label: 'Progress',
    },
    {
      key: 'Finished',
      label: 'Finished',
    },
    {
      key: 'Cancelled',
      label: 'Cancelled',
    },
  ];

  const menuShippingType = [
    {
      key: 'all',
      label: 'All',
    },
    {
      key: 'Seaway',
      label: 'Seaway',
    },
    {
      key: 'Road',
      label: 'Road',
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      ...getColumnSearchProps('name'),
      width: '10%',
    },
    {
      title: 'Departure',
      dataIndex: 'departure',
      key: 'departure',
      sorter: true,
      ...getColumnSearchProps('departure'),
      width: '22%',
    },
    {
      title: 'Arrival',
      dataIndex: 'arrival',
      key: 'arrival',
      sorter: true,
      ...getColumnSearchProps('arrival'),
      width: '22%',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
      width: '10%',
      sorter: true,
    },
    {
      title: 'Shipping',
      dataIndex: 'shipping_type',
      key: 'shipping_type',
      width: '8%',
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
            items={menuShippingType}
          />
        </div>
      ),
      render: (_, { shipping_type }) => (
        <Tag style={{ borderRadius: "0.2rem", padding: "0.15rem 0.7rem" }} color={shipping_type === 'Seaway' ? 'blue' : 'green'} key={shipping_type}>
          {shipping_type}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
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
            items={menuStatus}
          />
        </div>
      ),
      render: (_, { status }) => (
        <Tag style={{ borderRadius: "0.2rem", padding: "0.15rem 0.7rem" }} color={status === 'Finished' ? 'cyan' : status === 'Progress' ? 'orange' : 'red'} key={status}>
          {status}
        </Tag>
      )
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      width: "15%",
      render: (_, record, index) => (
        <Flex align="center" gap="1rem">
          <Button
            type="primary"
            onClick={() => {

            }}
            style={{ width: "2.3rem", borderRadius: "0.3rem" }}
          >
            <InfoCircleOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {

            }}
            style={{ width: "2.3rem", borderRadius: "0.3rem", background: "#f08c00" }}
          >
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => {

            }}
            style={{ width: "2.3rem", borderRadius: "0.3rem", background: "#e03131" }}
          >
            <DeleteOutlined />
          </Button>

        </Flex>
      ),
    },

  ];

  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const { handleError } = useHandleError();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              authorization: `Bearer ${accessToken}`
            }
          },
          variables: {
            input: {
              page: tableParams.pagination?.current,
              limit: tableParams.pagination?.pageSize,
              name: tableParams.filters?.name?.[0],
              departure: tableParams.filters?.departure?.[0],
              arrival: tableParams.filters?.arrival?.[0],
              shipping_type: tableParams.filters?.shipping_type?.[0],
              status: tableParams.filters?.status?.[0],
              sort_field: tableParams.sortField,
              sort_order: tableParams.sortOrder,
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
    <div >
      {!checkStatusBackground ? (
        <></>
      ) : (
        <ContentComponent>
          <Table
            rowKey={(record) => record.id}
            className={styles['table-striped-rows']}
            columns={columns}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            dataSource={data}
          />
        </ContentComponent>
      )}

    </div>
  );
};

export default RoutePage;
