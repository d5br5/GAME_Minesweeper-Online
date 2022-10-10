import styled from "@emotion/styled";
import { NextPage } from "next";
import { useEffect } from "react";

const { naver } = global;

const MapController: NextPage = () => {
	useEffect(() => {
		const container = document.getElementById("map") || "";

		const options = {
			center: new naver.maps.LatLng(37.5414106, 127.0099779),
			zoomControl: true,
			zoom: 13,
			zoomControlOptions: {
				style: naver.maps.ZoomControlStyle.LARGE,
				position: naver.maps.Position.RIGHT_BOTTOM,
			},
		};
		const map = new naver.maps.Map(container, options);
	}, []);
	return <Container id="map"></Container>;
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

export default MapController;
