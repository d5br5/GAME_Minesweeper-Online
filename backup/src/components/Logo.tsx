import React from "react";
import logo from "../assets/logoflat.png";
import styled from "styled-components";

const Container = styled.div`
	position: absolute;
	top: 40px;
	left: 90px;
	z-index: 30;
`;

const IMG = styled.img`
	@media only screen and (min-width: 1300px) {
		width: 150px;
	}

	@media only screen and (max-width: 1300px) {
		width: 80px;
	}
	@media only screen and (max-width: 699px) {
		width: 40px;
	}
`;

const Logo = () => {
	return (
		<Container>
			<IMG src={logo} alt="" />
		</Container>
	);
};

export default Logo;
