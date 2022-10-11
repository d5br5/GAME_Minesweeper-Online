import React, {useState, useEffect} from "react";
import {
	collection,
	getDocs,
	getFirestore,
	orderBy,
	query,
} from "firebase/firestore";
import app from "../fbase";

import MainPresenter from "./MainPresenter";
import Loading from "../components/Loading";
import * as constants from "../assets/const";

Number.prototype.format = function () {
	if (this === 0) return "0";
	let reg = /(^[+-]?\d+)(\d{3})/;
	let n = this + "";
	while (reg.test(n)) n = n.replace(reg, "$1" + "," + "$2");
	return n;
};

String.prototype.format = function () {
	let num = parseFloat(this.toString());
	if (isNaN(num)) return "0";
	return num.format();
};

const MainController = () => {
	const [mode, setMode] = useState<string>(constants.MAP);
	const [init, setInit] = useState<boolean>(false);
	const [shopList, setShopList] = useState<Shop[]>([]);

	useEffect(() => {
		const db = getFirestore(app);

		async function getAllShops() {
			const q = query(collection(db, "geotest8"), orderBy("name"));
			const data = await getDocs(q);
			const list: Shop[] = [];
			data.forEach((onedata) => {
				const frame: Shop = {id: onedata.id, ...onedata.data()};
				list.push(frame);
			});
			list.sort((a, b) => parseInt(a.id) - parseInt(b.id));
			setShopList(list);
			setInit(true);
		}

		getAllShops();
	}, []);

	return init ? (
		<MainPresenter shopList={shopList} mode={mode} setMode={setMode} />
	) : (
		<Loading />
	);
};

export default MainController;
