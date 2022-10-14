import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import { verify } from "jsonwebtoken";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const {
		body: { shopId, accessToken },
	} = req;

	const signature = process.env.ACCESS_TOKEN_SECRET_KEY || "";

	let decoded: any;

	try {
		decoded = verify(accessToken, signature);
	} catch (e) {
		res.status(201).json({ ok: false });
		return;
	}

	const user = await client.user.findUnique({
		where: {
			userId: decoded.userId,
		},
	});

	if (!user) {
		res.status(201).json({ ok: false });
		return;
	}

	const alreadyExists = await client.fav.findFirst({
		where: {
			userId: user.id,
			shopId,
		},
	});

	if (alreadyExists) {
		await client.fav.delete({
			where: { id: alreadyExists.id },
		});
	} else {
		await client.fav.create({
			data: {
				user: { connect: { userId: decoded.userId } },
				shop: { connect: { id: shopId } },
			},
		});
	}

	return res.json({ ok: true, shopId });
}
