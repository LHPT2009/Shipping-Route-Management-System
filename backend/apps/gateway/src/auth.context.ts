import { UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import { access } from 'fs';

export const authContext = async ({ req }) => {

  // const userQuery = `
  //   query {
  //     getRole {
  //       success
  //       message
  //     }
  //   }
  // `;
  // await axios.get(
  //   'http://localhost:5010/auth/role/1'
  // ).then((res) => console.log(res.data))

  // console.log('userData', response);

  return {
    accessToken: req.headers.accesstoken,
  }
};
