import useSWR from "swr";
import { Fav, Shop } from "@prisma/client";
import { NextPage } from "next";
import Builder from "./builder";
import { useRecoilValue } from "recoil";
import { filterState } from "@shared/filterState";
import { authState } from "@shared/authState";
import { useEffect, useState } from "react";

interface FavWithUsers extends Fav {
	user: { userId: string };
}

export interface ShopWithFavs extends Shop {
	favs: FavWithUsers[];
}

interface ShopResponse {
	ok: boolean;
	shops: ShopWithFavs[];
}

const Map: NextPage = () => {
	const { data } = useSWR<ShopResponse>("/api/shop/list");
	const filter = useRecoilValue(filterState);
	const auth = useRecoilValue(authState);

	return (
		<Builder
			shops={
				auth.isLoggedIn && filter.liked
					? data?.shops.filter(
							(shop) => shop.favs.filter((a) => a.user.userId === auth.userId).length > 0
					  ) || []
					: data?.shops || []
			}
		/>
	);
};

export default Map;
