import { UnauthorizedException } from '@nestjs/common';
import { access } from 'fs';

export const authContext = ({ req }) => {
    return {
        accessToken: req.headers.accesstoken,
    }
};
