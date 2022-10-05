import { atom, DefaultValue } from "recoil";
import { v1 } from "uuid";

interface AuthState {
	userId: string;
	accessToken: string | null;
	isLoggedIn: boolean;
	accessExpiredAt: number | null;
}

const defaultState: AuthState = {
	userId: "",
	accessToken: null,
	isLoggedIn: false,
	accessExpiredAt: null,
};

const dev = process.env.NODE_ENV !== "production";
const server = dev ? "http://localhost:3000" : "http://localhost:3000";

const asyncUserAuthEffect =
	() =>
	({ setSelf, trigger }: any) => {
		const fetchToken = async () => {
			const response = await fetch(`${server}/api/token/init`)
				.then((res) => res.json())
				.catch((error) => console.log(error));
			console.log(response);
			if (response.ok) {
				setSelf({
					userId: response.user.userId,
					accessToken: response.accessToken,
					isLoggedIn: true,
					accessExpiredAt: response.accessExpiredAt,
				});
			} else {
				setSelf(new DefaultValue());
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
