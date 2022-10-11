import React from "react";
import Shop from "../components/Shop";
import styled from "styled-components";
// import {setDoc, getFirestore, doc} from "firebase/firestore";
// import app from "../fbase";

const Container = styled.div`
	margin-top: 90px;
	width: 1200px;

	@media only screen and (max-width: 1300px) {
		width: 100%;
	}
`;

// const upload = async () => {
// 	const db = getFirestore(app);
// 	for (let i = 0; i < infos.length; i++) {
// 		const data = infos[i];
// 		await setDoc(doc(db, "geotest8", i.toString()), data);
// 	}
// };

interface Iprops {
	shopList: Shop[];
}

const ListPresenter = ({shopList}: Iprops) => {
	return (
		<Container>
			{/*<button onClick={upload}> upload</button>*/}
			{shopList.map((shop, i) => (
				<Shop key={i} shop={shop} index={i} />
			))}
		</Container>
	);
};

export default ListPresenter;
