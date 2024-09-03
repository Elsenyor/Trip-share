import { Link } from "react-router-dom";

const LogoBar = () => {
	return (
		<div className="col d-flex logo-container">
			<Link className="header-link icon-link" to="/">
				<h1 className="col">Diario de Viajes</h1>
				<img className="mx-auto row rounded float-start profile-photo" src="/diario-viajes-logo.svg" alt="Logo de mi página" />
			</Link>
		</div>
	);
};

export default LogoBar;
