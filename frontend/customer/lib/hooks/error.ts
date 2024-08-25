// useHandleError.ts
import { useGetNewAccessToken } from "@/lib/hooks/token";
// Adjust the import path as needed
import { NOTIFICATION } from "@/constant/notification";
import useAntNotification from "./notification";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import { extractErrorMessages } from "@/utils/error/format.error";
import { getErrorMessage } from "@/utils/error/apollo.error";

export const useHandleError = () => {
  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const [getNewAccessToken] = useGetNewAccessToken();

  const handleError = async (error: any) => {
    if (error.message === 'ERR_AUTH_LOGIN') {
      openNotificationWithIcon('error', NOTIFICATION.ERROR, "Please login to access this page");
    } else if (error.message === 'ERR_TOKEN_EXPIRED') {
      const { accessToken } = await fetchCookies();
      await getNewAccessToken({
        context: {
          headers: {
            accesstoken: accessToken
          }
        }
      });
    } else if (error.message === 'ERR_TOKEN_INVALID') {
      openNotificationWithIcon('error', NOTIFICATION.ERROR, "Invalid token. Please login again");
    } else if (error.message === 'ERR_ROLE_USER' || error.message === 'ERR_PERMISSION_USER') {
      openNotificationWithIcon('error', NOTIFICATION.ERROR, "You don't have permission to access this page");
    } else {
      const errorMessage: string = extractErrorMessages(getErrorMessage(error));
      openNotificationWithIcon('error', NOTIFICATION.ERROR, errorMessage);
    }
  };

  return { handleError };
};