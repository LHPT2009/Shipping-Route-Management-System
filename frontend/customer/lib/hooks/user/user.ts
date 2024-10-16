import { useQuery } from "@apollo/client";
import { GET_USER_BY_TOKEN } from "@/apollo/query/auth";

const useGetUserByToken = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_TOKEN, {
    fetchPolicy: 'cache-and-network',
  });

  const nameRole = data?.getUserByToken?.data.roles.name || [];
  const namePermission = data?.getUserByToken?.data.roles.permissions.map((item: any) => item.name) || [];

  return {
    nameRole,
    namePermission,
    loading,
    error,
    refetch,
  };
};

export default useGetUserByToken;