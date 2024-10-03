// import ToggleTheme from "./ThemeComponent";
import { Link } from "react-router-dom";
import ToggleTheme from "./ThemeComponent";

const Footer = () => {
	return (
		<footer className="custom-footer bg-background-color-dark border-top py-3 z-3 position-fixed container-fluid">
			<div className="footer-icons d-flex justify-content-center align-items-centerj">
				<Link to="/" className="mx-3">
					<i className="bi bi-house"></i>
				</Link>
				<Link to="/search" className="mx-3">
					<i className="bi bi-search"></i>
				</Link>
				<Link to="/entries/NewEntry" className="mx-3">
					<i className="bi bi-plus-square"></i>
				</Link>
				<Link to="/users/profile" className="mx-3">
					<i className="bi bi-person"></i>
				</Link>
				<div className="">
					<ToggleTheme />
				</div>
			</div>
		</footer>
	);
};

export default Footer;
