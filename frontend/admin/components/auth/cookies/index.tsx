"use client";

import { useEffect } from "react";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { setCookies } from "@/utils/cookies/handle.cookies";
import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
import { GET_NEW_ACCESS_TOKEN } from "@/apollo/query/auth";
import { extractErrorMessages } from "@/utils/error/format.error";
import { getErrorMessage } from "@/utils/error/apollo.error";
import { useGetNewAccessToken } from "@/lib/hooks/token";

export default function CookiesComponent() {

  const [getNewAccessToken] = useGetNewAccessToken();

  useEffect(() => {
    const fetchCurrentCookies = async () => {
      const { accessToken, expiresIn } = await fetchCookies();
      if (accessToken && expiresIn) {
        if (new Date(expiresIn).getTime() <= Date.now()) {
          await getNewAccessToken({
            context: {
              headers: {
                accesstoken: accessToken
              }
            }
          });
        }
      }
    };
    fetchCurrentCookies();
  }, []);

  return null;
}