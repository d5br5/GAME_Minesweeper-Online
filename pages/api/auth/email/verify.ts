import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id, password, passwordCheck, name, nickname, email } = req.body;
	const user = await client.user.create({
		data: {
			email,
			name,
			nickname,
			userId: id,
			password,
			emailVerified: false,
		},
	});
	res.status(200).json({ ok: true, user });
}
