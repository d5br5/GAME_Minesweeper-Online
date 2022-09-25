import { atom } from "recoil";
import { v1 } from "uuid";

interface AuthState {
	accessToken: string | null;
	isLoggedIn: boolean;
	expiredAt: string | null;
}

const authState = atom<AuthState>({
	key: `authState/${v1()}`,
	default: {
		accessToken: null,
		isLoggedIn: false,
		expiredAt: null,
	},
});

export { authState };
