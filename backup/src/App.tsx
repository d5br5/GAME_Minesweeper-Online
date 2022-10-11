import React from "react";
import {GlobalStyles} from "./styles";
import MainController from "./routes/MainController";

function App() {
	return (
		<div className="App">
			<GlobalStyles />
			<MainController />
		</div>
	);
}

export default App;
