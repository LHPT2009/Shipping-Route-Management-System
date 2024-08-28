'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCookies } from '@/utils/token/fetch_cookies.token';
import { Spin } from 'antd';
import LoadingComponent from '@/components/loading';
import { useAppSelector } from '@/lib/hooks/hooks';

const withProtectedRoute = (WrappedComponent: any) => {
  return (props: any) => {

    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const isLogin: boolean = useAppSelector((state) => state.auth.isLogin);
    
    useEffect(() => {
      const checkToken = async () => {
        const { accessToken, expiresIn } = await fetchCookies();
        if (!accessToken || !expiresIn || !isLogin) {
          router.push('/');
        } else {
          setIsLoading(false);
        }
      }
      checkToken();
    }, [router, isLogin]);

    if (isLoading) {
      return <LoadingComponent />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;