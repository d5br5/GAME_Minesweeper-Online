import { AuthState } from "@shared/authState";
export const getUsername = (auth: AuthState) => {
	return auth.loading ? "loading..." : auth.isLoggedIn ? auth.userId : "GUEST";
};
