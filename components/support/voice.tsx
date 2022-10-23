import useSWR from "swr";
import styled from "@emotion/styled";
import { User, Voice, VoiceCategory, VoiceStatus } from "@prisma/client";
import { COLOR } from "@shared/constants";

interface VoiceWithStatus extends Voice {
	status: VoiceStatus;
	category: VoiceCategory;
	user: User;
}

interface VoiceResponse {
	ok: boolean;
	voices: VoiceWithStatus[];
}

const Voices = () => {
	const { data } = useSWR<VoiceResponse>("/api/support/voice");
	return (
		<Container>
			{data?.voices.map((voice) => (
				<Article key={voice.id}>
					<StatusBox>
						<Status
							color={
								voice.category.id === 1
									? COLOR.confirm
									: voice.category.id === 2
									? COLOR.down
									: COLOR.darkgray
							}
						>
							{voice.category.category}
						</Status>
						<Status
							color={voice.status.id === 1 ? COLOR.purple : COLOR.darkgray}
						>
							{voice.status.status}
						</Status>
					</StatusBox>
					<Username>{voice.user.userId}</Username>

					{voice.voice}
				</Article>
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;

	margin-bottom: 50px;
`;

const Article = styled.div`
	border: 1px ${COLOR.border} solid;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 10px 20px;
	gap: 10px;
`;

const Username = styled.div`
	font-weight: 700;
	font-size: 18px;
`;

const StatusBox = styled.div`
	display: flex;
	gap: 10px;
`;

const Status = styled.div<{ color: string }>`
	font-size: 14px;
	color: ${(props) => props.color};
	border: 1px solid ${(props) => props.color};
	border-radius: 4px;
	padding: 2px 5px;
`;

export default Voices;
