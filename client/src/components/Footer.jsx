// import ToggleTheme from "./ThemeComponent";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="custom-footer bg-white border-top py-3 z-3 position-fixed">
			<div className="footer-icons d-flex justify-content-center">
				<Link href="/" className="mx-3">
					<i className="bi bi-house"></i>
				</Link>
				<Link href="/search" className="mx-3">
					<i className="bi bi-search"></i>
				</Link>
				<Link href="/add" className="mx-3">
					<i className="bi bi-plus-square"></i>
				</Link>
				<Link href="/profile" className="mx-3">
					<i className="bi bi-person"></i>
				</Link>
			</div>
			{/* <div className="">
				<ToggleTheme />
			</div> */}
		</footer>
	);
};

export default Footer;
