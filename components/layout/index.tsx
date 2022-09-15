import Nav from "@components/layout/nav";
import styled from "@emotion/styled";

interface LayoutProps {
	children: React.ReactNode;
	title: string;
}

const Layout = ({ children, title }: LayoutProps) => {
	return (
		<Container>
			<Nav title={title} />
			<Children>{children}</Children>
		</Container>
	);
};

const Children = styled.div`
	margin: 0 auto;
	width: 800px;
`;

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding-top: 100px;
	justify-content: center;
`;

export default Layout;
