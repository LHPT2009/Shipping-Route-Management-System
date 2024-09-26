"use client";
import { Col, Form, Row, Input, Button, Typography, Flex, Tooltip, Breadcrumb } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { COLOR } from "@/constant/color";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_ROUTE_BY_ID } from "@/apollo/query/route";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { RouteInterface, ShippingTypeEnum, StatusEnum, VehicleTypeEnum } from "./route.interface";
import { useRouter } from "next/navigation";
import moment from 'moment';
import MapComponent from "@/components/route/map";
import withRoleCheck from "@/components/auth/protection/withRoleCheck";
import withProtectedRoute from "@/components/auth/protection/withProtectedRoute";
import { RoutePermissions, RouteRoles } from "@/lib/permissions/route";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";

const { Text } = Typography;

const RouteDetailPage = ({ params }: { params: { id: string } }) => {

  const router = useRouter();

  const schema = yup
    .object({
      name: yup.string(),
      distance: yup.string(),
      status: yup.string(),
      departureTime: yup.string(),
      arrivalTime: yup.string(),
      departureLocation: yup.string(),
      arrivalLocation: yup.string(),
      departureAddress: yup.string(),
      arrivalAddress: yup.string(),
      shippingType: yup.string(),
      vehicleType: yup.string(),
      vehicleName: yup.string(),
      lisencePlate: yup.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const [route, setRoute] = useState<RouteInterface>();

  const [isShowDirection, setIsShowDirection] = useState(false);

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [getRouteById, { data, loading }] = useLazyQuery(GET_ROUTE_BY_ID, {
    onCompleted: async (data) => {
      setRoute(data.getRoute.data);
      console.log("route", route);
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  useEffect(() => {
    const fetchRoutes = async () => {
      await getRouteById({
        variables: {
          input: params.id
        },
      });
    };
    fetchRoutes();
    if (route) {
      reset({
        name: route.name,
        distance: `${route.distance} km`,
        status: StatusEnum[route.status],
        departureTime: moment(route.departure_time).format('HH:mm - DD/MM/YYYY'),
        arrivalTime: moment(route.arrival_time).format('HH:mm - DD/MM/YYYY'),
        departureLocation: route.departure.name,
        arrivalLocation: route.arrival.name,
        departureAddress: route.departure.address,
        arrivalAddress: route.arrival.address,
        shippingType: ShippingTypeEnum[route.transport.shipping_type],
        vehicleType: VehicleTypeEnum[route.transport.vehicle_type],
        vehicleName: route.transport.name,
        lisencePlate: route.transport.license_plate,
      });
    }
  }, [route, reset]);


  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  return (

    <div style={{ margin: "6.5rem auto 2rem auto", width: responsive ? "90%" : "80rem", }}>
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
        { title: <Link href="/route">List routes</Link> },
        { title: route?.name, }
        ]}
        style={{ paddingLeft: "0.5rem", marginBottom: "1.5rem" }}
      />
      <Form onFinish={handleSubmit(onFinish)} layout="vertical" >
        <Row gutter={[8, 8]} style={{
          border: "1px solid #ced4da",
          borderRadius: "1rem",
          padding: responsive ? "1.5rem" : "3rem 3rem 2rem 3rem"
        }}>
          {responsive && <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <MapComponent
              isShowDirection={isShowDirection}
              departure={[route?.departure.longitude!, route?.departure.latitude!]}
              arrival={[route?.arrival.longitude!, route?.arrival.latitude!]}
              heightProps="25em"
            />
            <Flex align="center" justify="center" style={{marginBottom: "2rem"}}>
              {route && ShippingTypeEnum[route.transport.shipping_type] === "Seaway" ?
                <Tooltip placement="bottom" title="Map is inavailable with seaway">
                  <Button
                    disabled
                    onClick={() => {
                      setIsShowDirection(true);
                    }}
                    style={{
                      padding: "1.3rem 1.5rem",
                      borderRadius: "0.4rem",
                      margin: "0 auto",
                    }}
                  >
                    View on map
                  </Button>
                </Tooltip> : <Button
                  onClick={() => {
                    setIsShowDirection(true);
                  }}
                  style={{
                    padding: "1.3rem 1.5rem",
                    borderRadius: "0.4rem",
                    margin: "0 auto",
                    color: COLOR.PRIMARY,
                    border: "1px solid #4f46e5",
                    background: "white"
                  }}
                >
                  View on map
                </Button>}
            </Flex>
          </Col>}
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            {/* content */}
            <Row gutter={[18, 0]}>

              <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="Name"
                  name="name"
                >
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="name" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={7} xl={7} xxl={7}>
                <Form.Item
                  label="Distance"
                  name="distance"
                >
                  <Controller
                    name="distance"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="distance" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={7} xl={7} xxl={7}>
                <Form.Item
                  label="Status"
                  name="status"
                >
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="status" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Departure time"
                  name="departureTime"
                >
                  <Controller
                    name="departureTime"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="departureTime" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Arrival time"
                  name="arrivalTime"
                >
                  <Controller
                    name="arrivalTime"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="arrivalTime" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                <Form.Item
                  label="Departure"
                  name="departureLocation"
                >
                  <Controller
                    name="departureLocation"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="departureLocation" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                <Form.Item
                  label="Departure address"
                  name="departureAddress"
                >
                  <Controller
                    name="departureAddress"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="departureAddress" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                <Form.Item
                  label="Arrival"
                  name="arrivalLocation"
                >
                  <Controller
                    name="arrivalLocation"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="arrivalLocation" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={22} xl={22} xxl={22}>
                <Form.Item
                  label="Arrival address"
                  name="arrivalAddress"
                >
                  <Controller
                    name="arrivalAddress"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="arrivalAddress" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Shipping type"
                  name="shippingType"
                >
                  <Controller
                    name="shippingType"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="shippingType" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Vehicle type"
                  name="vehicleType"
                >
                  <Controller
                    name="vehicleType"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="vehicleType" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[18, 0]}>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Vehicle name"
                  name="vehicleName"
                >
                  <Controller
                    name="vehicleName"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="vehicleName" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Lisence plate"
                  name="lisencePlate"
                >
                  <Controller
                    name="lisencePlate"
                    control={control}
                    render={({ field }) => (
                      <Input disabled key="lisencePlate" {...field} style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>

          </Col>

          {!responsive && <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <MapComponent
              isShowDirection={isShowDirection}
              departure={[route?.departure.longitude!, route?.departure.latitude!]}
              arrival={[route?.arrival.longitude!, route?.arrival.latitude!]}
            />
            <Flex align="center" justify="center">
              {route && ShippingTypeEnum[route.transport.shipping_type] === "Seaway" ?
                <Tooltip placement="bottom" title="Map is inavailable with seaway">
                  <Button
                    disabled
                    onClick={() => {
                      setIsShowDirection(true);
                    }}
                    style={{
                      padding: "1.3rem 1.5rem",
                      borderRadius: "0.4rem",
                      margin: "0 auto",
                    }}
                  >
                    View on map
                  </Button>
                </Tooltip> : <Button
                  onClick={() => {
                    setIsShowDirection(true);
                  }}
                  style={{
                    padding: "1.3rem 1.5rem",
                    borderRadius: "0.4rem",
                    margin: "0 auto",
                    color: COLOR.PRIMARY,
                    border: "1px solid #4f46e5",
                    background: "white"
                  }}
                >
                  View on map
                </Button>}
            </Flex>
          </Col>}

        </Row>
      </Form>
    </div>
  );
};

export default withProtectedRoute(withRoleCheck(RouteDetailPage, RouteRoles, RoutePermissions));
