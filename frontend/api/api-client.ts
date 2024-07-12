// import Cookies from "js-cookie";

import { API } from "@/constant";

const baseURL = API.BASEURL;

interface FetchOptions extends RequestInit {
  body?: any;
}

const apiClient = async (url: string, options: FetchOptions = {}) => {
  const { headers, body, ...rest } = options;

  //   const token = Cookies.get("accessToken");
  const response = await fetch(`${baseURL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer xxxxx`,
      // Authorization: `Bearer ${token}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  if (!response.ok) {
    // Xử lý lỗi
    const errorText = await response.text();
    throw new Error(`Error: ${response.statusText} - ${errorText}`);
  }

  return response.json();
};

export default apiClient;
