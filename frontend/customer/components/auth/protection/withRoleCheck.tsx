'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useGetUserByToken from '@/lib/hooks/user/user';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/hooks';
import { loadingActions } from '@/lib/store/loading';

const withRoleCheck = (WrappedComponent: any, allowedRoles: string[], allowedPermissions: string[]) => {
  const WithRoleCheck = (props: any) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const nameRole: string = user.role;
    const namePermission: string[] = user.permissions;

    useEffect(() => {
      const checkRole = async () => {
        if (!allowedRoles.includes(nameRole) || !allowedPermissions.some((permission) => namePermission.includes(permission))) {
          router.push('/unauthorized');
          dispatch(loadingActions.changeLoadingStatus(false))
        } else {
          dispatch(loadingActions.changeLoadingStatus(false))
        }
      };

      checkRole();
    }, [nameRole]);

    return <WrappedComponent {...props} />;
  };

  WithRoleCheck.displayName = `WithRoleCheck(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithRoleCheck;
};

export default withRoleCheck;