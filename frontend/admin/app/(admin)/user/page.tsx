"use client";
import React, { useEffect, useRef, useState } from "react";
import { Col, Flex, Row, theme, Button, Input, Table, Form, Space, Menu, Tag } from "antd";
import type { GetProp, InputRef, TableColumnsType, TableColumnType, TableProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
// import RouteModal from "@/components/modal/route";
import styles from "./route.module.css";
import { COLOR } from "@/constant/color";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { FilterDropdownProps } from "antd/es/table/interface";
import type { SorterResult } from 'antd/es/table/interface';
import { useRouter } from "next/navigation";
import {InfoCircleOutlined, SearchOutlined, SyncOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import ContentComponent from "@/components/content";
import { GET_USERS } from "@/apollo/query/user";
import AssignUserModal from "@/components/modal/user/assign";
import DeleteUserModal from "@/components/modal/user/delete";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU, LABELMENU } from "@/constant/menu";

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
  permissions: string;
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
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
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
      render: (text, record, index) => index + 1,
      // width: '5%',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      sorter: true,
      ...getColumnSearchProps('username'),
      // width: '10%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
      // width: '22%',
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      // width: '10%',
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
      // width: '25%',
      render: (_, { status, permissions }) => (
        <div>
          {Array.isArray(permissions) && permissions.length > 0 ? permissions.map((perm, index) => (
            <Tag
              key={index}
              style={{
                borderRadius: "0.2rem",
                padding: "0.15rem 0.5rem",
                fontSize: "0.8rem",
              }}
              color={perm === 'GET' ? 'blue' : perm === 'POST' ? 'green' : perm === 'PUT' ? 'orange' : perm === 'PATCH' ? 'cyan' : 'red'}
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
          <Button
            type="primary"
            onClick={() => { router.push(`/user/${record.id}/information`) }}
            style={{ width: "2.3rem", borderRadius: "0.3rem" }}
          >
            <InfoCircleOutlined />
          </Button>
          <Button
            type="primary"
            onClick={() => handleOpenModalAssign(String(record.id))}
            style={{ width: "2.3rem", borderRadius: "0.3rem", background: "#f08c00" }}
          >
            <UsergroupAddOutlined />
          </Button>
          <Button
            type="primary"
            style={{ width: "2.3rem", borderRadius: "0.3rem", background: "#22b8cf" }}
            onClick={() => handleOpenModalDelete(String(record.id), String(record.status))}
          >
            <SyncOutlined />
          </Button>

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

  const [getUsers, { loading, refetch }] = useLazyQuery(GET_USERS, {
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

  useEffect(() => {
    const fetchUsers = async () => {
      const { accessToken, expiresIn } = await fetchCookies();
      if (accessToken && expiresIn) {
        await getUsers({
          context: {
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          },
          variables: {
            input: {
              page: tableParams.pagination?.current,
              limit: tableParams.pagination?.pageSize,
              username: tableParams.filters?.username?.[0],
              email: tableParams.filters?.email?.[0],
              status: tableParams.filters?.status?.[0],
              sort_field: tableParams.sortField,
              sort_order: tableParams.sortOrder,
            }
          },
        });
      }
    };
    fetchUsers();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

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

  const handleOpenModalDelete = (id: string,status: string) => {
    setUserId(id);
    setStatusUser(status);
    setOpenModalDelete(true);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleOpenModalAssign = (userId: string) => {
    setUserId(userId);
    setRoleName(roleName);
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

  return (
    <div >
      {!checkStatusBackground ? (
        <></>
      ) : (
        <>
          <ContentComponent>
            <Table
              rowKey={(record) => record.id}
              className={styles['table-striped-rows']}
              columns={columns}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
              dataSource={data}
              style={{ marginTop: "0.5rem" }}
            />
          </ContentComponent>
          <DeleteUserModal
            userId={userId ? `${userId}` : ""}
            statusUser={statusUser}
            open={openModalDelete}
            onClose={handleCloseModalDelete}
            refetch={refetch}
          />
          <AssignUserModal
            roleName={roleName ? `${roleName}` : ""}
            userId={userId ? `${userId}` : ""}
            open={openModalAssign}
            onClose={handleCloseModalAssign}
            refetch={refetch}
          />
        </>
      )}
    </div>
  );
};

export default UserPage;
