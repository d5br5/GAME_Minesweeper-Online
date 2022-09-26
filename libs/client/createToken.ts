import { sign, SignOptions } from "jsonwebtoken";

const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY!;
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY!;

export const createAccessToken = (userId: string) => {
	const accessTokenPayload = {
		userId,
		auth: "user",
	};

	const accessTokenOption: SignOptions = {
		subject: "minesweeper access token",
		expiresIn: "10m",
		issuer: "d5br5",
	};

	const accessToken = sign(accessTokenPayload, ACCESS_TOKEN_SECRET_KEY, accessTokenOption);

	return accessToken;
};

export const createRefreshToken = (userId: string, clientIp: string) => {
	const refreshTokenPayload = {
		userId,
		auth: "user",
		clientIp,
	};

	const refreshTokenOption: SignOptions = {
		subject: "minesweeper refresh token",
		expiresIn: "1d",
		issuer: "d5br5",
	};

	const refreshToken = sign(refreshTokenPayload, REFRESH_TOKEN_SECRET_KEY, refreshTokenOption);

	return refreshToken;
};
