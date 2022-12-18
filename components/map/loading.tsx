import styled from "@emotion/styled";
import { Alert } from "@mui/material";

const Loading = () => {
	return (
		<Container>
			<Alert icon={false} severity="success" c>
				스튜디오 정보를 불러오고 있습니다.
			</Alert>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	z-index: 300;
	position: fixed;
`;

export default Loading;
