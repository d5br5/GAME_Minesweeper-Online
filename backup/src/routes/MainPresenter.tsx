import styled from "styled-components";
import ListPresenter from "./ListPresenter";
import * as constants from "../assets/const";
import Navigator from "../components/Navigator";
import Filter from "../components/Filter";
import MapPresenter from "./MapPresenter";
import {useState} from "react";
import {useMediaQuery} from "react-responsive";
import Logo from "../components/Logo";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
`;

interface Iprops {
	shopList: Shop[];
	mode: string;
	setMode: React.Dispatch<React.SetStateAction<string>>;
}

const MainPresenter = ({shopList, mode, setMode}: Iprops) => {
	const [filterList, setFilterList] = useState<any[][]>([]);
	const [filterEditing, setFilterEditing] = useState<boolean>(true);

	const filterFn = (shop: Shop) => {
		const minPriceStandard = parseInt(shop.basePrice) >= filterList[0][0];
		const maxPriceStandard = parseInt(shop.basePrice) <= filterList[0][1];
		const PriceStandard =
			(minPriceStandard && maxPriceStandard) || shop.basePrice === "x";

		const minGradeStandard = parseFloat(shop.grade) >= filterList[1][0];
		const maxGradeStandard = parseFloat(shop.grade) <= filterList[1][1];
		const GradeStandard = minGradeStandard && maxGradeStandard;

		const LocationStandard =
			filterList[2].length === 0 || filterList[2].includes(shop.location);

		return PriceStandard && GradeStandard && LocationStandard;
	};
	const isTabletOrMobile = useMediaQuery({maxWidth: 1300});

	return (
		<Container>
			{!isTabletOrMobile && <Logo />}
			{!isTabletOrMobile && <Navigator setMode={setMode} />}
			<Filter
				setFilterEditing={setFilterEditing}
				filterEditing={filterEditing}
				setFilterList={setFilterList}
			/>

			{mode === constants.LIST && (
				<ListPresenter
					shopList={
						filterList?.length === 0 ? shopList : shopList.filter(filterFn)
					}
				/>
			)}
			{mode === constants.MAP && (
				<MapPresenter
					shopList={
						filterList?.length === 0 ? shopList : shopList.filter(filterFn)
					}
				/>
			)}
		</Container>
	);
};

export default MainPresenter;
