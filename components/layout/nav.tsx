import styled from "@emotion/styled";
import { authState } from "@shared/states";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";

interface NavProps {
	title: string;
}

const Nav = ({ title }: NavProps) => {
	const auth = useRecoilValue(authState);
	return (
		<Container>
			<Box>
				<BtnContainerLeft>
					<Link href="/game">
						<ImgBtn>
							<Image
								alt="start game"
								title="start game"
								src="/bomb.png"
								layout="fill"
							/>
						</ImgBtn>
					</Link>
				</BtnContainerLeft>
				<Link href={"/"}>
					<Title>{title}</Title>
				</Link>
				<BtnContainerRight>
					<Link href="/ranking">
						<ImgBtn>
							<Image
								alt="go to ranking"
								title="ranking"
								src="/ranking.png"
								layout="fill"
							/>
						</ImgBtn>
					</Link>
					{auth.isLoggedIn && (
						<Link href="/profile">
							<ImgBtn>
								<Image
									alt="go to profile"
									title="profile"
									src="/user.png"
									layout="fill"
								/>
							</ImgBtn>
						</Link>
					)}
				</BtnContainerRight>
			</Box>
		</Container>
	);
};

const Container = styled.div`
	border-bottom: 2px black solid;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1000;
	background-color: white;
`;

const Box = styled.div`
	position: relative;
	width: 1000px;
	margin: 20px auto;
	font-size: xx-large;
	font-weight: 600;
	display: flex;
	justify-content: center;
`;

const ImgBtn = styled.div`
	width: 30px;
	height: 30px;
	position: relative;
	cursor: pointer;
`;

const BtnContainerLeft = styled.div`
	display: flex;
	gap: 40px;
	position: absolute;
	left: 0;
`;

const BtnContainerRight = styled.div`
	display: flex;
	gap: 40px;
	position: absolute;
	right: 0;
`;

const Title = styled.div`
	cursor: pointer;
	font-weight: 400;
	font-size: x-large;
`;

export default Nav;
