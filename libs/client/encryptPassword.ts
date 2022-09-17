import { pbkdf2, randomBytes } from "crypto";
import util from "util";

const pbkdf2Promise = util.promisify(pbkdf2);

const createSalt = () => {
	const buf = randomBytes(64);
	return buf.toString("base64");
};

export const encryptPassword = async (password: string) => {
	const salt = createSalt();
	const encryptedPassword = await pbkdf2Promise(password, salt, 15293, 64, "sha512").then((res) =>
		res.toString("base64")
	);

	return { encryptedPassword, salt };
};

export const verifyPassword = async (
	inputPassword: string,
	userSalt: string,
	userPassword: string
) => {
	const key = await pbkdf2Promise(inputPassword, userSalt, 15293, 64, "sha512").then((res) =>
		res.toString("base64")
	);
	return key === userPassword;
};
