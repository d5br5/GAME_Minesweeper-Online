import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { encryptPassword } from "@libs/client/encryptPassword";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userId, password, passwordCheck, nickname } = req.body;
	const { encryptedPassword, salt } = await encryptPassword(password);

	if (password !== passwordCheck) {
		res.status(200).json({ ok: false });
	}

	const user = await client.user.create({
		data: {
			userId,
			password: encryptedPassword,
			salt,
		},
	});
	res.status(200).json({ ok: true, user });
}
