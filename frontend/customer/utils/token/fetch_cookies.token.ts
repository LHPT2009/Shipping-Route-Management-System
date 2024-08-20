
import { deleteCookies, getCookies, hasCookies } from "../cookies/handle.cookies";


interface ResultFetchCookiesInterface {
  accessToken: string;
  expiredAt: string;
}

export const fetchCookies = async () => {
  const resultError: ResultFetchCookiesInterface = {
    accessToken: "",
    expiredAt: ""
  };

  if(!await hasCookies('accessToken') || !await hasCookies('expiredAt')){
    return resultError;
  }
  else{
    const accessToken: string | undefined = await getCookies('accessToken');
    const expiredAt: string | undefined = await getCookies('expiredAt');
    if(expiredAt && new Date(expiredAt).getTime() <= Date.now()){
      deleteCookies('accessToken');
      deleteCookies('expiredAt');
      return resultError;
    }
    else{
      return {
        accessToken: accessToken,
        expiredAt: expiredAt
      }
    }
  }
};