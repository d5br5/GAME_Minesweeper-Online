import type { NextPage } from "next";
import Map from "@components/map/controller";
import Profile from "@components/map/profile";

interface HomeState {
	ok: boolean;
	cookie: string;
}

const Home: NextPage<HomeState> = () => {
	return (
		<>
			<Profile />
			<Map />
		</>
	);
};

export default Home;
