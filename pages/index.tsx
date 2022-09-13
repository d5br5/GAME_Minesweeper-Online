import type { NextPage } from "next";
import styled from "@emotion/styled";
import Image from "next/image";

const Home: NextPage = () => {
	return (
		<Container>
			<ImgContainer>
				<Image alt="main logo bomb" layout="fill" src={"/mine.png"} />
			</ImgContainer>
			<Slogan>
				<SemiTitle>Mind-Blowing</SemiTitle>
				<MainTitle>Mine-Sweeper</MainTitle>
			</Slogan>
		</Container>
	);
};

const Container = styled.div`
	text-align: center;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
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
`;

export default Home;
