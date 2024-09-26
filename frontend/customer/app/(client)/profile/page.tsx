'use client';

import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Flex, Form, Input, Row, Tooltip } from "antd";
import { COLOR } from "@/constant/color";;
import withRoleCheck from "@/components/auth/protection/withRoleCheck";
import withProtectedRoute from "@/components/auth/protection/withProtectedRoute";
import { UserProfilePermissions, UserProfileRoles } from "@/lib/permissions/user-profile";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { userActions, UserState } from "@/lib/store/user";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "@/apollo/mutations/auth";
import { NOTIFICATION } from "@/constant/notification";
import Male from "../../../public/images/homepage/male.png";
import { UPDATE_PROFILE } from "@/apollo/mutations/user";
import { usernameRegex } from "@/utils/validation/username.regex";
import { phoneRegex } from "@/utils/validation/phone.regex";
import ChangePasswordModal from "@/components/modal/profile";
import { CldUploadWidget } from "next-cloudinary";
import { CloseOutlined, CloudUploadOutlined, HomeOutlined } from "@ant-design/icons";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import Link from "next/link";

const ProfilePage = () => {
  const user: UserState = useAppSelector((state) => state.user);

  const [open, setOpen] = useState<boolean>(false);
  const schema = yup
    .object({
      username: yup
        .string()
        .matches(usernameRegex, { message: "Please enter a valid username" }),

      phone: yup
        .string()
        .matches(phoneRegex, { message: "Please enter a valid phone number" }),

      email: yup.string(),

      fullname: yup.string(),

      address: yup.string(),

      role: yup.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useAppDispatch();
  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [updateUserByToken, { loading }] = useMutation(UPDATE_PROFILE, {
    onCompleted: async (data) => {
      const userData: UserState = {
        username: data.updateUserByToken.data.username,
        email: user.email,
        fullname: data.updateUserByToken.data.fullname,
        address: data.updateUserByToken.data.address,
        phone: data.updateUserByToken.data.phone_number,
        role: user.role,
        img: user.img,
      }
      dispatch(userActions.setUserInformation(userData));
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "User information was updated successfully");
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        phone: user.phone,
        email: user.email,
        fullname: user.fullname,
        address: user.address,
        role: user.role,
      });
    }
  }, [user, reset]);

  const onFinish = async (values: any) => {

    await updateUserByToken({
      variables: {
        input: {
          fullname: values.fullname,
          username: values.username,
          phone_number: values.phone,
          address: values.address,
          img: user.img,
        }
      },
    });
  }

  const onClose = () => {
    setOpen(false);
  }

  const onOpen = () => {
    setOpen(true);
  }

  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  return (
    <div style={{ width: responsive ? "95%" : "75rem", margin: "6.5rem auto 2rem auto" }}>
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
        { title: 'User profile', }
        ]}
        style={{ paddingLeft: "0.5rem", marginBottom: "1rem" }}
      />
      <Form
        onFinish={handleSubmit(onFinish)}
        layout="vertical"
        style={{ padding: "0.5rem 0.5rem 0 0.5rem" }}
      >
        <Row gutter={[8, 8]} style={{ border: "1px solid #ced4da", borderRadius: "1rem", padding: "3rem 3rem 2rem 3rem" }} >

          {responsive && <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
            <img
              src={user.img ? user.img : Male.src}
              alt="male"
              style={{ width: "14rem", borderRadius: "50%", margin: "0 auto", objectFit: "cover", height: "14rem" }}
            />

            <Flex align="center" justify="center" gap="1rem"
              style={{
                margin: "2.5rem auto 0 auto",
                marginBottom: responsive ? "3rem" : "0"
              }}>
              <Tooltip placement="bottom" title="Remove current avatar">
                <Button
                  type="primary"
                  onClick={() => dispatch(userActions.setUserImg(""))}
                  style={{
                    width: "3rem",
                    height: "2.5rem",
                    borderRadius: "0.4rem",
                    background: "#e03131"
                  }}
                >
                  <CloseOutlined />
                </Button>
              </Tooltip>
              <CldUploadWidget
                uploadPreset="qacqqy78"
                onSuccess={(result: any) => {
                  const url: string = result.info.secure_url;
                  dispatch(userActions.setUserImg(url));
                }}
              >
                {({ open }) => {
                  return (
                    <Tooltip placement="bottom" title="Upload avatar">
                      <Button
                        type="primary"
                        onClick={() => open()}
                        style={{
                          width: "3rem",
                          height: "2.5rem",
                          borderRadius: "0.4rem",
                        }}
                      >
                        <CloudUploadOutlined style={{ fontSize: "1.3rem" }} />
                      </Button>
                    </Tooltip>
                  );
                }}
              </CldUploadWidget>
            </Flex>
          </Col>}

          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            {/* content */}
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Username"
                  name="username"
                  style={{ paddingBottom: errors.username ? "1rem" : 0 }}
                  help={
                    errors.username && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.username?.message}</span>
                    )
                  }
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input
                        key="username"
                        {...field}
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                      />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Role"
                  name="role"
                >
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Input
                        key="role"
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
                  style={{ paddingBottom: errors.email ? "1rem" : 0 }}
                  help={
                    errors.email && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.email?.message}</span>
                    )
                  }
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
                  name="phone"
                  style={{ paddingBottom: errors.phone ? "1rem" : 0 }}
                  help={
                    errors.phone && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.phone?.message}</span>
                    )
                  }
                >
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        key="phone"
                        {...field}
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
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                      />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

            {responsive &&
              <Flex
                align="center"
                justify="flex-end"
                gap="1rem"
                style={{ marginTop: responsive ? "2rem" : "8.05rem", marginBottom: responsive ? "1rem" : 0 }}
              >
                <Button
                  onClick={onOpen}
                  style={{ width: "50%", height: "2.7rem", borderRadius: "0.4rem", margin: "0 auto", background: "white", color: COLOR.PRIMARY, border: "1px solid #4f46e5" }}
                >
                  Change password
                </Button>
                <Button
                  loading={loading}
                  htmlType="submit"
                  type="primary"
                  style={{ width: "50%", height: "2.65rem", borderRadius: "0.4rem", margin: "0 auto" }}
                >
                  Update
                </Button>
              </Flex>}

          </Col>

          <Col xs={24} sm={24} md={24} lg={1} xl={1} xxl={1}></Col>
          {!responsive && <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
            <img
              src={user.img ? user.img : Male.src}
              alt="male"
              style={{ width: "14rem", borderRadius: "50%", margin: "0 auto", objectFit: "cover", height: "14rem" }}
            />

            <Flex align="center" justify="center" gap="1rem" style={{ margin: "2.5rem auto 0 auto" }}>
              <Tooltip placement="bottom" title="Remove current avatar">
                <Button
                  type="primary"
                  onClick={() => dispatch(userActions.setUserImg(""))}
                  style={{
                    width: "3rem",
                    height: "2.5rem",
                    borderRadius: "0.4rem",
                    background: "#e03131"
                  }}
                >
                  <CloseOutlined />
                </Button>
              </Tooltip>
              <CldUploadWidget
                uploadPreset="qacqqy78"
                onSuccess={(result: any) => {
                  const url: string = result.info.secure_url;
                  dispatch(userActions.setUserImg(url));
                }}
              >
                {({ open }) => {
                  return (
                    <Tooltip placement="bottom" title="Upload avatar">
                      <Button
                        type="primary"
                        onClick={() => open()}
                        style={{
                          width: "3rem",
                          height: "2.5rem",
                          borderRadius: "0.4rem",
                        }}
                      >
                        <CloudUploadOutlined style={{ fontSize: "1.3rem" }} />
                      </Button>
                    </Tooltip>
                  );
                }}
              </CldUploadWidget>
            </Flex>
            <Flex align="center" justify="flex-end" gap="1rem" style={{ marginTop: "8.05rem" }}>
              <Button
                onClick={onOpen}
                style={{ width: "50%", height: "2.7rem", borderRadius: "0.4rem", margin: "0 auto", background: "white", color: COLOR.PRIMARY, border: "1px solid #4f46e5" }}
              >
                Change password
              </Button>
              <Button
                loading={loading}
                htmlType="submit"
                type="primary"
                style={{ width: "50%", height: "2.65rem", borderRadius: "0.4rem", margin: "0 auto" }}
              >
                Update
              </Button>
            </Flex>
          </Col>}

          <ChangePasswordModal
            open={open}
            onClose={onClose}
          />
        </Row>

      </Form>
    </div>
  );
};

export default withProtectedRoute(withRoleCheck(ProfilePage, UserProfileRoles, UserProfilePermissions));
