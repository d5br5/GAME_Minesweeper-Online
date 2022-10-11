import styled from "@emotion/styled";
import { COLOR } from "@shared/constants";
import { authState } from "@shared/authState";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { ShopWithFavs } from ".";
const { naver } = global;

const Builder: NextPage<{ shops: ShopWithFavs[] }> = ({ shops }) => {
	const auth = useRecoilValue(authState);
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
		for (let shop of shops) {
			let content = document.createElement("div");
			content.style["padding"] = "20px";
			content.style["display"] = "flex";
			content.style["flexDirection"] = "column";
			content.style["alignItems"] = "center";
			content.style["position"] = "relative";
			content.style["gap"] = "10px";

			content.innerHTML += `
				<div
					style="text-align:center;
					font-size: 18px;
					font-weight:700;
					margin-bottom: 10px">
					${shop.name}
				</div>
				<div>주소 : 서울시 강남구 효창동</div>
				<div>contact : ${shop.contact}</div>
				<a href="${shop.url}" target="_blank">
					<div
						style="padding: 1px 10px; border: 1px solid ${COLOR.up}; color: ${COLOR.up}; border-radius: 5px; margin-top:10px; font-size: 13px; font-weight:700; line-height:20px;">more</div>
				</a>
			`;

			let heart = document.createElement("div");
			heart.style["border"] = "1px solid black";
			heart.style["borderRadius"] = "50%";
			heart.style["width"] = "25px";
			heart.style["height"] = "25px";
			heart.style["textAlign"] = "center";
			heart.style["position"] = "absolute";
			heart.style["top"] = "17px";
			heart.style["right"] = "17px";
			heart.style["fontWeight"] = "900";
			heart.style["lineHeight"] = "24px";
			heart.style["cursor"] = "pointer";
			heart.style["padding"] = "2px";
			heart.style["transition"] = "all ease 0.3s";
			heart.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`;

			if (auth.isLoggedIn) {
				let clicked = shop.favs.filter((a) => a.user.userId === auth.userId).length > 0;
				if (clicked) {
					heart.style["color"] = COLOR.white;
					heart.style["border"] = `1px solid ${COLOR.main}`;
					heart.style["backgroundColor"] = COLOR.main;
				}
				heart.addEventListener("click", () => {
					if (clicked) {
						heart.style["color"] = COLOR.black;
						heart.style["border"] = "1px solid black";
						heart.style["backgroundColor"] = "white";
					} else {
						heart.style["color"] = COLOR.white;
						heart.style["border"] = `1px solid ${COLOR.main}`;
						heart.style["backgroundColor"] = COLOR.main;
					}
					clicked = !clicked;
				});
			} else {
				heart.addEventListener("click", () => alert("찜하기는 로그인 후 이용 가능합니다. "));
			}
			content.appendChild(heart);

			const position = new naver.maps.LatLng(shop.lat, shop.lng);
			const marker = new naver.maps.Marker({ position, map: map! });
			const infowindow = new naver.maps.InfoWindow({ content });

			marker.addListener("click", () => {
				if (infowindow.getMap()) {
					infowindow.close();
				} else {
					infowindow.open(map!, marker);
				}
			});
		}
	}, [shops, auth]);

	return <Container id="map" />;
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
`;

export default Builder;
