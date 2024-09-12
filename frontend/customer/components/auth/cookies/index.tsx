"use client";

import { useEffect } from "react";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { setCookies } from "@/utils/cookies/handle.cookies";
import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
import { GET_NEW_ACCESS_TOKEN, GET_USER_BY_TOKEN } from "@/apollo/query/auth";
import { extractErrorMessages } from "@/utils/error/format.error";
import { getErrorMessage } from "@/utils/error/apollo.error";
import { useGetNewAccessToken } from "@/lib/hooks/token";
import { userActions, UserState } from "@/lib/store/user";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { useHandleError } from "@/lib/hooks/error";
import { authActions } from "@/lib/store/auth";

export default function CookiesComponent() {

  const [getNewAccessToken] = useGetNewAccessToken();

  const dispatch = useAppDispatch();
  const isLogin: boolean = useAppSelector((state) => state.auth.isLogin);

  const { handleError } = useHandleError();

  const [getUserByToken] = useLazyQuery(GET_USER_BY_TOKEN, {
    onCompleted: async (data) => {
      const userData: UserState = {
        username: data.getUserByToken.data.username,
        email: data.getUserByToken.data.email,
        fullname: data.getUserByToken.data.fullname,
        address: data.getUserByToken.data.address,
        phone: data.getUserByToken.data.phone_number,
        role: data.getUserByToken.data.roles.name.charAt(0).toUpperCase() + data.getUserByToken.data.roles.name.slice(1).toLowerCase(),
      }
      dispatch(userActions.setUserInformation(userData));
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  useEffect(() => {
    const fetchCurrentCookies = async () => {
      const { accessToken, expiresIn } = await fetchCookies();
      if (accessToken && expiresIn) {
        if (new Date(expiresIn).getTime() <= Date.now()) {
          await getNewAccessToken({
            context: {
              headers: {
                authorization: `Bearer ${accessToken}`
              }
            }
          });
          dispatch(authActions.setIsLogin(true));
        } else {
          await getUserByToken({
            context: {
              headers: {
                authorization: `Bearer ${accessToken}`
              }
            }
          });
          dispatch(authActions.setIsLogin(true));
        }
      }
    };
    fetchCurrentCookies();
  }, [isLogin]);

  return null;
}