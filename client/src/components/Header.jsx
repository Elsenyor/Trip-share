import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NavBar from "./NavBar";
import LogoBar from "./LogoBar";
import UserInfoBar from "./UserInfoBar";
// Inicializamos el componente.
const Header = () => {
	const { authUser } = useContext(AuthContext);
	return (
		<header className="header sticky-top bg-white border-bottom">
			<div className="row mx-0 align-items-center">
				{!authUser ? (
					<>
						<div className="col-4">
							<LogoBar />
						</div>
						<div className="col-4 text-end">
							<NavBar />
						</div>
					</>
				) : (
					<>
						<div className="col-4">
							<LogoBar />
						</div>
						<div className="col-4 text-center">
							<UserInfoBar />
						</div>
						<div className="col-4 text-end">
							<NavBar />
						</div>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
