"use client";
import { Col, Form, Row, Input, Button, Typography, Flex, Select, DatePicker } from "antd";
import { Controller, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { COLOR } from "@/constant/color";
import Title from "antd/es/typography/Title";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_ROUTE_BY_ID } from "@/apollo/query/route";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { RouteInterface, ShippingTypeEnum, StatusEnum, VehicleTypeEnum } from "../route.interface";
import { useRouter } from "next/navigation";
import moment from 'moment';
import MapComponent from "@/components/map";
import ContentComponent from "@/components/content";
import { GET_LOCATIONS, GET_TRANSPORTS } from "@/apollo/query/location";
import { LocationInterface } from "./location.interface";
import { calculateRouteDistances } from "@/utils/distance/calculate.distance";

const { Text } = Typography;

const RouteDetailPage = ({ params }: { params: { id: string } }) => {

  const router = useRouter();

  const schema = yup
    .object({
      name: yup.string().required("Please enter route name"),
      distance: yup.number(),
      status: yup.string(),
      departureTime: yup.string().required("Please choose departure time"),
      arrivalTime: yup.string().required("Please choose arrival time"),
      departureLocation: yup.string().required("Please choose departure location"),
      arrivalLocation: yup.string().required("Please choose arrival location"),
      departureAddress: yup.string(),
      arrivalAddress: yup.string(),
      shippingType: yup.string().required("Please choose shipping type"),
      vehicleType: yup.string().required("Please choose vehicle type"),
      vehicleName: yup.string().required("Please choose vehicle name"),
      lisencePlate: yup.string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = async (values: any) => {
    console.log("finished value: ", values);
    // console.log(VehicleTypeEnum[values.vehicleType] )
  };

  // const [route, setRoute] = useState<RouteInterface>();

  const [isShowDirection, setIsShowDirection] = useState(false);
  const [location, setLocations] = useState<LocationInterface[]>([]);
  const [transport, setTransports] = useState<{ name: string; license_plate: string; shipping_type: string; vehicle_type: string }[]>([]);
  const [optionLocation, setOptionLocation] = useState<{ value: string, label: string }[]>([]);
  const { openNotificationWithIcon } = useAntNotification();

  const [vehicleTypeOption, setVehicleTypeOption] = useState<{ value: string, label: string }[]>([]);
  const [vehicleNameOption, setVehicleNameOption] = useState<{ value: string, label: string }[]>([]);

  const { handleError } = useHandleError();

  const [getLocations, { loading }] = useLazyQuery(GET_LOCATIONS, {
    onCompleted: async (data) => {
      setLocations(data.getLocations.data);
      setOptionLocation(data.getLocations.data.map((item: LocationInterface) => {
        return {
          value: item.id,
          label: item.name,
        };
      }));
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const [getTransports] = useLazyQuery(GET_TRANSPORTS, {
    onCompleted: async (data) => {
      setTransports(data.getTransports.data);
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  useEffect(() => {
    const fetchLocations = async () => {
      const { accessToken, expiresIn } = await fetchCookies();
      if (accessToken && expiresIn) {
        // await getRouteById({
        //   context: {
        //     headers: {
        //       authorization: `Bearer ${accessToken}`
        //     }
        //   },
        //   variables: {
        //     input: params.id
        //   },
        // });

        await getLocations({
          context: {
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          }
        });

        await getTransports({
          context: {
            headers: {
              authorization: `Bearer ${accessToken}`
            }
          }
        });
      }
    };
    fetchLocations();
    if (location) {
      reset({
        distance: 0,
        status: StatusEnum[0],
        departureAddress: "Auto filled",
        arrivalAddress: "Auto filled",
        lisencePlate: "Auto filled",
      });
    }
  }, [location, reset]);

  const handleChangeLocation = (value: string, type: string) => {
    const currentValues = getValues();
    if (type === "departure") {
      reset({
        ...currentValues,
        departureLocation: value,
        departureAddress: location.find((item) => item.id.toString() === value.toString())?.address,
      });
    } else {
      reset({
        ...currentValues,
        arrivalLocation: value,
        arrivalAddress: location.find((item) => item.id.toString() === value.toString())?.address,
      });
    }

    const lastValues = getValues();
    if (lastValues.departureLocation !== undefined && lastValues.arrivalLocation !== undefined) {
      const departureCoordiante = location.find((item) => item.id.toString() === lastValues.departureLocation.toString());
      const arrivalCoordiante = location.find((item) => item.id.toString() === lastValues.arrivalLocation.toString());
      const distance = calculateRouteDistances(departureCoordiante?.latitude!, departureCoordiante?.longitude!, arrivalCoordiante?.latitude!, arrivalCoordiante?.longitude!);
      reset({
        ...lastValues,
        distance: distance,
      });
    }

  };

  const handleChangeShippingType = (value: string) => {
    const currentValues = getValues();
    reset({
      ...currentValues,
      shippingType: value,
    });
    if (transport.length > 0) {
      const matchingItems = transport.filter((item: any) => item.shipping_type?.toString() === value);
      const uniqueVehicleTypes = Array.from(new Set(matchingItems.map((item: any) => item.vehicle_type)));
      const formattedVehicleTypes = uniqueVehicleTypes.map((type, index) => ({
        value: value === "1" ? (index + 3).toString() : index.toString(),
        label: VehicleTypeEnum[type],
      }));
      console.log("shipping type: ", formattedVehicleTypes)

      setVehicleTypeOption(formattedVehicleTypes);
    }
  };

  const handleChangeVehicleType = (value: string) => {
    const currentValues = getValues();
    reset({
      ...currentValues,
      vehicleType: value,
    });
    if (transport.length > 0) {
      const matchingItems = transport.filter((item: any) => item.shipping_type?.toString() === currentValues.shippingType && item.vehicle_type?.toString() === value);
      const uniqueVehicleNames = Array.from(new Set(matchingItems.map((item: any) => item.name)));
      const formattedVehicleNames = uniqueVehicleNames.map((type, index) => ({
        value: type,
        label: type,
      }));
      console.log("vehicle type: ", matchingItems)
      setVehicleNameOption(formattedVehicleNames);
    }
  };


  const handleChangeVehicleName = (value: string) => {
    const currentValues = getValues();
    reset({
      ...currentValues,
      vehicleName: value,
      lisencePlate: transport.find((item) => item.name === value)?.license_plate!,
    });
  };

  return (
    <ContentComponent>
      <Form onFinish={handleSubmit(onFinish)} layout="vertical" style={{ padding: "0.5rem 0.5rem 0 0.5rem" }}>
        <Title level={4} style={{
          fontSize: "1.3rem",
          fontWeight: 700,
          color: COLOR.TEXT,
          marginBottom: "1.5rem",
        }}>
          Create new route
        </Title>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            {/* content */}
            <Row gutter={[18, 0]}>

              <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="Name"
                  name="name"
                  style={{
                    paddingBottom: errors.name ? "1rem" : 0,
                  }}
                  help={
                    errors.name && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.name?.message}
                      </span>
                    )
                  }
                >
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        key="name"
                        {...field}
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        placeholder="Enter route name"
                      />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={7} xl={7} xxl={7}>
                <Form.Item
                  label="Distance (km)"
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
                      <Input
                        disabled
                        key="status" {...field}
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                      />
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
                  style={{
                    paddingBottom: errors.departureTime ? "1rem" : 0,
                  }}
                  help={
                    errors.departureTime && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.departureTime?.message}
                      </span>
                    )
                  }
                >
                  <Controller
                    name="departureTime"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        showTime
                        format="HH:mm | YYYY-MM-DD"
                        key="departureTime"
                        {...field}
                        style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        placeholder="Select departure time"
                      />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Arrival time"
                  name="arrivalTime"
                  style={{
                    paddingBottom: errors.arrivalTime ? "1rem" : 0,
                  }}
                  help={
                    errors.arrivalTime && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.arrivalTime?.message}
                      </span>
                    )
                  }
                >
                  <Controller
                    name="arrivalTime"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        showTime
                        format="HH:mm | YYYY-MM-DD"
                        key="arrivalTime"
                        {...field}
                        style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        placeholder="Select arrival time"
                      />
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
                  style={{
                    paddingBottom: errors.departureLocation ? "1rem" : 0,
                  }}
                  help={
                    errors.departureLocation && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.departureLocation?.message}
                      </span>
                    )
                  }
                >
                  <Controller
                    name="departureLocation"
                    control={control}
                    render={({ field }) => (
                      <Select
                        loading={loading}
                        key="departureLocation"
                        {...field}
                        // onChange={handleChangeDeparture}
                        onChange={(value) => handleChangeLocation(value, 'departure')}
                        showSearch
                        placeholder="Search to select departure location"
                        optionFilterProp="label"
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={optionLocation}
                      />
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
                  style={{
                    paddingBottom: errors.arrivalLocation ? "1rem" : 0,
                  }}
                  help={
                    errors.arrivalLocation && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.arrivalLocation?.message}
                      </span>
                    )
                  }
                >
                  <Controller
                    name="arrivalLocation"
                    control={control}
                    render={({ field }) => (
                      <Select
                        loading={loading}
                        key="arrivalLocation"
                        {...field}
                        // onChange={handleChangeArrival}
                        onChange={(value) => handleChangeLocation(value, 'arrival')}
                        showSearch
                        placeholder="Search to select arrival location"
                        optionFilterProp="label"
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={optionLocation}
                      />
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
                      <Input
                        disabled
                        key="arrivalAddress"
                        {...field}
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }} />
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
                  style={{
                    paddingBottom: errors.shippingType ? "1rem" : 0,
                  }}
                  help={
                    errors.shippingType && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.shippingType?.message}
                      </span>
                    )
                  }
                >
                  <Controller
                    name="shippingType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        key="shippingType"
                        {...field}
                        placeholder="Select shipping type"
                        onChange={handleChangeShippingType}
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        options={[
                          { value: '0', label: 'Road' },
                          { value: '1', label: 'Seaway' },
                        ]}
                      />
                    )}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={11} xl={11} xxl={11}>
                <Form.Item
                  label="Vehicle type"
                  name="vehicleType"
                  style={{
                    paddingBottom: errors.vehicleType ? "1rem" : 0,
                  }}
                  help={
                    errors.vehicleType && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.vehicleType?.message}
                      </span>
                    )
                  }
                >
                  <Controller
                    name="vehicleType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        key="vehicleType"
                        {...field}
                        placeholder="Select vehicle type"
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        onChange={handleChangeVehicleType}
                        options={vehicleTypeOption}
                      />
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
                  style={{
                    paddingBottom: errors.vehicleName ? "1rem" : 0,
                  }}
                  help={
                    errors.vehicleName && (
                      <span style={{ color: "red", fontSize: "0.9rem" }}>
                        {errors.vehicleName?.message}
                      </span>
                    )
                  }
                >
                  <Controller
                    name="vehicleName"
                    control={control}
                    render={({ field }) => (
                      <Select
                        key="vehicleName"
                        {...field}
                        placeholder="Select vehicle name"
                        style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", }}
                        onChange={handleChangeVehicleName}
                        options={vehicleNameOption}
                      />
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

          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            {/* <img src={MapImg.src} style={{ objectFit: "cover", borderRadius: "1rem", height: "32rem", marginBottom: "2rem", marginTop: "0.6rem" }} />
             */}
            {/* <MapComponent
              isShowDirection={isShowDirection}
              departure={[route?.departure.longitude!, route?.departure.latitude!]}
              arrival={[route?.arrival.longitude!, route?.arrival.latitude!]}
            /> */}
            <Flex align="center" justify="center">
              <Button
                type="primary"
                onClick={() => {
                  setIsShowDirection(true);
                }}
                style={{ padding: "1.3rem 1.5rem", borderRadius: "0.4rem", margin: "0 auto" }}
              >
                View on map
              </Button>
            </Flex>
            <Flex align="center" justify="flex-end" gap="1rem" style={{ marginTop: "8.85rem" }}>
              <Button
                // onClick={() => router.push(URL.ROUTE)}
                style={{ width: "50%", height: "2.7rem", borderRadius: "0.4rem", margin: "0 auto", background: "white", color: COLOR.PRIMARY, border: "1px solid #4f46e5" }}
              >
                Back to routes
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "50%", height: "2.65rem", borderRadius: "0.4rem", margin: "0 auto" }}
              >
                Update
              </Button>
            </Flex>

          </Col>
        </Row>
      </Form>
    </ContentComponent>
  );
};

export default RouteDetailPage;
