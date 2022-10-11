import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const shops = await client.shop.findMany({
		include: {
			_count: { select: { favs: true } },
			favs: { select: { user: { select: { userId: true } } } },
		},
	});
	return res.json({ ok: true, shops });
}
