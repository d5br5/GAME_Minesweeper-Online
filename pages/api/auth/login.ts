import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { verifyPassword } from "@libs/client/encryptPassword";
import { getClientIp } from "request-ip";
import { createAccessToken, createRefreshToken } from "@libs/client/createToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { userId, password } = req.body;

	const user = await client.user.findUnique({
		where: { userId },
		select: { password: true, salt: true },
	});

	if (!user) {
		res.status(401).json({ ok: false, msg: "userId not found" });
		return;
	}

	const ok = await verifyPassword(password, user.salt, user.password);

	if (ok) {
		const clientIp = getClientIp(req)!;
		const accessToken = createAccessToken(userId);
		const refreshToken = createRefreshToken(userId, clientIp);

		await client.user.update({
			where: { userId },
			data: {
				refreshToken: {
					create: {
						token: refreshToken,
						expiredAt: "3d",
					},
				},
			},
		});

		res.setHeader(
			"Set-Cookie",
			`token=${refreshToken}; Expires=Wed; Secure; HttpOnly; SameSite=Strict`
		);

		res
			.status(200)
			.json({ ok: true, msg: "login success", data: { accessToken, refreshToken, userId } });
	} else {
		res.status(401).json({ ok: false, msg: "wrong password" });
	}
}
