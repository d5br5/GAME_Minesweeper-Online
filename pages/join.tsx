import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useMutation from "@libs/client/useMutation";
import Layout from "@components/layout";
import TextField from "@mui/material/TextField";

interface JoinForm {
	id: string;
	password: string;
	passwordCheck: string;
	name: string;
	nickname: string;
	email: string;
}

const Join = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		getValues,
	} = useForm<JoinForm>({ mode: "all" });

	const [emailChecked, setEmailChecked] = useState(false);
	const [emailCheck, { loading: emailCheckLoading, data: emailCheckData }] =
		useMutation("/api/auth/email/exist");
	const [join, { loading: joinLoading, data: joinData }] = useMutation("/api/auth/email/verify");

	const onValid = (data: JoinForm) => {
		if (joinLoading) return;
		if (!emailChecked) {
			alert("Please check email first :)");
			return;
		}

		join(data);
		console.log(errors);
		console.log(data);
	};

	const onEmailCheck = () => {
		const email = getValues("email");
		if (emailChecked) return;
		if (emailCheckLoading) return;
		if (!email || email === "") return;
		if (!!errors.email) return;
		console.log(errors);
		emailCheck({ email: email });
	};

	useEffect(() => {
		if (emailCheckData?.ok) setEmailChecked(true);
		if (emailCheckData?.ok === false) {
			setEmailChecked(false);
			setError("email", { message: "Email is already used" });
		}
	}, [emailCheckData, setError]);

	return (
		<Layout title="Welcome">
			<Form onSubmit={handleSubmit(onValid)}>
				<Title>JOIN</Title>
				<TextField
					size="small"
					type="text"
					label="ID"
					{...register("id", { required: true, minLength: 6 })}
				/>
				<TextField
					size="small"
					type="password"
					label="PASSWORD"
					{...register("password", { required: true, minLength: 8 })}
				/>
				<TextField
					size="small"
					type="password"
					label="PASSWORD-CHECK"
					{...register("passwordCheck", { required: true, minLength: 8 })}
				/>

				<TextField
					size="small"
					type="text"
					label="NAME"
					{...register("name", { required: true, minLength: 2 })}
				/>

				<TextField
					size="small"
					type="text"
					label="NICKNAME"
					{...register("nickname", { required: true, minLength: 3 })}
				/>
				<EmailContainer>
					<EmailBox>
						<TextField
							type="email"
							size="small"
							label="EMAIL"
							{...register("email", {
								required: true,
								pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
							})}
							error={!!errors.email}
							onChange={() => setEmailChecked(false)}
							helperText={
								errors.email?.type === "pattern" ? "check pattern" : errors.email?.message
							}
						/>
					</EmailBox>
					<CheckBtn onClick={onEmailCheck} checked={emailChecked}>
						{emailCheckLoading ? "loading.." : emailChecked ? "✔ checked" : "check"}
					</CheckBtn>
				</EmailContainer>
				<button type="submit">{joinLoading ? "Loading..." : "Join"}</button>
			</Form>
		</Layout>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 20px;
	max-width: 400px;
	margin: 0 auto;
`;

const EmailContainer = styled.div`
	display: flex;
	width: 100%;
	position: relative;
`;

const EmailBox = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const CheckBtn = styled.div<{ checked: boolean }>`
	border: 1px solid ${(props) => (props.checked ? "blue" : "gray")};
	padding: 2px 5px;
	font-size: small;
	text-align: center;
	position: absolute;
	right: 10px;
	cursor: ${(props) => (props.checked ? "default" : "pointer")};
	border-radius: 4px;
	color: ${(props) => (props.checked ? "blue" : "gray")};
	top: 9px;
`;

const Title = styled.div`
	text-align: center;
`;

export default Join;
