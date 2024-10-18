"use client";
import React, { useEffect, useRef, useState } from "react";
import { Col, Flex, Row, theme, Button, Input, Table, Form, Space, Menu, Tag, Breadcrumb, Tooltip } from "antd";
import type { GetProp, InputRef, TableColumnsType, TableColumnType, TableProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import styles from "./route.module.css";
import { COLOR } from "@/constant/color";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";
import { GET_ROUTES } from "@/apollo/query/route"
import { FilterDropdownProps } from "antd/es/table/interface";
import type { SorterResult } from 'antd/es/table/interface';
import { useRouter, useSearchParams } from "next/navigation";
import { DeleteOutlined, EditOutlined, ExportOutlined, InfoCircleFilled, InfoCircleOutlined, InfoOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import ContentComponent from "@/components/content";
import { REMOVE_ROUTE } from "@/apollo/mutations/route";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU, LABELMENU } from "@/constant/menu";
import DeleteRouteModal from "@/components/modal/route";
import { NOTIFICATION } from "@/constant/notification";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import { Content } from "antd/es/layout/layout";
import * as XLSX from 'xlsx';

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
  departure_time: string;
  arrival_time: string;
  shipping_type: string;
  vehicle_type: string;
  license_plate: string;
  status: string;
  departure_longitude: number,
  departure_latitude: number,
  arrival_longitude: number,
  arrival_latitude: number,
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
  const searchParams = useSearchParams();
  const searchInput = useRef<InputRef>(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [routeId, setRouteId] = useState<number>(-1);
  const [data, setData] = useState<DataType[]>([]);
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");
  const [tableParams, setTableParams] = useState<TableParams>({
    filters: {
      name: [searchParams.get("name") || ""],
      departure: [searchParams.get("departure") || ""],
      arrival: [searchParams.get("arrival") || ""],
      shipping_type: [searchParams.get("shipping-type") ? searchParams.get("shipping-type")!.charAt(0).toUpperCase() + searchParams.get("shipping-type")!.slice(1) : ""],
      status: [searchParams.get("status") ? searchParams.get("status")!.charAt(0).toUpperCase() + searchParams.get("status")!.slice(1) : ""]
    },
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("page-size")) || 20,
    },
  });

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );
  const checkStatusResponse: boolean = useAppSelector(
    (state) => state.responsive.checkStatusResponse
  );

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

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
      sorter: true,
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
      width: '24%',
    },
    {
      title: 'Arrival',
      dataIndex: 'arrival',
      key: 'arrival',
      sorter: true,
      ...getColumnSearchProps('arrival'),
      width: '24%',
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
      width: "11%",
      render: (_, record, index) => (
        <Flex align="center" gap="1rem">
          <Tooltip placement="bottom" title="Route details">
            <Button
              type="primary"
              onClick={() => {
                router.push(`/route/${record.id}/information`);
              }}
              style={{ width: "2.3rem", borderRadius: "0.3rem" }}
            >
              <InfoCircleOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="bottom" title="Delete route">
            <Button
              type="primary"
              style={{ width: "2.3rem", borderRadius: "0.3rem", background: "#e03131" }}
              onClick={() => { setRouteId(record.id); setOpenModalDelete(true); }}
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>

        </Flex>
      ),
    },

  ];

  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const { handleError } = useHandleError();

  const exportToExcel = (data: DataType[], fileName: string) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const maxWidths = data.reduce((widths: number[], row: any) => {
      headers.forEach((header, index) => {
        widths[index] = Math.max(widths[index] || 0, header.length);
      });
      Object.keys(row).forEach((key: string, index: number) => {
        const value = row[key as keyof DataType] ? row[key as keyof DataType].toString() : '';
        widths[index] = Math.max(widths[index] || 10, value.length + 2);
      });
      return widths;
    }, []);

    // Set column widths
    worksheet['!cols'] = maxWidths.map((width: any) => ({ wch: width }));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Routes');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const [getRoutes, { loading }] = useLazyQuery(GET_ROUTES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
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

  const fetchRoutes = async () => {
    await getRoutes({
      variables: {
        input: {
          search: search,
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
  };

  const [removeRoute] = useMutation(REMOVE_ROUTE, {
    onCompleted: async (data) => {
      openNotificationWithIcon("success", NOTIFICATION.CONGRATS, "Route has been deleted successfully");
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const handleDeleteRoute = async (id: number) => {
    await removeRoute({
      variables: {
        id: id
      }
    });
    fetchRoutes();
  }

  useEffect(() => {
    const currentValues = getValues();
    reset({
      ...currentValues,
      search: searchParams.get("search") || "",
    });
  }, []);

  useEffect(() => {
    fetchRoutes();
  }, [
    search,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const value: MenuState = {
      keyMenu: KEYMENU.ROUTE,
      labelMenu: LABELMENU.ROUTE,
    };
    dispatch(menuActions.changeInfoMenu(value));
  }, [dispatch]);

  // Validate Yup
  const schema = yup
    .object({
      search: yup.string()
    })
    .required();

  //useFrom hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = async (values: any) => {
    setSearch(values.search);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
        pageSize: 20
      },
    });
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('search', String(values.search));
    newSearchParams.set('page', String(1));
    newSearchParams.set('page-size', String(20));

    Array.from(newSearchParams.entries()).forEach(([key, value]) => {
      if (!value) {
        newSearchParams.delete(key);
      }
    });
    router.replace(`?${newSearchParams.toString()}`);
  };

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams((prevParams) => ({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? prevParams.sortOrder : sorter.order,
      sortField: Array.isArray(sorter) ? prevParams.sortField : sorter.field,
    }));

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', String(pagination.current));
    newSearchParams.set('page-size', String(pagination.pageSize));
    newSearchParams.set('departure', String(filters.departure?.[0] || ''));
    newSearchParams.set('arrival', String(filters.arrival?.[0] || ''));
    newSearchParams.set('name', String(filters.name?.[0] || ''));
    newSearchParams.set('shipping-type', String(filters.shipping_type?.[0] || ''));
    newSearchParams.set('status', String(filters.status?.[0] || ''));

    Array.from(newSearchParams.entries()).forEach(([key, value]) => {
      if (!value) {
        newSearchParams.delete(key);
      }
    });

    router.replace(`?${newSearchParams.toString()}`);
    // `data Source` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const screenWidth = UseScreenWidth();

  const extraSmall = true;
  const small = true;
  const medium = false;
  const large = false;
  const extraLarge = false;
  const extraExtraLarge = false;

  const responsive = GetValueFromScreen(
    screenWidth,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
  );

  return (
    <div >
      {!checkStatusBackground ? (
        <></>
      ) : (
        <>
          <div>
            <Content style={{ marginInlineStart: responsive ? 20 : 215, marginTop: responsive ? "190px" : "70px" }}>
              <Breadcrumb
                items={[
                  { title: <Link href="/">Dashboard</Link>, },
                  { title: 'List routes', }
                ]}
                style={{ paddingLeft: "0.5rem", marginBottom: "1rem" }}
              />
            </Content>
            <ContentComponent>
              <Row style={{ marginBottom: responsive ? "30px" : "0px" }}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Flex justify="flex-start">
                    <Form
                      initialValues={{ remember: true }}
                      style={{
                        width: "26rem",
                        borderRadius: "1rem",
                      }}
                      onFinish={handleSubmit(onFinish)}
                    >
                      <Form.Item
                        name="search"
                        style={{ paddingBottom: errors.search ? "1rem" : 0 }}
                      >
                        <Controller
                          name="search"
                          control={control}
                          render={({ field }) => (
                            <Input
                              key="search"
                              {...field}
                              placeholder={"Search for route name, departure and arrival"}
                              prefix={<SearchOutlined style={{ padding: "0 0.5rem 0 0.5rem" }} />}
                              style={{ borderRadius: "0.4rem", height: "2.9rem", background: "white", margin: "0 !important" }}
                            />
                          )}
                        />
                      </Form.Item>
                    </Form>
                  </Flex>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                  <Flex justify="flex-end" gap="1rem">
                    <Button
                      type="default"
                      onClick={() => {
                        router.push(`/route/create`);
                      }}
                      style={{ color: COLOR.PRIMARY, border: "1px solid #4f46e5", padding: "0 1.2rem", height: "2.8rem", borderRadius: "0.4rem" }}
                    >
                      <PlusOutlined />
                      New route
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => exportToExcel(data, 'routes')}
                      style={{ color: "white", borderRadius: "0.4rem", height: "2.8rem" }}
                    >
                      <ExportOutlined />
                      Export to Excel
                    </Button>
                  </Flex>
                </Col>
              </Row>
              <Table
                rowKey={(record) => record.name}
                className={styles['table-striped-rows']}
                columns={columns}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                dataSource={data}
                scroll={{ x: responsive ? 1500 : 0 }}
              />
              <DeleteRouteModal
                routeId={routeId ? `${routeId}` : ""}
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                onDelete={() => handleDeleteRoute(routeId)}
              />
            </ContentComponent>
          </div>
        </>
      )
      }

    </div >
  );
};

export default RoutePage;
