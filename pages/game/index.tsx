import { useRecoilState } from "recoil";
import { authState } from "@shared/states";
import useUser from "@libs/client/useUser";
import Layout from "@components/layout";

const Game = () => {
	const [auth, setAuth] = useRecoilState(authState);
	return (
		<Layout>
			<h1>Game</h1>
			<div>{auth.isLoggedIn ? auth.userId : "GUEST"}</div>
		</Layout>
	);
};

export default Game;
