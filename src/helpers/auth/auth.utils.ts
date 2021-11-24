import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

const secret = 'q3spxx';

export const authorizeMiddelware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
        jwt.verify(token, secret, (error: VerifyErrors) => {
            if (error) {
                res.status(401).json({ code: 'Unauthorized Error' });

                return;
            }

            next();
        });

        return;
    }

    res.status(403).json({ code: 'Forbidden Error' });
};

export const getAccessToken = (username: string): string => jwt.sign({ username }, secret, { expiresIn: 3600 });

export const getTokens = (username: string): { accessToken: string; refreshToken: string } => ({
    accessToken: getAccessToken(username),
    refreshToken: jwt.sign({ username }, secret, { expiresIn: 86400 })
});

export const refreshTokenMiddleware = (req: Request, res: Response): void => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (error: VerifyErrors) => {
            if (error) {
                res.status(401).json({ code: 'Unauthorized Error' });

                return;
            }

            const username = (jwt.decode(token) as { username: string }).username;

            res.json({
                accessToken: getAccessToken(username),
                refreshToken: token
            });
        });

        return;
    }

    res.status(403).json({ code: 'Forbidden Error' });
};
