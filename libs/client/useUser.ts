import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
	ok: boolean;
	user: User;
}

const routerForGuest = ["/login", "/join", "/ranking", "/"];
const routerForUser = ["/game", "/profile", "/ranking", "/"];

const useUser = () => {
	const router = useRouter();
	const { data, error } = useSWR<ProfileResponse>("/api/auth/me");
	useEffect(() => {
		if (data && !data.ok && !routerForGuest.includes(router.pathname)) {
			router.replace(routerForGuest[0]);
		}
		if (data && data.ok && !routerForUser.includes(router.pathname)) {
			router.replace(routerForUser[0]);
		}
	}, [data, router]);
};

export default useUser;
