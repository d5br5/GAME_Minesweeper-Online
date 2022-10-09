import { useRecoilState } from "recoil";
import { authState } from "@shared/states";
import Layout from "@components/layout";
import { getUsername } from "@libs/client/getUsername";

const Ranking = () => {
	const [auth, setAuth] = useRecoilState(authState);
	return (
		<Layout>
			<h1>Ranking</h1>
			<div>{getUsername(auth)}</div>
		</Layout>
	);
};

export default Ranking;
