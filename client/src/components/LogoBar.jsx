import { Link } from "react-router-dom";

const LogoBar = () => {
	return (
		<div className="d-flex align-items-center justify-content-center">
			<Link className="header-link icon-link" to="/">
				<h1 className="">Trip Share</h1>
			</Link>
		</div>
	);
};

export default LogoBar;
