"use client";
import { Col, Form, Row, Input, Button, Typography, Flex, Select, DatePicker, Breadcrumb } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { COLOR } from "@/constant/color";
import Title from "antd/es/typography/Title";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { useHandleError } from "@/lib/hooks/error";
import { useRouter, useSearchParams } from "next/navigation";
import ContentComponent from "@/components/content";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { menuActions, MenuState } from "@/lib/store/menu";
import { GET_USER_BY_ID } from "@/apollo/query/user";
import { KEYMENU, LABELMENU } from "@/constant/menu";
import Male from "@/public/images/homepage/male.png"
import Link from "next/link";

const UserInformationPage = ({ params }: { params: { id: string } }) => {

  const router = useRouter();
  const [usernameBreadcrumb, setUsernameBreadcrumb] = useState<string>("");

  const schema = yup
    .object({
      username: yup.string(),
      email: yup.string(),
      status: yup.string(),
      roles: yup.string(),
      permissions: yup.string(),
      fullname: yup.string(),
      phoneNumber: yup.string(),
      address: yup.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({ resolver: yupResolver(schema) });

  const { handleError } = useHandleError();

  const [getUserById] = useLazyQuery(GET_USER_BY_ID, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    onCompleted: async (data) => {
      console.log("data: ", data);
      reset({
        username: data.getUserById.data.username,
        email: data.getUserById.data.email,
        status: data.getUserById.data.active ? "Active" : "Inactive",
        roles: data.getUserById.data.roles.name,
        permissions: data.getUserById.data.roles.permissions.map((permission: { id: string, name: string }) => permission.name).join(', '),
        fullname: data.getUserById.data.fullname,
        phoneNumber: data.getUserById.data.phone_number,
        address: data.getUserById.data.address,
      });
      setUsernameBreadcrumb(data.getUserById.data.username);
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const dispatch = useAppDispatch();

  const fetchUser = async () => {
    await getUserById({
      variables: {
        id: params.id
      }
    });
  };

  useEffect(() => {
    const value: MenuState = {
      keyMenu: KEYMENU.USER,
      labelMenu: LABELMENU.USER,
    };
    dispatch(menuActions.changeInfoMenu(value));
    fetchUser();
  }, [dispatch]);


  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link href="/">Dashboard</Link>, },
          { title: <Link href="/user">List users</Link> },
          { title: usernameBreadcrumb, }
        ]}
        style={{ paddingLeft: "0.5rem", marginBottom: "1rem" }}
      />

      <ContentComponent>
        <Form onFinish={handleSubmit(onFinish)} layout="vertical" style={{ padding: "0.5rem 0.5rem 0 0.5rem" }}>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              {/* content */}
              <Row gutter={[18, 0]}>
                <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                  <Form.Item
                    label="Username"
                    name="username"
                  >
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="username"
                          {...field}
                          disabled
                          style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                  <Form.Item
                    label="Status"
                    name="status"
                  >
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="status"
                          {...field}
                          disabled
                          style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[18, 0]}>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <Form.Item
                    label="Roles"
                    name="roles"
                  >
                    <Controller
                      name="roles"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="roles"
                          {...field}
                          disabled
                          style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={16} md={16} lg={14} xl={14} xxl={14}>
                  <Form.Item
                    label="Permissions"
                    name="permissions"
                  >
                    <Controller
                      name="permissions"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="permissions"
                          {...field}
                          disabled
                          style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[18, 0]}>
                <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                  <Form.Item
                    label="Email"
                    name="email"
                  >
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="email"
                          {...field}
                          disabled
                          style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[18, 0]}>
                <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                  <Form.Item
                    label="Fullname"
                    name="fullname"
                  >
                    <Controller
                      name="fullname"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="fullname"
                          {...field}
                          disabled
                          style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[18, 0]}>
                <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                  <Form.Item
                    label="Phone number"
                    name="phoneNumber"
                  >
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="phoneNumber"
                          {...field}
                          disabled
                          style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[18, 0]}>
                <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                  <Form.Item
                    label="Address"
                    name="address"
                  >
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <Input
                          key="address"
                          {...field}
                          disabled
                          style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>

            </Col>

            <Col xs={24} sm={24} md={24} lg={1} xl={1} xxl={1}></Col>
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
              <img src={Male.src} alt="male" style={{ width: "20rem", borderRadius: "0.5rem", margin: "7rem auto" }} />
            </Col>
          </Row>
        </Form>
      </ContentComponent>
    </>
  );
};

export default UserInformationPage;
