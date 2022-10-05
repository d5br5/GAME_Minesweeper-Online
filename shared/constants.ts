export const COLOR = {
	white: "#ffffff",
	black: "rgba(0,0,0,0.95)",
	up: "#E74848",
	down: "#487EE7",
	border: "#D9D9D9",
	graybg1: "#FBFBFB",
	graybg2: "#F5F5F5",
	darkgray: "#9E9E9E",
	main: "#00CED1",
	confirm: "#0fba15",
	background: "#ffffff",
};

export const PATTERN = {
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
	password: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^+\-=])(?=\S+$).*$/i,
};

export const TOKEN_AGE_SEC = {
	// second
	refresh: 3600 * 24 * 2,
	access: 3600 * 2,
};
