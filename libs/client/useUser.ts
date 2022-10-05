import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import { authState } from "@shared/states";

interface ProfileResponse {
	ok: boolean;
	user: User;
	accessToken: string;
	accessExpiredAt: number;
}

const routerForGuest = ["/login", "/join"];
const routerForUser = ["/profile"];

const useUser = () => {
	console.log(2);
	const authSetter = useSetRecoilState(authState);
	const authResetter = useResetRecoilState(authState);

	const router = useRouter();
	const { data, error } = useSWR<ProfileResponse>("/api/auth/refreshTokenCheck");
	useEffect(() => {
		if (data && !data.ok && routerForUser.includes(router.pathname)) {
			authResetter();
			router.replace(routerForGuest[0]);
		}
		if (data && data.ok && routerForGuest.includes(router.pathname)) {
			authSetter({
				userId: data.user.userId,
				accessToken: data.accessToken,
				isLoggedIn: true,
				accessExpiredAt: data.accessExpiredAt,
			});
			console.log(3333);
			router.replace(routerForUser[0]);
		}
	}, [data, router, authSetter, authResetter]);
};

export default useUser;
