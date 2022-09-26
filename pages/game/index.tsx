import { useRecoilState } from "recoil";
import { authState } from "@shared/states";
import useUser from "@libs/client/useUser";

const Game = () => {
	useUser();
	const [auth, setAuth] = useRecoilState(authState);
	return (
		<div>
			<h1>Game</h1>
			<div>{auth.userId}</div>
		</div>
	);
};

export default Game;
