"use client";
import { Col, Form, Row, Input, Button, Typography, Flex } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "@/components/modal/route";
import { COLOR } from "@/constant/color";
import Title from "antd/es/typography/Title";


const { Text } = Typography;
const routeDetailPage = ({ params }: { params: { id: string } }) => {
  const schema = yup
    .object({
      username: yup.string().required("Please enter your username"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ margin: "6.5rem auto 2rem auto", width: "80rem", }}>
      <Form onFinish={handleSubmit(onFinish)} layout="vertical" >
        <Title level={4} style={{
          fontSize: "2rem",
          fontWeight: 700,
          color: COLOR.TEXT,
          textAlign: "center",
          marginBottom: "3rem"
        }}>
          Route details
        </Title>
        <Row gutter={[8, 8]} style={{ border: "1px solid #ced4da", borderRadius: "1rem", padding: "3rem 3rem 2rem 3rem" }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            {/* content */}
            <Row gutter={[18, 0]}>

              <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={7} xl={7} xxl={7}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={7} xl={7} xxl={7}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
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
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
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
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
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
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Username"
                  name="username"
                >
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="username" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <div style={{ height: "32rem", backgroundColor: "pink", marginBottom: "2rem", marginTop: "0.6rem" }}></div>
            <Flex align="center" justify="center">
              <Button
                type="primary"
                // onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                style={{ padding: "1.3rem 1.5rem", borderRadius: "0.4rem", margin: "0 auto" }}
              >
                View location
              </Button>
            </Flex>
            <Flex align="center" justify="flex-end" gap="1rem" style={{ marginTop: "8.85rem" }}>

                <Button
                  style={{ width: "50%", height: "2.7rem", borderRadius: "0.4rem", margin: "0 auto", background: "white", color: COLOR.PRIMARY, border: "1px solid #4f46e5" }}
                >
                  Back to routes
                </Button>



                <Button
                  type="primary"
                  style={{ width: "50%", height: "2.6rem", borderRadius: "0.4rem", margin: "0 auto" }}
                >
                  Update
                </Button>


            </Flex>

          </Col>
        </Row>
      </Form>
      <CustomModal open={open} onClose={handleClose} />
    </div>
  );
};

export default routeDetailPage;
