
import { deleteCookies, getCookies, hasCookies } from "../cookies/handle.cookies";


interface ResultFetchCookiesInterface {
  accessToken: string;
  expiresIn: string;
}

export const fetchCookies = async () => {
  const resultError: ResultFetchCookiesInterface = {
    accessToken: "",
    expiresIn: ""
  };

  if (!await hasCookies('accessToken') || !await hasCookies('expiresIn')) {
    return resultError;
  }
  
  else {
    const accessToken: string | undefined = await getCookies('accessToken');
    const expiresIn: string | undefined = await getCookies('expiresIn');
    return {
      accessToken: accessToken,
      expiresIn: expiresIn
    }
  }
};