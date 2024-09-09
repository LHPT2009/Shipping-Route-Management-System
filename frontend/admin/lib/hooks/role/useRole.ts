import { useQuery } from "@apollo/client";
import { GET_ROLE } from "@/apollo/query/role";

const useRole = () => {
  const { data, loading, error, refetch } = useQuery(GET_ROLE);

  const role = data?.getRole?.data || [];

  return {
    role,
    loading,
    error,
    refetch,
  };
};

export default useRole;