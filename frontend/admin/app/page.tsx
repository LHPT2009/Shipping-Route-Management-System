"use client";

import React, { useState, useEffect } from "react";
import ContentComponent from "@/components/content";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import LoadingComponent from "@/components/loading";
import withProtectedRoute from "@/components/protection/withProtectedRoute";
import withRoleCheck from "@/components/protection/withRoleCheck";
import { COLOR, KEYMENU, LABELMENU } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { menuActions, MenuState } from "@/lib/store/menu";
import useLoading from "@/lib/hooks/useLoading";
import { ROLE } from "@/constant/role";
import { AdminPermissions, AdminRoles } from "@/lib/permissions/admin";
import LineGraph from "@/components/chart";
import { Flex, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { LOCATION_STATISTIC, PERMISSION_STATISTIC, ROLE_STATISTIC, ROUTE_STATISTIC, TRANSPORT_STATISTIC, USER_STATISTIC } from "@/apollo/query/statistic";
import { useHandleError } from "@/lib/hooks/error";
import styles from "./page.module.css";
import { set } from "react-hook-form";

function Home() {
  const dispatch = useAppDispatch();
  const value: MenuState = {
    keyMenu: KEYMENU.DASHBOARD,
    labelMenu: LABELMENU.DASHBOARD
  }

  dispatch(menuActions.changeInfoMenu(value))

  const getLoadingStatus = useAppSelector((state) => state.loading.loadingStatus);
  const showLoading = useLoading(getLoadingStatus);

  interface RouteStatistics {
    topLocations: string[];
    // Add other properties if needed
  }

  const [totalRoute, setTotalRoute] = useState(0);
  const [locationNames, setLocationNames] = useState<string[]>([]);
  const [locationCounts, setLocationCounts] = useState<number[]>([]);
  const [maxVisitName, setMaxVisitName] = useState("");
  const [maxVisitTime, setMaxVisitTime] = useState(0);
  const [location, setLocation] = useState(0);
  const [transport, setTransport] = useState(0);
  const [user, setUser] = useState(0);
  const [role, setRole] = useState(0);
  const [permission, setPermission] = useState(0);

  const [dataStatistics, setDataStatistics] = useState<{
    name: string[];
    count: number[];
    textColor: string[];
    tagColor: string[];
  } | null>(null);

  const { handleError } = useHandleError();

  const [getRoute, { loading: loadingRoute }] = useLazyQuery(ROUTE_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      const locationNames = data.routeStatistics.data.topLocations.map((location: any) => Object.keys(location)[0]);
      const locationCounts = data.routeStatistics.data.topLocations.map((location: any) => Object.values(location)[0]);

      setTotalRoute(data.routeStatistics.data.totalRoutes);
      setLocationNames(locationNames);
      setLocationCounts(locationCounts);

      const maxIndex = locationCounts.indexOf(Math.max(...locationCounts));
      setMaxVisitName(locationNames[maxIndex]);
      setMaxVisitTime(locationCounts[maxIndex]);
    },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getLocation, { loading: loadingLocation }] = useLazyQuery(LOCATION_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => { setLocation(data.locationStatistics.data); },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getTransport, { loading: loadingTransport }] = useLazyQuery(TRANSPORT_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => { setTransport(data.transportStatistics.data); },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getUser, { loading: loadingUser }] = useLazyQuery(USER_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => { setUser(data.userStatistics.data); },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getRole, { loading: loadingRole }] = useLazyQuery(ROLE_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => { setRole(data.roleStatistics.data); },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getPermission, { loading: loadingPermission }] = useLazyQuery(PERMISSION_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => { setPermission(data.permissionStatistics.data); },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  useEffect(() => {
    getRoute();
    getLocation();
    getTransport();
    getUser();
    getRole();
    getPermission();

    setDataStatistics({
      name: ["Route", "Location", "Transport", "User", "Role", "Permission"],
      count: [totalRoute, location, transport, user, role, permission],
      textColor: ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#00a388", "#f56a00"],
      tagColor: ["cyan", "magenta", "orange", "green", "blue", "purple"]
    })
  }, []);

  if (showLoading) {
    return <LoadingComponent />;
  }

  return (
    <LayoutAdminComponent>
      <HeaderComponent />
      {loadingRoute || loadingLocation || loadingTransport || loadingUser || loadingRole || loadingPermission ? <LoadingComponent /> : (

        <div className={styles['content-container']}>
          <Flex vertical justify="space-between" align="center" style={{ marginBottom: "1rem", height: "50rem" }} gap="2rem">

            {/* Statistics */}
            <Flex justify="space-between" align="center" style={{ width: "100%", height: "20rem", background: "white", borderRadius: "0.5rem", padding: "1.5rem 2rem" }}>
              <Tag color="cyan" className={styles['tag-container']}>
                <Title level={4} style={{ color: "#08979c", fontWeight: 500, margin: 0, fontSize: "1.1rem" }}>Locations</Title>
                <Title level={4} style={{ color: "#08979c", fontWeight: 700, marginTop: "0.5rem", fontSize: "1.8rem" }}>{location}</Title>
              </Tag>
              <Tag color="magenta" className={styles['tag-container']}>
                <Title level={4} style={{ color: "#08979c", fontWeight: 500, margin: 0, fontSize: "1.1rem" }}>Locations</Title>
                <Title level={4} style={{ color: "#08979c", fontWeight: 700, marginTop: "0.5rem", fontSize: "1.8rem" }}>{location}</Title>
              </Tag>
              <Tag color="orange" className={styles['tag-container']}>
                <Title level={4} style={{ color: "#08979c", fontWeight: 500, margin: 0, fontSize: "1.1rem" }}>Locations</Title>
                <Title level={4} style={{ color: "#08979c", fontWeight: 700, marginTop: "0.5rem", fontSize: "1.8rem" }}>{location}</Title>
              </Tag>
              <Tag color="green" className={styles['tag-container']}>
                <Title level={4} style={{ color: "#08979c", fontWeight: 500, margin: 0, fontSize: "1.1rem" }}>Locations</Title>
                <Title level={4} style={{ color: "#08979c", fontWeight: 700, marginTop: "0.5rem", fontSize: "1.8rem" }}>{location}</Title>
              </Tag>
              <Tag color="blue" className={styles['tag-container']}>
                <Title level={4} style={{ color: "#08979c", fontWeight: 500, margin: 0, fontSize: "1.1rem" }}>Locations</Title>
                <Title level={4} style={{ color: "#08979c", fontWeight: 700, marginTop: "0.5rem", fontSize: "1.8rem" }}>{location}</Title>
              </Tag>
              <Tag color="purple" className={styles['tag-container']}>
                <Title level={4} style={{ color: "#08979c", fontWeight: 500, margin: 0, fontSize: "1.1rem" }}>Locations</Title>
                <Title level={4} style={{ color: "#08979c", fontWeight: 700, marginTop: "0.5rem", fontSize: "1.8rem" }}>{location}</Title>
              </Tag>
            </Flex>

            {/* Line graph */}
            <div style={{ width: "100%", height: "40rem", background: "white", borderRadius: "0.5rem", padding: "1.5rem 2rem" }}>
              <Title level={4} style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#495057",
              }}>
                Visit frequency for the location
              </Title>

              <Title level={4} style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: COLOR.PRIMARY,
                marginBottom: "2.5rem",
                marginTop: "1rem",
              }}>
                {maxVisitName}
                <span style={{ color: "#495057", fontWeight: "400" }}> is the most visited location with </span>
                {maxVisitTime} times
              </Title>
              <div style={{ height: "30rem" }}>
                <LineGraph locationCounts={locationCounts} locationNames={locationNames} />
              </div>
            </div>

          </Flex>

        </div>
      )}
    </LayoutAdminComponent>
  );
}

export default withProtectedRoute(withRoleCheck(Home, AdminRoles, AdminPermissions));
