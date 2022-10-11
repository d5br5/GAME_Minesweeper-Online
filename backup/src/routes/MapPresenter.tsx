import React, {useEffect} from "react";
import styled from "styled-components";
import {getMarker} from "../assets/getMarker";
import {getFirestore, doc, updateDoc, increment} from "firebase/firestore";
import app from "../fbase";

const {naver} = window;

const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

interface Iprops {
	shopList: Shop[];
}

const MapPresenter = ({shopList}: Iprops) => {
	useEffect(() => {
		const db = getFirestore(app);

		async function onCountClick(location: string) {
			const mapRef = doc(db, "counts", location);
			await updateDoc(mapRef, {
				count: increment(1),
			});
		}

		// const HOME_PATH = window.HOME_PATH || ".";
		const HOME_PATH = ".";
		const container = document.getElementById("map") || "";
		const options = {
			center: new naver.maps.LatLng(37.5414106, 127.0099779),
			zoom: 13,
		};
		const map = new naver.maps.Map(container, options);

		let arr = shopList.map((shop) => [shop.lat, shop.lng]);
		let latlngs = getMarker(arr);

		for (let i = 0, ii = latlngs.length; i < ii; i++) {
			const position = latlngs[i];
			let content = `
            <div style="padding:15px 20px; display: flex; flex-direction: column">
                <div style="text-align: center; font-weight: 800; font-size: 18px; margin-bottom: 20px">${
									shopList[i].name
								}</div>
                <div style="margin: auto">
                    <div style="margin-bottom: 7px">네이버 평점 : ${
											shopList[i].grade === "x"
												? "정보 없음"
												: `${shopList[i].grade} / 5.0`
										}</div>
                    <div style="margin-bottom: 13px">네이버 블로그 리뷰 수 : ${
											shopList[i].reviewNum
										}개</div>
                    <div style="margin-bottom: 7px">기준 가격 : ${
											shopList[i].basePrice === "x"
												? "정보 없음"
												: `${shopList[i].basePrice.format()}원`
										}</div>
                    <div style="margin-bottom: 13px">기준 인원 : ${
											shopList[i].basePeople === "x"
												? "정보 없음"
												: `${shopList[i].basePeople}명`
										}</div>
                    <div style="margin-bottom: 13px">연락처 : ${
											shopList[i].contact
										}</div>
                    <div style="margin-bottom: 2px; display: flex; flex-direction: row; justify-content: space-around">
                        <a href=${
													shopList[i].reservationLink
												} rel="noreferrer" target="_blank"> 
                            <button  style="border: 1px #e74c3c solid; border-radius:2px; background-color: white; color: #e74c3c; line-height: 17px">예약하기</button>
                        </a>
                        <a href=${
													shopList[i].website
												} rel="noreferrer" target="_blank">
                            <button style="border: 1px #2980b9 solid; border-radius:2px; background-color: white; color: #2980b9;  line-height: 17px">홈페이지</button>
                        </a>
                    </div>
                </div>
            </div>    
            `;

			const icon = {
				url: HOME_PATH + "/img/example/sp_pins_spot_v3.png",
				size: new naver.maps.Size(24, 37),
				anchor: new naver.maps.Point(12, 37),
				origin: new naver.maps.Point(i * 29, 0),
			};
			const marker = new naver.maps.Marker({position, map, icon});
			const infowindow = new naver.maps.InfoWindow({content});

			naver.maps.Event.addListener(marker, "click", function (e) {
				if (infowindow.getMap()) {
					infowindow.close();
				} else {
					infowindow.open(map, marker);
					onCountClick("mapclick");
				}
			});
		}
	}, [shopList]);

	return <Container id="map" style={{width: "100%", height: "100vh"}} />;
};

export default MapPresenter;
