import Nav from "@components/layout/nav";
import styled from "@emotion/styled";
import { COLOR } from "@shared/constants";

interface LayoutProps {
	children: React.ReactNode;
	title?: string;
}

const Layout = ({ children, title = "Prism-Station" }: LayoutProps) => {
	return (
		<Container>
			<Nav title={title} />
			<Children>{children}</Children>
		</Container>
	);
};

const Children = styled.div`
	margin: 0 auto;
	max-width: 800px;
	width: 100%;
`;

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding-top: 100px;
	justify-content: center;
	background-color: ${COLOR.background};
`;

export default Layout;
