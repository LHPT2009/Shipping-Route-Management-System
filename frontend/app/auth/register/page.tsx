"use client";
import { COLOR } from "@/constant";
import { getValueFromScreen, useScreenWidth } from "@/utils/screenUtils";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Radio,
  DatePicker,
} from "antd";
import Link from "next/link";

const { Text, Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const registerPage = () => {
  const screenWidth = useScreenWidth();

  const extraSmall = true;
  const small = true;
  const medium = false;
  const large = false;
  const extraLarge = false;
  const extraExtraLarge = false;

  const responsive = getValueFromScreen(
    screenWidth,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
  );

  const onFinish = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: !responsive ? "83vh" : "auto",
          width: "100vw",
        }}
      >
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          style={{
            width: "1000px",
            height: "auto",
            padding: "24px",
            margin: "24px",
            borderRadius: "8px",
            backgroundColor: COLOR.BACKGROUNDBODY,
          }}
          size="large"
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title level={1}>Register</Title>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ width: "100%", borderRadius: "8px" }}
                  placeholder="Username..."
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ width: "100%", borderRadius: "8px" }}
                  placeholder="Password..."
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item
                label="RePassword"
                name="rePassword"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ width: "100%", borderRadius: "8px" }}
                  placeholder="RePassword..."
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item
                label="Fullname"
                name="fullname"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ width: "100%", borderRadius: "8px" }}
                  placeholder="Fullname..."
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item label="Birthday" name="Birthday">
                <DatePicker
                  style={{ width: "50%", borderRadius: "8px" }}
                  placeholder="Birthday..."
                />
              </Form.Item>
              <Form.Item
                label="PhoneNumber"
                name="phoneNumber"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ width: "100%", borderRadius: "8px" }}
                  placeholder="PhoneNumber..."
                  prefix={<PhoneOutlined />}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input
                  style={{ width: "100%", borderRadius: "8px" }}
                  placeholder="Email..."
                  prefix={<MailOutlined />}
                />
              </Form.Item>

              <Form.Item label="Click here to complete">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", borderRadius: "8px" }}
                >
                  Submit
                </Button>
                <Text>
                  {" "}
                  back <Link href="/auth/login">login now!</Link>
                </Text>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default registerPage;
