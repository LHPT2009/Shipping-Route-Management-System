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
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";

function Home() {
  const dispatch = useAppDispatch();
  const value: MenuState = {
    keyMenu: KEYMENU.DASHBOARD,
    labelMenu: LABELMENU.DASHBOARD
  }

  dispatch(menuActions.changeInfoMenu(value))

  const getLoadingStatus = useAppSelector((state) => state.loading.loadingStatus);
  const showLoading = useLoading(getLoadingStatus);

  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(screenWidth, true, true, false, false, false, false);

  interface RouteStatistics {
    topLocations: string[];
    // Add other properties if needed
  }

  const [locationNames, setLocationNames] = useState<string[]>([]);
  const [locationCounts, setLocationCounts] = useState<number[]>([]);
  const [maxVisitName, setMaxVisitName] = useState("");
  const [maxVisitTime, setMaxVisitTime] = useState(0);

  const [dataStatistics, setDataStatistics] = useState<{
    name: string;
    count: number;
    textColor: string;
    tagColor: string;
  }[] | null>(null);

  const { handleError } = useHandleError();

  const [getRoute, { loading: loadingRoute }] = useLazyQuery(ROUTE_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      const locationNames = data.routeStatistics.data.topLocations.map((location: any) => Object.keys(location)[0]);
      const locationCounts = data.routeStatistics.data.topLocations.map((location: any) => Object.values(location)[0]);

      setLocationNames(locationNames);
      setLocationCounts(locationCounts);

      const maxIndex = locationCounts.indexOf(Math.max(...locationCounts));
      setMaxVisitName(locationNames[maxIndex]);
      setMaxVisitTime(locationCounts[maxIndex]);

      setDataStatistics([
        ...(dataStatistics || []),
        { name: "Route", count: data.routeStatistics.data.totalRoutes, textColor: "#08979c", tagColor: "cyan" },
      ])
    },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getLocation, { loading: loadingLocation }] = useLazyQuery(LOCATION_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      setDataStatistics([
        ...(dataStatistics || []),
        { name: "Location", count: data.locationStatistics.data, textColor: "#c41d7d", tagColor: "magenta" },
      ])
    },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getTransport, { loading: loadingTransport }] = useLazyQuery(TRANSPORT_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      setDataStatistics([
        ...(dataStatistics || []),
        { name: "Transport", count: data.transportStatistics.data, textColor: "#d48806", tagColor: "gold" },
      ])
    },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getUser, { loading: loadingUser }] = useLazyQuery(USER_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      setDataStatistics([
        ...(dataStatistics || []),
        { name: "User", count: data.userStatistics.data, textColor: "#389e0d", tagColor: "green" },
      ])
    },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getRole, { loading: loadingRole }] = useLazyQuery(ROLE_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      setDataStatistics([
        ...(dataStatistics || []),
        { name: "Role", count: data.roleStatistics.data, textColor: "#0958d9", tagColor: "blue" },
      ])
    },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const [getPermission, { loading: loadingPermission }] = useLazyQuery(PERMISSION_STATISTIC, {
    fetchPolicy: 'cache-and-network',
    onCompleted: async (data) => {
      setDataStatistics([
        ...(dataStatistics || []),
        { name: "Permission", count: data.permissionStatistics.data, textColor: "#531dab", tagColor: "purple" },
      ])
    },
    onError: async (error: ApolloError) => { await handleError(error); }
  });

  const getData = async () => {
    await getRoute();
    await getLocation();
    await getTransport();
    await getUser();
    await getRole();
    await getPermission();
  }

  useEffect(() => {
    getData();
  }, []);

  if (showLoading) {
    return <LoadingComponent />;
  }

  // responsive ? "12rem" :
  return (
    <LayoutAdminComponent>
      <HeaderComponent />
      <div style={{ marginTop: responsive ? "12rem" : "70px" }}>
        <ContentComponent>
          {/* Statistics */}
          <Flex
            vertical={responsive}
            gap="1rem"
            justify="space-between"
            align="center"
            style={{
              width: "100%",
              background: "white",
              borderRadius: "0.5rem",
              padding: "1rem"
            }}
          >
            {dataStatistics?.map((data, index) => (
              <Tag color={data.tagColor} className={styles['tag-container']} style={{ width: responsive ? "80%" : "15%" }} key={index}>
                <Title level={4} style={{ color: data.textColor, fontWeight: 500, margin: 0, fontSize: "1.1rem" }}>{data.name}</Title>
                <Title level={4} style={{ color: data.textColor, fontWeight: 700, marginTop: "0.5rem", fontSize: "1.8rem" }}>{data.count}</Title>
              </Tag>
            ))}
          </Flex>
        </ContentComponent>
        <ContentComponent>
          {loadingRoute || loadingLocation || loadingTransport || loadingUser || loadingRole || loadingPermission ? <LoadingComponent /> : (
            <div style={{ height: "900px" }}>
              <Flex vertical justify="space-between" align="center" style={{ marginBottom: "1rem", height: "50rem" }} gap="2rem">

                {/* Line graph */}
                <div style={{ width: "100%", height: "44rem", background: "white", borderRadius: "0.5rem", padding: "1.5rem 1rem" }}>
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
                  <div style={{ height: "35rem", paddingRight: "2.5rem" }}>
                    <LineGraph locationCounts={locationCounts} locationNames={locationNames} />
                  </div>
                </div>

              </Flex>
            </div>
          )}
        </ContentComponent>
      </div>
    </LayoutAdminComponent>
  );
}

export default withProtectedRoute(withRoleCheck(Home, AdminRoles, AdminPermissions));
