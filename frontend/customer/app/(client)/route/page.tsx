"use client";
import React, { useEffect, useRef, useState } from "react";
import { Flex, theme, Button, Input, Table, Form, Space, Menu, Tag, Tooltip, Breadcrumb, Row, Col } from "antd";
import type { GetProp, InputRef, TableColumnType, TableProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import styles from "./route.module.css";
import { COLOR } from "@/constant/color";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_ROUTES } from "@/apollo/query/route";
import { FilterDropdownProps } from "antd/es/table/interface";
import { ExportOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import type { SorterResult } from 'antd/es/table/interface';
import { useRouter, useSearchParams } from "next/navigation";
import MapIcon from "@/public/svg/route/map.svg";
import CustomModal from "@/components/modal/route";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU } from "@/constant";
import withProtectedRoute from "@/components/auth/protection/withProtectedRoute";
import withRoleCheck from "@/components/auth/protection/withRoleCheck";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RoutePermissions, RouteRoles } from "@/lib/permissions/route";
import Link from "next/link";
import Paragraph from "antd/es/typography/Paragraph";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import * as XLSX from 'xlsx'; import { LOGOUT } from "@/apollo/query/auth";

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

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (isLogin) {
      const nameRole: string = user.role;
      const namePermission: string[] = user.permissions;
      if (!RouteRoles.includes(nameRole) || !RoutePermissions.some((permission) => namePermission.includes(permission))) {
        router.push('/unauthorized');
      }
    }
  }, [user.role, user.permissions]);

  useEffect(() => {
    const value: MenuState = {
      keyMenu: KEYMENU.ROUTE,
    }
    dispatch(menuActions.changeInfoMenu(value))
  }, [dispatch]);

  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [departure, setDeparture] = useState<number[]>([]);
  const [arrival, setArrival] = useState<number[]>([]);

  const [data, setData] = useState<DataType[]>([]);
  const searchParams = useSearchParams();
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
      total: 0,
    },
  });
  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
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
      width: '5%',
      sorter: true,
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
      width: '20%',
    },
    {
      title: 'Arrival',
      dataIndex: 'arrival',
      key: 'arrival',
      sorter: true,
      ...getColumnSearchProps('arrival'),
      width: '20%',
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
            onClick={() => router.push(`/route/${record.id}`)}
            style={{ border: "0.5px solid #4f46e5", color: COLOR.PRIMARY, padding: "0.9rem 1.2rem", borderRadius: "0.3rem", fontSize: "0.9rem", background: "white" }}
          >
            Detail
          </Button>

          {record.shipping_type === "Seaway" ? (
            <Tooltip placement="bottom" title="Map is inavailable with seaway">
              <Button
                type="primary"
                disabled={record.shipping_type === "Seaway"}
                onClick={() => {
                  const getDataById = data.find((item, index) => item.id === record.id)
                  if (getDataById) {
                    setDeparture([getDataById?.departure_longitude!, getDataById?.departure_latitude!])
                    setArrival([getDataById?.arrival_longitude!, getDataById?.arrival_latitude!])
                  }
                  handleOpen();
                }}
                style={{ borderRadius: "0.3rem", fontSize: "0.9rem" }}
              >
                <img src={MapIcon.src} style={{ width: "1.1rem", height: "2rem" }} />
              </Button>
            </Tooltip>
          ) : <Button
            type="primary"
            onClick={() => {
              const getDataById = data.find((item, index) => item.id === record.id)
              if (getDataById) {
                setDeparture([getDataById?.departure_longitude!, getDataById?.departure_latitude!])
                setArrival([getDataById?.arrival_longitude!, getDataById?.arrival_latitude!])
              }
              handleOpen();
            }}
            style={{ borderRadius: "0.3rem", fontSize: "0.9rem" }}
          >
            <img src={MapIcon.src} style={{ width: "1.1rem", height: "2rem" }} />
          </Button>}

        </Flex>
      ),
    },

  ];

  const { handleError } = useHandleError();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [search, setSearch] = useState<string>(searchParams.get("search") || "");

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
    fetchPolicy: "cache-and-network",
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

    // Remove empty parameters
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

  return (
    <>
      {!checkStatusBackground ? (
        <></>
      ) : (
        <div style={{ width: "90%", margin: "6.5rem auto 2rem auto" }}>
          <Breadcrumb
            items={[{
              title: (
                <Link href="/">
                  <Flex align="center" gap="0.5rem">
                    <HomeOutlined />
                    <span>Homepage</span>
                  </Flex>
                </Link>
              )
            },
            { title: 'List routes', }
            ]}
            style={{ paddingLeft: "0.5rem" }}
          />
          <Row style={{ marginTop: "20px" }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Flex justify="start">
                <Form
                  initialValues={{ remember: true }}
                  style={{
                    // width: responsive ? "60%" : "28rem",
                    width: "28rem",
                    borderRadius: "1rem",
                    backgroundColor: COLOR.BACKGROUNDBODY,
                    textAlign: "left",
                    marginBottom: "0",
                  }}
                  onFinish={handleSubmit(onFinish)}
                >
                  <Form.Item
                    name="search"
                    style={{ paddingBottom: errors.search ? "1rem" : 0 }}
                    help={
                      errors.search && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.search?.message}</span>
                      )
                    }
                  >
                    <Controller
                      name="search"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="search"
                          {...field}
                          placeholder={responsive ? "Search for location" : "Search for route name, departure, arrival"}
                          prefix={<SearchOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                          style={{ borderRadius: "0.4rem", height: "3rem", background: "white" }}
                        />
                      )}
                    />
                  </Form.Item>
                </Form>
              </Flex>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Flex justify="end">
                <Tag color="geekblue"
                  style={{
                    padding: "0 1rem",
                    height: "3rem",
                    borderRadius: "0.4rem",
                    paddingTop: 0,
                    display: "flex", alignItems: "center",
                    marginBottom: responsive ? "1.5rem" : 0,
                  }}
                >
                  <Paragraph style={{ color: COLOR.PRIMARY, fontWeight: 500, margin: 0 }}>{`Total routes: ${tableParams.pagination?.total}`} </Paragraph>
                </Tag>
                <Button
                  type="primary"
                  onClick={() => exportToExcel(data, 'routes')}
                  style={{ color: "white", borderRadius: "0.4rem", height: "3rem" }}
                >
                  <ExportOutlined />
                  Export to Excel
                </Button>
              </Flex>
            </Col>
          </Row>
          {/* <Flex justify="space-between" align="flex-start" style={{ marginTop: "1.5rem" }}>
            <Form
              initialValues={{ remember: true }}
              style={{
                width: responsive ? "60%" : "28rem",
                borderRadius: "1rem",
                backgroundColor: COLOR.BACKGROUNDBODY,
                textAlign: "left",
                marginBottom: "0",
              }}
              onFinish={handleSubmit(onFinish)}
            >
              <Form.Item
                name="search"
                style={{ paddingBottom: errors.search ? "1rem" : 0 }}
                help={
                  errors.search && (
                    <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.search?.message}</span>
                  )
                }
              >
                <Controller
                  name="search"
                  control={control}
                  render={({ field }) => (
                    <Input
                      key="search"
                      {...field}
                      placeholder={responsive ? "Search for location" : "Search for route name, departure, arrival"}
                      prefix={<SearchOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                      style={{ borderRadius: "0.4rem", height: "3rem", background: "white" }}
                    />
                  )}
                />
              </Form.Item>
            </Form>

            <Flex gap="0.5rem">
              <Tag color="geekblue"
                style={{
                  padding: "0 1rem",
                  height: "3rem",
                  borderRadius: "0.4rem",
                  paddingTop: 0,
                  display: "flex", alignItems: "center",
                  marginBottom: responsive ? "1.5rem" : 0,
                }}
              >
                <Paragraph style={{ color: COLOR.PRIMARY, fontWeight: 500, margin: 0 }}>{`Total routes: ${tableParams.pagination?.total}`} </Paragraph>
              </Tag>
              <Button
                type="primary"
                onClick={() => exportToExcel(data, 'routes')}
                style={{ color: "white", borderRadius: "0.4rem", height: "3rem" }}
              >
                <ExportOutlined />
                Export to Excel
              </Button>
            </Flex>
          </Flex> */}

          <Table
            rowKey={(record) => record.id}
            className={responsive ? styles['table-striped-rows-responsive'] : styles['table-striped-rows']}
            columns={columns}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            dataSource={data}
            scroll={responsive ? { x: 'max-content' } : undefined}
          />
        </div >
      )}

      {
        data && data.length !== 0 && departure.length != 0 && arrival.length != 0 && (
          <CustomModal
            open={open}
            onClose={handleClose}
            departure={departure}
            arrival={arrival}
          />
        )
      }
    </>
  );
};

export default withProtectedRoute(withRoleCheck(RoutePage, RouteRoles, RoutePermissions));
