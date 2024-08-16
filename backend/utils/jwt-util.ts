import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

export class JwtUtil {
    constructor(private readonly jwtService: JwtService) { }

    signToken(payload: any, secret: string, expiresIn: string | number): string {
        try {
            return this.jwtService.sign(payload, { secret, expiresIn });
        } catch (error) {
            throw new Error('Error signing token: ' + error.message);
        }
    }

    decodeToken(token: string): any {
        try {
            return this.jwtService.decode(token);
        } catch (error) {
            throw new Error('Error decoding token: ' + error.message);
        }
    }

    verifyToken(token: string, secret: string): any {
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new UnauthorizedException('Invalid token');
            } else if (error instanceof jwt.TokenExpiredError) {
                throw new UnauthorizedException('Token expired');
            } else {
                throw new UnauthorizedException('Error verifying token: ' + error.message);
            }
        }
    }

    async handleTokens(accessToken: string, refreshToken: string, secret: string): Promise<{ valid: boolean; newAccessToken?: string }> {
        try {
            try {
                const decodedAccessToken = this.verifyToken(accessToken, secret);
                return { valid: true };
            } catch (accessError) {
                if (accessError instanceof jwt.TokenExpiredError) {
                    try {
                        const decodedRefreshToken = this.verifyToken(refreshToken, secret);
                        const newAccessToken = this.signToken({ userId: decodedRefreshToken.userId }, secret, '1h');
                        return { valid: false, newAccessToken };
                    } catch (refreshError) {
                        if (refreshError instanceof jwt.TokenExpiredError) {
                            throw new UnauthorizedException('Please log in again');
                        } else {
                            throw new UnauthorizedException('Error validating refresh token');
                        }
                    }
                } else {
                    throw new UnauthorizedException('Invalid access token');
                }
            }
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}