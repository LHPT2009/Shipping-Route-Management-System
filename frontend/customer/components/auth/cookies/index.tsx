"use client";

import { useEffect } from "react";
import { setCookies } from "@/utils/cookies/set.cookies";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";

export default function CookiesComponent() {
  useEffect(() => {
    const fetchCurrentCookies = async () => {
      await setCookies('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ');
      await setCookies('expiredAt', new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString()); // 24 hours
      const dataFromCookies = await fetchCookies();
      console.log(dataFromCookies);
    };
    fetchCurrentCookies();
  }, []);

  return null;
}