import { gql } from "@apollo/client";

export const ROUTE_STATISTIC = gql`
  query routeStatistics{
    routeStatistics{
        status
        message
        data
        error
    }
  }
`;

export const LOCATION_STATISTIC = gql`
  query locationStatistics {
    locationStatistics {
        status
        message
        data
        error
    }
  }
`;

export const TRANSPORT_STATISTIC = gql`
  query transportStatistics{
    transportStatistics{
        status
        message
        data
        error
    }
  }
`;

export const USER_STATISTIC = gql`
  query userStatistics {
    userStatistics {
        status
        message
        data
        error
    }
  }
`;

export const ROLE_STATISTIC = gql`
  query roleStatistics {
    roleStatistics {
        status
        message
        data
        error
    }
  }
`;

export const PERMISSION_STATISTIC = gql`
  query permissionStatistics {
    permissionStatistics {
        status
        message
        data
        error
    }
  }
`;