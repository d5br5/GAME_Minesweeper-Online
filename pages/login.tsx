import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";
import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import * as S from "@components/form/style";
import Link from "next/link";
import { AuthLink } from "pages";
import { useSetRecoilState } from "recoil";
import { authState } from "@shared/states";
import { useRouter } from "next/router";
import useUser from "@libs/client/useUser";

interface LoginForm {
	userId: string;
	password: string;
}

const Login = () => {
	useUser();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({ mode: "all" });
	const router = useRouter();
	const authHandler = useSetRecoilState(authState);

	const [login, { loading, data }] = useMutation("/api/auth/login");

	const onValid = (data: LoginForm) => {
		login(data);
	};

	useEffect(() => {
		if (data && data?.ok === true) {
			authHandler({
				expiredAt: "tmp",
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
		<Layout title="LOGIN">
			<S.Form onSubmit={handleSubmit(onValid)}>
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
					{...register("password", { required: true, minLength: 8, maxLength: 16 })}
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
