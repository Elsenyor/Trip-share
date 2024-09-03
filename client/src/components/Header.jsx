import NavBar from "./NavBar";
import LogoBar from "./LogoBar";
import UserInfoBar from "./UserInfoBar";
// Inicializamos el componente.
const Header = () => {
	return (
		<header className="header sticky-top bg-white border-bottom">
			<div className="row mx-0 align-items-center">
				<div className="col-4">
					<LogoBar />
				</div>
				<div className="col-4 text-center">
					<UserInfoBar />
				</div>
				<div className="col-4 text-end">
					<NavBar />
				</div>
			</div>
		</header>
	);
};

export default Header;
