import type { GetServerSideProps, NextPage } from "next";
import { useRecoilState } from "recoil";
import { authState } from "@shared/states";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { COLOR } from "@shared/constants";

interface HomeState {
	ok: boolean;
	cookie: string;
}

const Home: NextPage<HomeState> = ({ ok, cookie }) => {
	const [auth, setAuth] = useRecoilState(authState);
	return (
		<Full>
			<Container>
				<ImgContainer>
					<Image alt="main logo bomb" layout="fill" src={"/mine.png"} />
				</ImgContainer>
				<Slogan>
					<SemiTitle>Mind-Blowing</SemiTitle>
					<MainTitle>Mine-Sweeper</MainTitle>
				</Slogan>
				<Link href={"/game"}>
					<StartBtn>Game Start</StartBtn>
				</Link>
				<AuthContainer>
					<AuthLink>
						<Link href={"/login"}>Sign In</Link>
					</AuthLink>
					<AuthLink>
						<Link href={"/join"}>Join</Link>
					</AuthLink>
				</AuthContainer>
			</Container>
		</Full>
	);
};

const Full = styled.div`
	background-color: ${COLOR.background};
`;

const Container = styled.div`
	width: 500px;
	margin: 0 auto;
	text-align: center;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 30px;
`;

const ImgContainer = styled.div`
	width: 400px;
	height: 400px;
	position: relative;
	margin: 0 auto;
`;

const Slogan = styled.div`
	font-weight: 800;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;

const SemiTitle = styled.div`
	font-size: 2.8rem;
	font-weight: 700;
	color: gray;
`;

const MainTitle = styled.div`
	font-size: 3.2rem;
	font-weight: 900;
	color: ${COLOR.main};
`;

const StartBtn = styled.div`
	width: 200px;
	padding: 10px;
	border: 2px solid ${COLOR.main};
	background-color: ${COLOR.white};
	color: ${COLOR.main};
	font-weight: 600;
	border-radius: 7px;
	font-size: x-large;
	margin-top: 20px;
	transition: all ease 0.2s;
	cursor: pointer;
	&:hover {
		background-color: ${COLOR.main};
		color: white;
	}
`;

export const AuthContainer = styled.div`
	display: flex;
	gap: 25px;
`;

export const AuthLink = styled.div`
	text-align: center;
	text-decoration: underline;
	font-size: small;
	margin-top: -8px;
	color: ${COLOR.darkgray};
`;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookie = ctx.req?.headers.cookie || "";
	return {
		props: {
			ok: true,
			cookie,
		},
	};
};

export default Home;
