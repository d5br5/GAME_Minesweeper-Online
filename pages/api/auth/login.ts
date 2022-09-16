import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { verifyPassword } from "@libs/client/encryptPassword";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { userId, password } = req.body;

	const user = await client.user.findUnique({
		where: { userId },
		select: { password: true, salt: true },
	});
	if (!user) {
		res.status(401).json({ ok: false, msg: "userId not found" });
	} else {
		const ok = await verifyPassword(password, user.salt, user.password);
		if (ok) {
			res.status(200).json({ ok: true, msg: "login success" });
		} else {
			res.status(401).json({ ok: false, msg: "wrong password" });
		}
	}

	res.status(200).json({ ok: true });
}
