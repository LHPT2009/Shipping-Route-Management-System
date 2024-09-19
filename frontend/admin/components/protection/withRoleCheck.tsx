'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useGetUserByToken from '@/lib/hooks/user/user';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { loadingActions } from '@/lib/store/loading';

const withRoleCheck = (WrappedComponent: any, allowedRoles: string[], allowedPermissions: string[]) => {
  return (props: any) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { nameRole, namePermission, loading, error } = useGetUserByToken();

    useEffect(() => {
      const checkRole = async () => {
        if (!loading && !error) {
          if (!allowedRoles.includes(nameRole) || !allowedPermissions.every((permission) => namePermission.includes(permission))) {
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