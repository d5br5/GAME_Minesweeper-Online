import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import {
	createAccessToken,
	createRefreshToken,
} from "@libs/client/createToken";
import { verify } from "jsonwebtoken";
import { TOKEN_AGE_SEC } from "@shared/constants";
import { getClientIp } from "request-ip";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// cookies에 저장된 token 조회
	const token = req.cookies.token || null;

	// token이 없다면 ok:false 응답
	if (token === null) {
		res.status(201).json({ ok: false });
		return;
	}

	// DB에서 token 조회
	const foundToken = await client.refreshToken.findFirst({
		where: { token },
		include: { user: true },
	});

	// DB에 token 없으면 ok:false 응답
	if (!foundToken) {
		res.status(201).json({ ok: false });
		return;
	}

	// check if the signature of token is valid
	const signature = process.env.REFRESH_TOKEN_SECRET_KEY || "";

	try {
		verify(token, signature);
	} catch (e) {
		// remove invalid token from cookie, DB
		await client.refreshToken.deleteMany({
			where: { token: { equals: token } },
		});
		res.setHeader(
			"Set-Cookie",
			`token=""; Max-Age=-1; Secure; HttpOnly; SameSite=Strict; path=/ `
		);
		res.status(201).json({ ok: false });
		return;
	}

	// token에 연동된 user 정보
	const user = foundToken.user;

	// token 만료기간 조회
	let expired = Number(foundToken.expiration);
	let now = new Date().getTime();

	// 만료 임박한 경우 재발급
	if (expired - now < TOKEN_AGE_SEC.validation * 1000) {
		console.log("refreshed");
		// 기존 token 삭제
		await client.refreshToken.deleteMany({
			where: { token: { equals: token } },
		});

		// 새 token 생성 및 user 연결
		const clientIp = getClientIp(req)!;
		const [newToken, newExpiration] = createRefreshToken(user.userId, clientIp);
		await client.refreshToken.create({
			data: {
				clientIp,
				expiration: newExpiration,
				token: newToken,
				user: { connect: { id: user.id } },
			},
		});

		res.setHeader(
			"Set-Cookie",
			`token=${newToken}; Max-Age=${TOKEN_AGE_SEC.refresh}; Secure; HttpOnly; SameSite=Strict; path=/ `
		);
	}

	// access token 발급
	const [accessToken, accessExpiredAt] = createAccessToken(user.userId);

	// user정보, access token 전달
	res.status(200).json({ ok: true, user, accessToken, accessExpiredAt });
}
