import { useRecoilState } from "recoil";
import { authState } from "@shared/authState";
import Layout from "@components/layout";
import withUser from "@components/auth/withUser";
import { getUsername } from "@libs/client/getUsername";

const Profile = () => {
	const [auth, setAuth] = useRecoilState(authState);
	return (
		<Layout>
			<h1>Profile</h1>
			<div>{getUsername(auth)}</div>
		</Layout>
	);
};

export default withUser(Profile);
