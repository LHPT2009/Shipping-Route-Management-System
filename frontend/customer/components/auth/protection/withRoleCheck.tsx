'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useGetUserByToken from '@/lib/hooks/user/useGetUserByToken';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { loadingActions } from '@/lib/store/loading';

const withRoleCheck = (WrappedComponent: any, allowedRoles: string[]) => {
  return (props: any) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { nameRole, loading, error } = useGetUserByToken();

    useEffect(() => {
      const checkRole = async () => {
        if (!loading && !error) {
          if (!allowedRoles.includes(nameRole)) {
            router.push('/unauthorized');
            dispatch(loadingActions.changeLoadingStatus(false))
          } else {
            dispatch(loadingActions.changeLoadingStatus(false))
          }
        }
      };

      checkRole();
    }, [nameRole]);

    return <WrappedComponent {...props} />;
  };
};

export default withRoleCheck;