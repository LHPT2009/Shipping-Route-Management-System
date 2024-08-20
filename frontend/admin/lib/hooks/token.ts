// useGetNewAccessToken.ts
import { GET_NEW_ACCESS_TOKEN } from '@/apollo/query/auth';
import { setCookies } from '@/utils/cookies/handle.cookies';
import { getErrorMessage } from '@/utils/error/apollo.error';
import { extractErrorMessages } from '@/utils/error/format.error';
import { useLazyQuery } from '@apollo/client';
import { ApolloError } from '@apollo/client/errors';

export const useGetNewAccessToken = () => {
  return useLazyQuery(GET_NEW_ACCESS_TOKEN, {
    onCompleted: async (data) => {
      console.log("After get new access token: ", data.getRefreshAccessToken.data)
      const { accessToken, expiresIn } = data.getRefreshAccessToken.data;
      await setCookies('accessToken', accessToken);
      await setCookies('expiresIn', expiresIn);
    },
    onError(error: ApolloError) {
      console.log(error.message);
    }
  });
};