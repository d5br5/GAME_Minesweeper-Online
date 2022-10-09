import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = req.cookies["token"];
	if (!token) {
		res.status(200).json({ ok: true, msg: "log out" });
		return;
	}

	// cookie에서 refresh token 제거
	res.setHeader(
		"Set-Cookie",
		`token=""; Max-Age=-1; Secure; HttpOnly; SameSite=Strict; path=/ `
	);

	// db에서 해당 refresh token 제거
	await client.refreshToken.deleteMany({
		where: { token: { equals: token } },
	});

	res.status(200).json({ ok: true, msg: "log out" });
}
