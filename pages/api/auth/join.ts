import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { encryptPassword } from "@libs/client/encryptPassword";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { userId, password, passwordCheck, name, nickname, email } = req.body;
	const { encryptedPassword, salt } = await encryptPassword(password);
	const user = await client.user.create({
		data: {
			email,
			name,
			nickname,
			userId,
			password: encryptedPassword,
			emailVerified: false,
			salt,
		},
	});
	res.status(200).json({ ok: true, user });
}
