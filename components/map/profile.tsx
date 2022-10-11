import styled from "@emotion/styled";
import { Avatar, Collapse, Switch } from "@mui/material";
import { COLOR } from "@shared/constants";
import { authState } from "@shared/authState";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import * as S from "@components/form/style";
import useMutation from "@libs/client/useMutation";
import Link from "next/link";
import { filterState } from "@shared/filterState";

const Profile = () => {
	const auth = useRecoilValue(authState);
	const resetAuth = useResetRecoilState(authState);

	const [filter, setFilter] = useRecoilState(filterState);

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
						<ProfileFlexContainer>
							<div>{auth.userId}님</div>
							<Button onClick={onLogout}>Log out</Button>
							<Link href={"/support"}>
								<S.AuthLink>support</S.AuthLink>
							</Link>
						</ProfileFlexContainer>
					) : (
						<div>
							<div>Guest</div>
							<Link href={"/login"}>
								<Button>Log in</Button>
							</Link>
							<Link href={"/support"}>
								<S.AuthLink>support</S.AuthLink>
							</Link>
						</div>
					)}
				</ProfileDetail>
				{auth.isLoggedIn && (
					<ProfileDetail>
						<FilterContainer>
							<span id="filter-title">Filter</span>
							<div>
								<div>찜한 사진관</div>
								<Switch
									checked={filter.liked}
									onClick={() => setFilter((prev) => ({ ...prev, liked: !prev.liked }))}
								/>
							</div>
							{/* <div>
							<div>스튜디오형</div>
							<Switch checked={filter.liked} />
						</div>
						<div>
							<div>자판기형</div>
							<Switch checked={filter.liked} />
						</div> */}
						</FilterContainer>
					</ProfileDetail>
				)}
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
	border: 2px solid ${COLOR.black};
	border-radius: 6px;
	margin-bottom: 10px;
`;

const Button = styled(S.Submit)`
	font-size: medium;
	height: initial;
	width: 100px;
	padding: 3px;
	margin-top: 10px;
	margin-bottom: 13px;
`;

const ProfileFlexContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const FilterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	#filter-title {
		margin-top: 5px;
		border: 1px ${COLOR.main} solid;
		padding: 3px 10px;
		font-size: 14px;
		border-radius: 5px;
		color: ${COLOR.main};
	}
	div {
		padding-left: 10px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;

export default Profile;
