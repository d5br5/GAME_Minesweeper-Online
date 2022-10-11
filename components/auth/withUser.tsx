import { authState } from "@shared/authState";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

const withUser = (Component: NextPage | React.FC) => {
	const User = () => {
		const router = useRouter();
		const auth = useRecoilValue(authState);
		useEffect(() => {
			if (!auth.isLoggedIn) {
				router.replace("/login");
			}
		}, [router, auth]);
		return <Component />;
	};
	return User;
};

export default withUser;
