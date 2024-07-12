import apiClient from "./api-client";

const userApi = {
  getDataDemo: async () => {
    const url = ``;
    return await apiClient(url, {
      method: "GET",
      next: { revalidate: 2 },
    });
  },
};

export default userApi;
