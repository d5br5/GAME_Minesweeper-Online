import styled from "@emotion/styled";
import { COLOR } from "@shared/constants";

const Notice = () => {
	return (
		<Container>
			<Title>Notice</Title>
			<Desc>
				<Strong>Prism:Station</Strong>을 이용해주셔서 감사합니다. <br />
				전국 셀프스튜디오 중 서울 지역과, <br />
				점포 40개 미만 프랜차이즈 부스 정보만 제공됩니다. <br />
				빠른 시일 내에 추가하도록 하겠습니다. <br />
				서비스 기능 개선 및 정보 수정 문의는 아래 양식을 통해 남겨주시면
				반영하겠습니다. <br />
			</Desc>
			<Thanks>Thank you!</Thanks>
		</Container>
	);
};

const Container = styled.div`
	margin-bottom: 50px;
	padding-bottom: 30px;
	border-bottom: 1px ${COLOR.border} solid;
`;

const Title = styled.div`
	font-weight: 900;
	font-size: 30px;
	color: ${COLOR.main};
`;

const Thanks = styled.div`
	font-weight: 700;
`;

const Strong = styled.span`
	font-weight: 700;
`;

const Desc = styled.p`
	line-height: 32px;
`;

export default Notice;
