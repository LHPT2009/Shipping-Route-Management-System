"use client";
import { GET_NEW_ACCESS_TOKEN } from '@/apollo/query/auth';
import { setCookies } from '@/utils/cookies/handle.cookies';
import { getErrorMessage } from '@/utils/error/apollo.error';
import { extractErrorMessages } from '@/utils/error/format.error';
import { useLazyQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import useAntNotification from './notification';
import { NOTIFICATION } from '@/constant/notification';
import { useAppDispatch } from './hooks';
import { loadingActions } from '../store/loading';

export const useGetNewAccessToken = () => {
  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const dispatch = useAppDispatch();

  return useLazyQuery(GET_NEW_ACCESS_TOKEN, {
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      const { accessToken, expiresIn } = data.getRefreshAccessToken.data;
      await setCookies('accessToken', accessToken);
      await setCookies('expiresIn', expiresIn);
      dispatch(loadingActions.changeLoadingAccessToken(false));
      window.location.reload();
    },
    onError(error: ApolloError) {
      openNotificationWithIcon('error', NOTIFICATION.ERROR, "Invalid token. Please login again");
    }
  });
};