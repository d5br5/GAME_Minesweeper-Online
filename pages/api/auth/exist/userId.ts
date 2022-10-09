import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userId } = req.body;
	const result = await client.user.findUnique({ where: { userId } });
	if (result) {
		res.status(200).json({ ok: false, msg: "Already Existed" });
	} else {
		res.status(200).json({ ok: true, msg: "can join" });
	}
}
