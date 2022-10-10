import styled from "@emotion/styled";
import { Avatar, Collapse } from "@mui/material";
import { COLOR } from "@shared/constants";
import { authState } from "@shared/states";
import { useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import * as S from "@components/form/style";
import useMutation from "@libs/client/useMutation";
import Link from "next/link";

const Profile = () => {
	const auth = useRecoilValue(authState);
	const resetAuth = useResetRecoilState(authState);
	const [logout, { loading }] = useMutation("/api/auth/logout");
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	const onLogout = () => {
		if (loading) return;
		resetAuth();
		logout({});
	};

	return (
		<Container>
			<AvatarBox onClick={handleChange}>
				<Avatar sx={{ width: 45, height: 45 }} />
			</AvatarBox>
			<Collapse in={checked}>
				<ProfileDetail>
					{auth.isLoggedIn ? (
						<div>
							<div>{auth.userId}님</div>
							<Button onClick={onLogout}>Log out</Button>
						</div>
					) : (
						<div>
							<div>Guest</div>
							<Link href={"/login"}>
								<Button>Log in</Button>
							</Link>
						</div>
					)}
				</ProfileDetail>
			</Collapse>
		</Container>
	);
};

const Container = styled.div`
	z-index: 10;
	position: absolute;
	right: 40px;
	top: 40px;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 10px;
`;

const AvatarBox = styled.div`
	border: 2px ${COLOR.black} solid;
	border-radius: 50%;
`;

const ProfileDetail = styled.div`
	text-align: center;
	width: 200px;
	padding: 10px;
	background-color: white;
	border: 1px solid black;
	border-radius: 6px;
`;

const Button = styled(S.Submit)`
	font-size: medium;
	height: initial;
	width: 100px;
	padding: 3px;
	margin-top: 10px;
`;

export default Profile;
