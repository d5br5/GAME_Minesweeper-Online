import { useRecoilState } from "recoil";
import { authState } from "@shared/authState";
import Layout from "@components/layout";
import { getUsername } from "@libs/client/getUsername";

const Game = () => {
	const [auth, setAuth] = useRecoilState(authState);
	return (
		<Layout>
			<h1>Game</h1>
			<div>{getUsername(auth)}</div>
		</Layout>
	);
};

export default Game;
