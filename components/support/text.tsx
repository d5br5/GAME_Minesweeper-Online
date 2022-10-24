import styled from "@emotion/styled";
import useMutation from "@libs/client/useMutation";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { authState } from "@shared/authState";
import { COLOR } from "@shared/constants";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

interface VoiceForm {
	desc: string;
	category: string;
}

const Text = () => {
	const auth = useRecoilValue(authState);
	const { register, handleSubmit, reset } = useForm<VoiceForm>();

	const [createVoice, { data, loading }] = useMutation("api/support/voice");

	const onValid = (data: VoiceForm) => {
		if (loading) return;
		createVoice({
			desc: data.desc,
			category: Number(data.category) || 1,
			token: auth.accessToken,
		});
	};

	useEffect(() => {
		if (data && data.ok) {
			reset();
		}
	}, [data, reset]);

	return (
		<Form onSubmit={handleSubmit(onValid)}>
			<Title>Support</Title>
			<OrderBox>
				<Box>
					<FormControl sx={{ minWidth: 120 }} size="small">
						<InputLabel id="demo-select-small">Category</InputLabel>
						<Select
							labelId="demo-select-small"
							id="demo-select-small"
							label="Category"
							defaultValue={1}
							disabled={!auth.isLoggedIn}
							{...register("category")}
						>
							<MenuItem value={1}>기능 개선</MenuItem>
							<MenuItem value={2}>정보 수정</MenuItem>
							<MenuItem value={3}>기타</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box>
					{auth.isLoggedIn ? (
						<Button type="submit" variant="contained">
							등록
						</Button>
					) : (
						<Link href={"/login"}>
							<Button variant="contained">로그인</Button>
						</Link>
					)}
				</Box>
			</OrderBox>
			<TextField
				id="outlined-textarea"
				disabled={!auth.isLoggedIn}
				multiline
				{...register("desc", { required: true })}
			/>
		</Form>
	);
};

const OrderBox = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px; ;
`;

const Box = styled.div`
	display: flex;
	gap: 10px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin-bottom: 40px;
`;

const Title = styled.div`
	font-weight: 900;
	font-size: 30px;
	color: ${COLOR.main};
	margin-bottom: 20px;
`;

export default Text;
