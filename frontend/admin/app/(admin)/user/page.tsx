"use client";
import React, { useEffect, useRef, useState } from "react";
import { Flex, theme, Button, Input, Table, Form, Space, Menu, Tag, Breadcrumb, Tooltip, Col, Row } from "antd";
import type { GetProp, InputRef, TableColumnType, TableProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
// import RouteModal from "@/components/modal/route";
import styles from "./route.module.css";
import { COLOR } from "@/constant/color";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { FilterDropdownProps } from "antd/es/table/interface";
import type { SorterResult } from 'antd/es/table/interface';
import { useRouter, useSearchParams } from "next/navigation";
import { ExportOutlined, InfoCircleOutlined, SearchOutlined, SyncOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import ContentComponent from "@/components/content";
import { GET_USERS } from "@/apollo/query/user";
import AssignUserModal from "@/components/modal/user/assign";
import DeleteUserModal from "@/components/modal/user/delete";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU, LABELMENU } from "@/constant/menu";
import Link from "next/link";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import { Content } from "antd/es/layout/layout";
import * as XLSX from 'xlsx';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const { Search } = Input;

type RecordType = {
  id: string;
  roles: {
    id: string;
  };
};

type OnChange = NonNullable<TableProps<DataType>["onChange"]>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  id: number;
  username: string;
  email: string;
  roles: string;
  permissions: string[];
  status: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

type DataIndex = keyof DataType;

const UserPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const [data, setData] = useState<DataType[]>([]);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");
  const [tableParams, setTableParams] = useState<TableParams>({
    filters: {
      username: [searchParams.get("username") || ""],
      email: [searchParams.get("email") || ""],
    },
    pagination: {
      current: Number(searchParams.get("page")) || 1,
      pageSize: Number(searchParams.get("page-size")) || 20,
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
      key: 'Active',
      label: 'Active',
    },
    {
      key: 'Inactive',
      label: 'Inactive',
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      width: '10%',
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      render: (_, { roles }) => (
        <Tag
          style={{ borderRadius: "0.2rem", padding: "0.15rem 0.5rem", fontSize: "0.8rem" }}
          color={roles === 'CUSTOMER' ? 'purple' : 'magenta'} key={roles}
        >
          {roles}
        </Tag>
      )
    },
    {
      title: 'Permission',
      dataIndex: 'permissions',
      key: 'permissions',
      width: '25%',
      render: (_, { status, permissions }) => (
        <div>
          {Array.isArray(permissions) && permissions.length > 0 ? permissions.map((perm, index) => (
            <Tag
              key={index}
              style={{
                borderRadius: "0.2rem",
                padding: "0.15rem 0.5rem",
                fontSize: "0.8rem",
                marginBottom: "0.5rem"
              }}
              color={
                perm.toLowerCase().includes("read") ? 'blue'
                  : perm.toLowerCase().includes("create") ? 'green'
                    : perm.toLowerCase().includes("update") ? 'orange'
                      : 'red'
              }
            >
              {perm}
            </Tag>
          )) : 'No Permissions'}
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      // width: '10%',
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
        <Tag style={{ borderRadius: "0.2rem", padding: "0.15rem 0.7rem" }} color={status === 'Active' ? 'cyan' : 'red'} key={status}>
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
          <Tooltip placement="bottom" title="User details">
            <Button
              type="primary"
              onClick={() => { router.push(`/user/${record.id}`) }}
              style={{ width: "2.3rem", borderRadius: "0.3rem" }}
            >
              <InfoCircleOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="bottom" title="Assign roles to user">
            <Button
              type="primary"
              onClick={() => handleOpenModalAssign(String(record.id), String(record.roles))}
              style={{ width: "2.3rem", borderRadius: "0.3rem", background: "#f08c00" }}
            >
              <UsergroupAddOutlined />
            </Button>
          </Tooltip>

          <Tooltip placement="bottom" title="Change account status">
            <Button
              type="primary"
              style={{ width: "2.3rem", borderRadius: "0.3rem", background: "#22b8cf" }}
              onClick={() => handleOpenModalDelete(String(record.id), String(record.status))}
            >
              <SyncOutlined />
            </Button>
          </Tooltip>

        </Flex>
      ),
    },

  ];

  const [openModalAssign, setOpenModalAssign] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [userId, setUserId] = useState("");
  const [statusUser, setStatusUser] = useState("");
  const [roleName, setRoleName] = useState("");

  const { handleError } = useHandleError();

  const exportToExcel = (data: DataType[], fileName: string) => {
    const modifiedData = data.map((item: DataType) => ({
      ...item,
      permissions: item.permissions.join('\r\n'),
    }));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(modifiedData);
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const maxWidths = modifiedData.reduce((widths: number[], row: any) => {
      headers.forEach((header, index) => {
        widths[index] = Math.max(widths[index] || 0, header.length);
      });
      Object.keys(row).forEach((key: string, index: number) => {
        const value = row[key as keyof DataType] ? row[key as keyof DataType].toString() : '';
        widths[index] = Math.max(widths[index] || 10, value.length + 4);
      });
      return widths;
    }, []);

    // Set column widths
    worksheet['!cols'] = maxWidths.map((width: any) => ({ wch: width }));

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const [getUsers, { loading, refetch }] = useLazyQuery(GET_USERS, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      setData(data.getUsers.data.users);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: data.getUsers.data.total,
        },
      });

    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const fetchUsers = async () => {
    await getUsers({
      variables: {
        input: {
          page: tableParams.pagination?.current,
          limit: tableParams.pagination?.pageSize,
          search: search,
          username: tableParams.filters?.username?.[0],
          email: tableParams.filters?.email?.[0],
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
    fetchUsers();
  }, [
    search,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

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
    newSearchParams.set('username', String(filters.username?.[0] || ''));
    newSearchParams.set('email', String(filters.email?.[0] || ''));

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

  const handleOpenModalDelete = (id: string, status: string) => {
    setUserId(id);
    setStatusUser(status);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenModalAssign = (userId: string, role: string) => {
    setUserId(userId);
    setRoleName(role);
    setOpenModalAssign(true);
  };

  const handleCloseModalAssign = () => {
    setOpenModalAssign(false);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    const value: MenuState = {
      keyMenu: KEYMENU.USER,
      labelMenu: LABELMENU.USER,
    };
    dispatch(menuActions.changeInfoMenu(value));
  }, [dispatch]);

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

  return (
    <div >
      {!checkStatusBackground ? (
        <></>
      ) : (
        <div>
          <Content style={{ marginInlineStart: responsive ? 20 : 215, marginTop: responsive ? "190px" : "70px" }}>
            <Breadcrumb
              items={[
                { title: <Link href="/">Dashboard</Link>, },
                { title: 'List users', }
              ]}
              style={{
                paddingLeft: "0.5rem", marginBottom: "1rem"
              }}
            />
          </Content>

          <ContentComponent>
            <Row>
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
                            placeholder={"Search for username and email"}
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
                <Flex justify="flex-end">
                  <Button
                    type="primary"
                    onClick={() => exportToExcel(data, 'users')}
                    style={{ color: "white", borderRadius: "0.4rem", height: "2.8rem" }}
                  >
                    <ExportOutlined />
                    Export to Excel
                  </Button>
                </Flex>
              </Col>
            </Row>
            <Table
              rowKey={(record) => record.id}
              className={styles['table-striped-rows']}
              columns={columns}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
              dataSource={data}
              style={{ marginTop: "0.5rem" }}
              scroll={{ x: responsive ? 1500 : 0 }}
            />
          </ContentComponent>
          <DeleteUserModal
            userId={userId ? `${userId}` : ""}
            statusUser={statusUser}
            open={openModalDelete}
            onClose={handleCloseModalDelete}
            refetch={fetchUsers}
          />
          <AssignUserModal
            roleName={roleName ? `${roleName}` : ""}
            userId={userId ? `${userId}` : ""}
            open={openModalAssign}
            onClose={handleCloseModalAssign}
            refetch={fetchUsers}
          />
        </div>
      )}
    </div>
  );
};

export default UserPage;
