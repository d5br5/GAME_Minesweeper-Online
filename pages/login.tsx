import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AuthLink } from "pages";
import { useSetRecoilState } from "recoil";
import { authState } from "@shared/states";
import { useRouter } from "next/router";
import useMutation from "@libs/client/useMutation";
import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import * as S from "@components/form/style";
import Link from "next/link";

interface LoginForm {
	userId: string;
	password: string;
}

interface LoginResponse {
	ok: boolean;
	msg: string;
	data: {
		accessToken: string;
		refreshToken: string;
		userId: string;
		accessExpiredAt: number;
		refreshExpiredAt: number;
	};
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({ mode: "all" });
	const router = useRouter();
	const authHandler = useSetRecoilState(authState);

	const [login, { loading, data }] = useMutation<LoginResponse>("/api/auth/login");

	const onValid = (data: LoginForm) => {
		login(data);
	};

	useEffect(() => {
		if (data && data?.ok === true) {
			authHandler({
				accessExpiredAt: data.data.accessExpiredAt,
				accessToken: data.data.accessToken,
				isLoggedIn: true,
				userId: data.data.userId,
			});
			router.replace("/game");
		} else if (data?.ok === false) {
			alert("login failed!");
		}
	}, [data, authHandler, router]);

	return (
		<Layout>
			<S.Form onSubmit={handleSubmit(onValid)}>
				<S.Title>LOGIN</S.Title>
				<TextField
					size="small"
					type="text"
					label="ID"
					error={!!errors.userId}
					{...register("userId", { required: true, minLength: 5 })}
				/>
				<TextField
					size="small"
					type="password"
					label="PASSWORD"
					error={!!errors.password}
					{...register("password", {
						required: true,
						minLength: 8,
						maxLength: 16,
					})}
				/>
				<S.Submit type="submit">{loading ? "Loading..." : "LOGIN"}</S.Submit>
				<AuthLink>
					<Link href={"/join"}>Join</Link>
				</AuthLink>
			</S.Form>
		</Layout>
	);
};

export default Login;
