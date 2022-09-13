import Nav from "@components/layout/nav";
import styled from "@emotion/styled";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			<Nav />
			<Children>{children}</Children>
		</div>
	);
};

const Children = styled.div`
	margin: 0 auto;
	width: 800px;
`;

export default Layout;
