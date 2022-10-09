import { AuthState } from "@shared/states";
export const getUsername = (auth: AuthState) => {
	return auth.loading ? "loading..." : auth.isLoggedIn ? auth.userId : "GUEST";
};
