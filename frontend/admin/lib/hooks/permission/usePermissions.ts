import { useQuery } from "@apollo/client";
import { GET_PERMISSIONS } from "@/apollo/query/permission";

const useGetPermissions = () => {
  const { data, loading, error, refetch } = useQuery(GET_PERMISSIONS);

  const permissions = data?.getPermissions.data || [];

  return {
    permissions,
    loading,
    error,
    refetch,
  };
};

export default useGetPermissions;