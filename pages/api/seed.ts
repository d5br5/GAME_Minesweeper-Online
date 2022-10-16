import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import data from "../../prisma/ver1.json";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// console.log("get seeding");
	// const createManyShops = data.map((shop) =>
	// 	client.shop.create({
	// 		data: {
	// 			name: shop.name,
	// 			address: shop.address,
	// 			contact: shop.contact,
	// 			lat: shop.lat,
	// 			lng: shop.lng,
	// 			brand: shop.brand,
	// 			url: shop.url,
	// 			booth: shop.booth === 1,
	// 			studio: shop.studio === 1,
	// 		},
	// 	})
	// );

	// Promise.all(createManyShops);

	return res.json({ ok: true });
}
