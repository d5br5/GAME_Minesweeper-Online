import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { PATTERN } from "@shared/constants";
import useMutation from "@libs/client/useMutation";
import Layout from "@components/layout";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import * as S from "@components/form/style";
import { useRouter } from "next/router";
import withGuest from "@components/auth/withGuest";

interface JoinForm {
	userId: string;
	password: string;
	passwordCheck: string;
}

const Join = () => {
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
		setFocus,
		clearErrors,
		reset,
	} = useForm<JoinForm>({ mode: "all" });
	const router = useRouter();

	const [userIdChecked, setUserIdChecked] = useState(false);
	const [userIdCheck, { loading: userIdCheckLoading, data: userIdCheckData }] =
		useMutation("/api/auth/exist/userId");

	const [join, { loading: joinLoading, data: joinData }] =
		useMutation("/api/auth/join");

	const onValid = (data: JoinForm) => {
		if (joinLoading) return;
		if (!userIdChecked) {
			alert("Please check ID first :)");
			return;
		}
		if (!isPasswordCheckOK()) {
			setError("passwordCheck", { type: "equals" });
			setFocus("passwordCheck");
			return;
		}

		join(data);
	};

	const watchID = watch("userId");
	const watchPW = watch("password");
	const watchPWCheck = watch("passwordCheck");

	const isPasswordOK = () => {
		return (
			!!watchPW &&
			errors.password?.type !== "minLength" &&
			errors.password?.type !== "maxLength"
		);
	};

	const isPasswordCheckOK = () => {
		return isPasswordOK() && watchPW === watchPWCheck;
	};

	const onUserIdCheck = () => {
		if (userIdChecked || userIdCheckLoading) return;
		if (!watchID || errors.userId) return;
		userIdCheck({ userId: watchID });
	};

	useEffect(() => {
		if (userIdCheckData?.ok) setUserIdChecked(true);
		if (userIdCheckData?.ok === false) {
			setUserIdChecked(false);
			setError("userId", { type: "usage", message: "ID is already in use" });
		}
	}, [userIdCheckData, setError]);

	useEffect(() => {
		if (joinData && joinData?.ok) {
			reset();
			router.replace("/login");
			alert("welcome!");
		}
	}, [router, joinData, reset]);

	return (
		<Layout>
			<S.Form onSubmit={handleSubmit(onValid)} onChange={() => clearErrors()}>
				<S.Title>JOIN</S.Title>
				<S.TextFieldContainer>
					<S.FieldWithBtn>
						<S.FieldBox>
							<TextField
								size="small"
								type="text"
								label="ID"
								error={!!errors.userId}
								{...register("userId", { required: true, minLength: 5 })}
								onChange={(data: any) => {
									if (userIdChecked) setUserIdChecked(false);
									setValue("userId", data.target.value);
								}}
							/>
						</S.FieldBox>
						<S.CheckBtn onClick={onUserIdCheck} checked={userIdChecked}>
							{userIdCheckLoading
								? "loading.."
								: userIdChecked
								? "✔ checked"
								: "check"}
						</S.CheckBtn>
					</S.FieldWithBtn>
					<div>
						<S.InputGuide fullfilled={!!watchID && watchID.length >= 5}>
							✓ At least 5 chars
						</S.InputGuide>
						{errors.userId?.type === "usage" ? (
							<S.InputGuide banned>✓ Already in use</S.InputGuide>
						) : (
							<S.InputGuide fullfilled={userIdChecked}>
								✓ Not in use (click &quot;check&quot;)
							</S.InputGuide>
						)}
					</div>
				</S.TextFieldContainer>
				<S.TextFieldContainer>
					<TextField
						size="small"
						type="password"
						label="PASSWORD"
						error={!!errors.password}
						{...register("password", {
							required: true,
							pattern: PATTERN.password,
							minLength: 8,
							maxLength: 16,
						})}
					/>
					<div>
						<S.InputGuide fullfilled={isPasswordOK()}>
							✓ Length : 8 - 16
						</S.InputGuide>
						<S.InputGuide fullfilled={PATTERN.password.test(watchPW)}>
							✓ Contains : number, char, special char
						</S.InputGuide>
					</div>
				</S.TextFieldContainer>
				<S.TextFieldContainer>
					<TextField
						size="small"
						type="password"
						label="PASSWORD-CHECK"
						error={!!errors.passwordCheck}
						{...register("passwordCheck", {
							required: true,
							minLength: 8,
							// validate: (val) => {
							// 	if (watch("password") !== val) return "do not match";
							// },
						})}
					/>
					{/* <div>
						<S.InputGuide fullfilled={true}>
							✓ Same with password above
						</S.InputGuide>
					</div> */}
				</S.TextFieldContainer>

				<S.Submit type="submit">{joinLoading ? "Loading..." : "JOIN"}</S.Submit>
				<S.AuthLink>
					<Link href={"/login"}>Login</Link>
				</S.AuthLink>
			</S.Form>
		</Layout>
	);
};

export default withGuest(Join);
