import { atom, DefaultValue } from "recoil";
import { v1 } from "uuid";

export interface AuthState {
	userId: string;
	accessToken: string | null;
	isLoggedIn: boolean;
	accessExpiredAt: number | null;
	loading: boolean;
}

const defaultState: AuthState = {
	userId: "",
	accessToken: null,
	isLoggedIn: false,
	accessExpiredAt: null,
	loading: false,
};

const dev = process.env.NODE_ENV !== "production";
const server = dev
	? "http://localhost:3000"
	: "https://minesweeper-tan.vercel.app/";

const asyncUserAuthEffect =
	() =>
	({ setSelf, trigger }: any) => {
		const fetchToken = async () => {
			setSelf({ loading: true });
			const response = await fetch(`${server}/api/token/init`)
				.then((res) => res.json())
				.catch((error) => console.log(error));
			if (response.ok) {
				setSelf({
					userId: response.user.userId,
					accessToken: response.accessToken,
					isLoggedIn: true,
					accessExpiredAt: response.accessExpiredAt,
					loading: false,
				});
			} else {
				setSelf({ ...defaultState, loading: false });
			}
		};

		if (trigger === "get") fetchToken();
	};

const authState = atom<AuthState>({
	key: `authState/${v1()}`,
	default: defaultState,
	effects: [asyncUserAuthEffect()],
});

export { authState };
