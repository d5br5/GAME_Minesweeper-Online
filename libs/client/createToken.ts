import { TOKEN_AGE_SEC } from "@shared/constants";
import { sign, SignOptions } from "jsonwebtoken";

const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY!;
const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY!;

export const createAccessToken = (userId: string): string => {
	const accessTokenPayload = {
		userId,
		auth: "user",
	};

	const duration = TOKEN_AGE_SEC.access * 1000;

	const accessTokenOption: SignOptions = {
		subject: "minesweeper access token",
		expiresIn: duration,
		issuer: "d5br5",
	};

	const accessToken = sign(
		accessTokenPayload,
		ACCESS_TOKEN_SECRET_KEY,
		accessTokenOption
	);

	return accessToken;
};

export const createRefreshToken = (
	userId: string,
	clientIp: string
): [string, number] => {
	const refreshTokenPayload = {
		userId,
		auth: "user",
		clientIp,
	};

	const duration = TOKEN_AGE_SEC.refresh * 1000;
	const expiredAt = new Date().getTime() + duration;

	const refreshTokenOption: SignOptions = {
		subject: "minesweeper refresh token",
		expiresIn: duration,
		issuer: "d5br5",
	};

	const refreshToken = sign(
		refreshTokenPayload,
		REFRESH_TOKEN_SECRET_KEY,
		refreshTokenOption
	);

	return [refreshToken, expiredAt];
};
