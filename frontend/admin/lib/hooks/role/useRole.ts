import { useQuery } from "@apollo/client";
import { GET_ROLE } from "@/apollo/query/role";

const useRole = ( id:string ) => {
  const { data, loading, error, refetch } = useQuery(GET_ROLE,{
    variables: { id: id },
  });

  const role = data?.getRole?.data || [];

  return {
    role,
    loading,
    error,
    refetch,
  };
};

export default useRole;