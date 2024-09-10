'use client';

import React, { useEffect } from "react";
import { Button, Flex, Form, Input, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { COLOR } from "@/constant/color";;
import styles from "./contact.module.css";
import Paragraph from "antd/es/typography/Paragraph";
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";;
import { phoneRegex } from "@/utils/validation/phone.regex";
import { emailRegex } from "@/utils/validation/email.regex";
import useAntNotification from "@/lib/hooks/notification";
import { NOTIFICATION } from "@/constant/notification";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU } from "@/constant";

const ContactPage = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const value : MenuState ={
      keyMenu: KEYMENU.CONTACT,
    }
    dispatch(menuActions.changeInfoMenu(value))
  }, [dispatch]);

  const schema = yup
    .object({
      fullname: yup
        .string()
        .required("Please enter your fullname"),

      phone: yup
        .string()
        .matches(phoneRegex, { message: "Please enter a valid phone number" })
        .required("Please enter your phone number"),

      email: yup
        .string()
        .matches(emailRegex, { message: "Please enter a valid email" })
        .required("Please enter your email"),

      title: yup
        .string()
        .required("Please enter a title"),

      description: yup
        .string()
        .required("Please enter a description"),
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

  const { openNotificationWithIcon } = useAntNotification();

  const onFinish = async (values: any) => {
    console.log(values)
    openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "We have received your information and will get in touch with you as soon as possible.");
  };

  return (
    <Flex vertical align="center" justify="center" style={{ width: "60rem", margin: "6.5rem auto 2rem auto" }}>
      <Title level={4} style={{
        fontSize: "2rem",
        fontWeight: 700,
        color: COLOR.TEXT,
      }}>
        Contact us
      </Title>
      <div className={styles["container"]}>
        <div className={styles["info-container"]}>
          <div className={styles["sub-info"]}>
            <Title level={4} style={{ fontSize: "1.5rem", fontWeight: 700, color: COLOR.TEXT }}>
              S-Routing
            </Title>
            <Paragraph style={{ marginTop: "1.5rem" }}>
              We are happy to hear your feedback. Our customer service department is always available to respond to you as quickly as possible.
            </Paragraph>
            <Flex align="flex-start" style={{ marginTop: "3rem" }}>
              <MailOutlined style={{ fontSize: "1.7rem", width: "20%" }} />
              <div style={{ width: "80%" }}>
                <Paragraph style={{ fontWeight: "600", margin: 0 }}>Mail</Paragraph>
                <Paragraph style={{ margin: "0.5rem 0 0 0" }}>example1@gmail.com</Paragraph>
                <Paragraph style={{ margin: "0.5rem 0 0 0" }}>example1@student.hcmus.edu.vn</Paragraph>
              </div>
            </Flex>
            <Flex align="flex-start" style={{ marginTop: "3rem" }}>
              <EnvironmentOutlined style={{ fontSize: "1.7rem", width: "20%" }} />
              <div style={{ width: "80%" }}>
                <Paragraph style={{ fontWeight: "600", margin: 0 }}>Address</Paragraph>
                <Paragraph style={{ margin: "0.5rem 0 0 0" }}>19A Cong Hoa Street, Tan Binh District, Ho Chi Minh City</Paragraph>
              </div>
            </Flex>
            <Flex align="flex-start" style={{ marginTop: "3rem" }}>
              <PhoneOutlined style={{ fontSize: "1.7rem", width: "20%" }} />
              <div style={{ width: "80%" }}>
                <Paragraph style={{ fontWeight: "600", margin: 0 }}>Phone number</Paragraph>
                <Paragraph style={{ margin: "0.5rem 0 0 0" }}>+48 (56) 327-203-670</Paragraph>
                <Paragraph style={{ margin: "0.5rem 0 0 0" }}>+48 (12) 504-203-260</Paragraph>
              </div>
            </Flex>
          </div>
        </div>
        <div className={styles["contact-container"]}>
          <div className={styles["sub-contact"]}>
            <Title level={4} style={{ fontSize: "1.5rem", fontWeight: 700, color: COLOR.TEXT }}>
              Contact information
            </Title>
            <Paragraph style={{ marginTop: "1.5rem" }}>
              Thank you for visiting us. If you would like to receive information from us more easily, please fill out the form below.
            </Paragraph>
            <div className={styles["underline-css"]}></div>
            <Form
              initialValues={{ remember: true }}
              style={{
                height: "auto",
                borderRadius: "1rem",
                backgroundColor: COLOR.BACKGROUNDBODY,
                textAlign: "left",
                marginTop: "2.8rem"
              }}
              labelCol={{ style: { width: 150, textAlign: "left" } }}
              onFinish={handleSubmit(onFinish)}
            >
              {/* Fullname */}
              <Form.Item

                label="Fullname"
                name="fullname"
                style={{ paddingBottom: errors.fullname ? "1rem" : 0, marginBottom: "2rem" }}
                help={
                  errors.fullname && (
                    <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.fullname?.message}</span>
                  )
                }
              >
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      key="fullname"
                      style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
                    />
                  )}
                />
              </Form.Item>

              {/* Phone */}
              <Form.Item
                label="Phone number"
                name="phone"
                style={{ paddingBottom: errors.phone ? "1rem" : 0, marginBottom: "2rem" }}
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
                      style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
                    />
                  )}
                />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                style={{ paddingBottom: errors.email ? "1rem" : 0, marginBottom: "2rem" }}
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
                      style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
                    />
                  )}
                />
              </Form.Item>

              {/* Title */}
              <Form.Item
                label="Title"
                name="title"
                style={{ paddingBottom: errors.title ? "1rem" : 0, marginBottom: "2rem", width: "100%" }}
                help={
                  errors.title && (
                    <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.title?.message}</span>
                  )
                }
              >
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      key="title"
                      {...field}
                      style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
                    />
                  )}
                />
              </Form.Item>

              {/* Description */}
              <Form.Item
                label="Description"
                name="description"
                style={{ paddingBottom: errors.description ? "1rem" : 0, marginBottom: "2rem", width: "100%" }}
                help={
                  errors.description && (
                    <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.description?.message}</span>
                  )
                }
              >
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      showCount
                      maxLength={200}
                      key="description"
                      {...field}
                      style={{ borderRadius: "0.5rem", height: "10rem", background: "white", resize: "none", padding: "0.5rem 0.17rem 1rem 0.17rem" }}
                    />
                  )}
                />
              </Form.Item>

              {/* Button register*/}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "7rem", borderRadius: "0.5rem", height: "2.7rem", marginTop: "1.2rem", float: "right" }}
                >
                  Submit
                </Button>
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </Flex>
  );
};

export default ContactPage;
