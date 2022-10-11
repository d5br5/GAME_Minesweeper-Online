import React from "react";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import {Locations} from "../assets/const";

const Form = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 30px;
`;

const PartContainer = styled.div`
	margin-bottom: 20px;
`;

const PartTitle = styled.div`
	font-weight: 900;
`;

const PricePrinter = styled.div`
	width: 100%;
	text-align: center;
	margin: 10px 0 0;
`;

const CustomAccordian = styled(Accordion)`
	@media only screen and (min-width: 1300px) {
		right: 100px;
	}
`;

interface Iprops {
	filterEditing: boolean;
	setFilterEditing: React.Dispatch<React.SetStateAction<boolean>>;
	setFilterList: React.Dispatch<React.SetStateAction<any[][]>>;
}

const Filter = ({filterEditing, setFilterEditing, setFilterList}: Iprops) => {
	const [expanded, setExpanded] = React.useState<string | false>(false);
	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const [priceRange, setPriceRange] = React.useState<number[]>([0, 100000]);
	const handlePriceRangeChange = (
		event: Event,
		newValue: number | number[]
	) => {
		setPriceRange(newValue as number[]);
		setFilterEditing(true);
	};

	const [gradeRange, setGradeRange] = React.useState<number[]>([0, 5]);
	const handleGradeRangeChange = (
		event: Event,
		newValue: number | number[]
	) => {
		setGradeRange(newValue as number[]);
		setFilterEditing(true);
	};

	const onFilterSubmit = () => {
		const query = 'input[name="local"]:checked';
		const selectedEls = document.querySelectorAll(query);

		// 선택된 목록에서 value 찾기
		let selectedLocations: string[] = [];

		selectedEls.forEach((el: any) => {
			selectedLocations.push(el.value);
		});

		setFilterList([priceRange, gradeRange, selectedLocations]);
		setFilterEditing(false);
		setExpanded(false);
	};

	const onFilterReset = () => {
		setFilterList([]);
		setFilterEditing(false);
		setExpanded(false);
	};

	return (
		<CustomAccordian
			expanded={expanded === "panel1"}
			sx={{width: "340px", position: "absolute", top: "40px", zIndex: 30}}
			onChange={handleChange("panel1")}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
			>
				<Typography
					sx={{
						fontSize: "14px",
						textAlign: "center",
						paddingLeft: "30px",
						fontWeight: 700,
					}}
				>
					FILTER
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Form>
					<PartContainer>
						<PartTitle>기준 가격</PartTitle>
						<PricePrinter>
							{priceRange[0].format()}원 ~ {priceRange[1].format()}원
						</PricePrinter>
						<Box sx={{width: "100%"}}>
							<Slider
								min={0}
								step={5000}
								max={100000}
								getAriaLabel={() => "Temperature range"}
								value={priceRange}
								onChange={handlePriceRangeChange}
								valueLabelDisplay="auto"
							/>
						</Box>
					</PartContainer>
					<PartContainer>
						<PartTitle>네이버 평점</PartTitle>
						<PricePrinter>
							{gradeRange[0]} ~ {gradeRange[1]}
						</PricePrinter>
						<Box sx={{width: "100%"}}>
							<Slider
								min={0}
								color={"secondary"}
								step={0.5}
								max={5}
								getAriaLabel={() => "Temperature range"}
								value={gradeRange}
								onChange={handleGradeRangeChange}
								valueLabelDisplay="auto"
							/>
						</Box>
					</PartContainer>
					<PartContainer>
						<PartTitle style={{marginBottom: 20}}>지역</PartTitle>
						{Locations.map((a, i) => (
							<FormControlLabel
								key={i}
								sx={{width: "47%", height: "30px", fontSize: "0.7rem"}}
								control={
									<Checkbox
										onChange={() => {
											setFilterEditing(true);
										}}
									/>
								}
								label={a}
								name={"local"}
								value={a}
							/>
						))}
					</PartContainer>

					<Button
						disabled={!filterEditing}
						sx={{marginBottom: "15px"}}
						variant="outlined"
						onClick={onFilterSubmit}
					>
						적용
					</Button>
					<Button variant="outlined" color={"error"} onClick={onFilterReset}>
						초기화
					</Button>
				</Form>
			</AccordionDetails>
		</CustomAccordian>
	);
};

export default Filter;
