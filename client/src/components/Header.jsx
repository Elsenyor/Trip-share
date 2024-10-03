import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoBar from "./LogoBar";
const Header = () => {
	const { authUser } = useContext(AuthContext);
	return (
		<header className="bg-background-color-dark border-bottom z-3 position-sticky">
			<div className="row mx-0 align-items-center">
				{!authUser ? (
					<>
						<div className="col-4">
							<LogoBar />
						</div>
					</>
				) : (
					<>
						<LogoBar />
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
