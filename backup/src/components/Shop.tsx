import React from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import {getGrade} from "../assets/getGrade";
import {doc, getFirestore, increment, updateDoc} from "firebase/firestore";
import app from "../fbase";

const Container = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	margin: 10px 0;
	justify-content: center;
	align-items: center;
`;

const Link = styled.a`
	text-decoration: none;
`;

const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Info = styled.div`
	margin: 5px 0;
`;

const Part1 = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;

	@media only screen and (max-width: 1300px) {
		flex-direction: column;
	}
`;
const Part2 = styled.div`
	display: flex;
	flex-direction: row;
	width: 60%;
	@media only screen and (max-width: 1300px) {
		width: 100%;
		margin-bottom: 10px;
	}
	@media only screen and (max-width: 600px) {
		flex-direction: column;
		margin-bottom: 10px;
	}
`;
const Part3 = styled.div`
	display: flex;
	flex-direction: row;
`;

const LinkContainer = styled.div`
	display: flex;
	flex-direction: row;
	margin-left: 20px;

	@media only screen and (max-width: 1300px) {
		flex-direction: column;
	}
`;

const CustomButton = styled(Button)`
	height: 35px;
	margin-left: 30px;

	@media only screen and (max-width: 1300px) {
		width: 100%;
	}
`;

const CustomTypo = styled(Typography)`
	flex-shrink: 0;
	font-size: 15px;
	margin-bottom: 10px;
	@media only screen and (max-width: 600px) {
		font-size: 0.8rem;
	}
`;

interface Iprops {
	shop: Shop;
	index: number;
}

const Shop = ({shop, index}: Iprops) => {
	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const db = getFirestore(app);

	async function onCountClick(saveLocation: string) {
		const mapRef = doc(db, "counts", saveLocation);
		await updateDoc(mapRef, {
			count: increment(1),
		});
	}

	return (
		<Container>
			<Accordion
				expanded={expanded === "panel1"}
				sx={{width: "70%"}}
				onChange={handleChange("panel1")}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Part1>
						<Part2>
							<CustomTypo sx={{width: "25%"}}>
								{getGrade(shop.grade)}
							</CustomTypo>
							<CustomTypo sx={{width: "75%"}}>{shop.name}</CustomTypo>
						</Part2>
						<Part3>
							<CustomTypo sx={{color: "text.secondary"}}>
								{shop.address}
							</CustomTypo>
						</Part3>
					</Part1>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						<InfoContainer>
							{/*<Info>shop ID : {shop.id}</Info>*/}
							<Info>
								네이버 평점 :{" "}
								{shop.grade === "x" ? `정보 없음` : `${shop.grade} / 5.0`}
							</Info>
							<Info>네이버 블로그 리뷰 수 : {shop.reviewNum}개</Info>
							<Info>
								기준 인원 :{" "}
								{shop.basePeople === "x" ? `정보 없음` : `${shop.basePeople}명`}{" "}
							</Info>
							<Info>
								기준 가격 :{" "}
								{shop.basePrice === "x"
									? `정보 없음`
									: `${shop.basePrice.format()}원`}
							</Info>
							<Info>연락처 : {shop.contact}</Info>
						</InfoContainer>
					</Typography>
				</AccordionDetails>
			</Accordion>
			<LinkContainer>
				<Link
					onClick={() => onCountClick("listreservation")}
					href={`${shop.reservationLink}`}
					rel="noreferrer"
					target={"_blank"}
				>
					<CustomButton variant="outlined" sx={{fontSize: "0.9rem"}}>
						예약
					</CustomButton>
				</Link>
				<Link
					onClick={() => onCountClick("listinfo")}
					href={`${shop.website}`}
					rel="noreferrer"
					target={"_blank"}
				>
					<CustomButton
						variant="outlined"
						color="success"
						sx={{fontSize: "0.9rem"}}
					>
						홈페이지 방문
					</CustomButton>
				</Link>
			</LinkContainer>
		</Container>
	);
};

export default Shop;
