import { useQuery } from "@apollo/client";
import { GET_ROLES } from "@/apollo/query/role";

const useRoles = () => {
  const { data, loading, error, refetch } = useQuery(GET_ROLES);

  const roles = data?.getRoles?.data || [];

  return {
    roles,
    loading,
    error,
    refetch,
  };
};

export default useRoles;