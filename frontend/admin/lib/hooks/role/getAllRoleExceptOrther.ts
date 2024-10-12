import { useQuery } from "@apollo/client";
import { GET_ALL_ROLE_EXCEPT_ORTHER } from "@/apollo/query/role";

const getAllRoleExceptOrther = (item: string[]) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_ROLE_EXCEPT_ORTHER, {
    variables: {
      arrayExceptRole: item
    },
    fetchPolicy: "cache-and-network"
  });

  const roles = data?.getAllRoleExceptOrther?.data || [];

  return {
    roles,
    loading,
    error,
    refetch,
  };
};

export default getAllRoleExceptOrther;