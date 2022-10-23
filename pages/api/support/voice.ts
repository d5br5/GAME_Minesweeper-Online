import client from "@libs/server/client";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const {
			body: { category, desc, token },
		} = req;

		const signature = process.env.ACCESS_TOKEN_SECRET_KEY || "";

		let decoded: any;

		try {
			decoded = verify(token, signature);
		} catch (e) {
			res.status(201).json({ ok: false });
			return;
		}

		const voice = await client.voice.create({
			data: {
				status: {
					connect: {
						id: 1,
					},
				},
				category: {
					connect: {
						id: category,
					},
				},
				voice: desc,
				user: {
					connect: {
						userId: decoded.userId,
					},
				},
			},
		});

		if (voice) {
			res.json({ ok: true, voice });
		} else {
			res.json({ ok: false });
		}
	}

	if (req.method === "GET") {
		const voices = await client.voice.findMany({
			select: {
				category: true,
				status: true,
				voice: true,
				id: true,
				user: {
					select: { userId: true },
				},
			},
		});
		res.json({ ok: true, voices });
	}
};

export default handler;
