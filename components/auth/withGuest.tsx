import React, { useEffect } from "react";
import { authState } from "@shared/authState";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

const withGuest = (Component: NextPage | React.FC) => {
	const Guest = () => {
		const router = useRouter();
		const auth = useRecoilValue(authState);
		useEffect(() => {
			if (auth.isLoggedIn) {
				router.replace("/");
			}
		}, [router, auth]);
		return <Component />;
	};
	return Guest;
};

export default withGuest;
