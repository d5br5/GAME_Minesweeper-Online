import { atom } from "recoil";
import { v1 } from "uuid";

interface AuthState {
	userId: string;
	accessToken: string | null;
	isLoggedIn: boolean;
	expiredAt: string | null;
}

const authState = atom<AuthState>({
	key: `authState/${v1()}`,
	default: {
		userId: "",
		accessToken: null,
		isLoggedIn: false,
		expiredAt: null,
	},
});

export { authState };
