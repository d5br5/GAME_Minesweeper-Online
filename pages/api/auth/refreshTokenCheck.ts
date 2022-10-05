import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { createAccessToken } from "@libs/client/createToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = req.cookies.token || null;
	if (token === null) {
		res.status(201).json({ ok: false });
		return;
	} else {
		const foundToken = await client.refreshToken.findFirst({
			where: { token },
			include: { user: true },
		});
		if (!foundToken) {
			res.status(201).json({ ok: false });
			return;
		}
		const user = foundToken.user;
		const [accessToken, accessExpiredAt] = createAccessToken(user.userId);

		res.status(200).json({ ok: true, user, accessToken, accessExpiredAt });
	}
}
