'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCookies } from '@/utils/token/fetch_cookies.token';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { loadingActions } from '@/lib/store/loading';

const withProtectedRoute = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const checkToken = async () => {
        const { accessToken, expiresIn } = await fetchCookies();

        if (!accessToken || !expiresIn) {
          router.push('/login');
          dispatch(loadingActions.changeLoadingStatus(false))
        }
      }
      checkToken();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;