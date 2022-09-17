import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMutation from "@libs/client/useMutation";
import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import * as S from "@components/form/style";
import Link from "next/link";
import { AuthLink } from "pages";

interface LoginForm {
	userId: string;
	password: string;
}

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({ mode: "all" });

	const [login, { loading, data }] = useMutation("/api/auth/login");

	const onValid = (data: LoginForm) => {
		login(data);
	};

	useEffect(() => {
		if (data && data?.ok === true) {
			alert("login success!");
		} else if (data?.ok === false) {
			alert("login failed!");
		}
	}, [data]);

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
