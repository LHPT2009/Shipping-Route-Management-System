// useGetNewAccessToken.ts
import { GET_NEW_ACCESS_TOKEN } from '@/apollo/query/auth';
import { setCookies } from '@/utils/cookies/handle.cookies';
import { getErrorMessage } from '@/utils/error/apollo.error';
import { extractErrorMessages } from '@/utils/error/format.error';
import { useLazyQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';
import useAntNotification from './notification';
import { NOTIFICATION } from '@/constant/notification';

export const useGetNewAccessToken = () => {
  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  return useLazyQuery(GET_NEW_ACCESS_TOKEN, {
    onCompleted: async (data) => {
      const { accessToken, expiresIn } = data.getRefreshAccessToken.data;
      await setCookies('accessToken', accessToken);
      await setCookies('expiresIn', expiresIn);
      openNotificationWithIcon('success', "Success", "Your account has been login again. Please refresh the page to continue the action.");
    },
    onError(error: ApolloError) {
      openNotificationWithIcon('error', NOTIFICATION.ERROR, "Invalid token. Please login again");
    }
  });
};