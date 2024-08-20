"use client";

import LayoutComponent from "@/components/layout/client";
import BodyComponent from "@/components/body";
import HompageComponent from "@/components/homepage";
import { getCookies } from "@/utils/cookies/handle.cookies";
import { setCookies } from "@/utils/cookies/set.cookies";
import { useEffect } from "react";
import { deleteCache } from "next/dist/server/lib/render-server";
import { deleteCookies } from "@/utils/cookies/delete.cookies";
import { set } from "react-hook-form";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { useAppSelector } from "@/lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { cookies } from "next/headers";

export default function Home() {
  return (
    <LayoutComponent>
      <BodyComponent>
        <HompageComponent />
      </BodyComponent>
    </LayoutComponent>
  );
}
