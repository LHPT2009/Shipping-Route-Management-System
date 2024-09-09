import { useQuery } from "@apollo/client";
import { GET_USER_BY_TOKEN } from "@/apollo/query/auth";

const useGetUserByToken = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER_BY_TOKEN);

  const nameRole = data?.getUserByToken?.data.roles.name || [];

  return {
    nameRole,
    loading,
    error,
    refetch,
  };
};

export default useGetUserByToken;