import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as constants from "../assets/const";

interface Iprops {
	setMode: React.Dispatch<React.SetStateAction<string>>;
}

const Navigator = ({setMode}: Iprops) => {
	return (
		<ButtonGroup
			variant="contained"
			sx={{position: "absolute", top: "50px", zIndex: 1000}}
			aria-label="outlined primary button group"
		>
			<Button onClick={() => setMode(constants.MAP)}>{constants.MAP}</Button>
			<Button onClick={() => setMode(constants.LIST)}>{constants.LIST}</Button>
		</ButtonGroup>
	);
};

export default Navigator;
