import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "@shared/states";
import { useRouter } from "next/router";
import { COLOR } from "@shared/constants";
import useMutation from "@libs/client/useMutation";
import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import styled from "@emotion/styled";
import * as S from "@components/form/style";
import withGuest from "@components/auth/withGuest";

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
		setFocus,
		setValue,
	} = useForm<LoginForm>({ mode: "all" });
	const router = useRouter();
	const authHandler = useSetRecoilState(authState);

	const [errorVisible, setErrorVisible] = useState(false);

	const [login, { loading, data }] =
		useMutation<LoginResponse>("/api/auth/login");

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
				loading: false,
			});
			router.replace("/");
		} else if (data?.ok === false) {
			setErrorVisible(true);
			setValue("userId", "");
			setValue("password", "");
			setFocus("userId");
		}
	}, [data, authHandler, router, setFocus, setValue]);

	return (
		<Layout>
			<S.Form
				onSubmit={handleSubmit(onValid)}
				onChange={() => setErrorVisible(false)}
			>
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
				{errorVisible && <Error>Error happened. Try again.</Error>}
				<S.Submit type="submit">{loading ? "Loading..." : "LOGIN"}</S.Submit>
				<S.AuthLink>
					<Link href={"/join"}>Join</Link>
				</S.AuthLink>
			</S.Form>
		</Layout>
	);
};

export default withGuest(Login);

const Error = styled.div`
	width: 100%;
	color: ${COLOR.up};
	text-align: center;
`;
