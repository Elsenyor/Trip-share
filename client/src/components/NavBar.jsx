import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
	const { authLogout, authUser } = useContext(AuthContext);
	return (
		<div className="col g-col-auto">
			<i className="fa fa-bars" aria-hidden="true"></i>
			<nav className="navbar nav-pos">
				<ul className="row align-items-center">
					{!authUser ? (
						<>
							<li className="col">
								<Link className="header-link navbar-brand" to="/register">
									Registrarse
								</Link>
							</li>
							<li className="col">
								<Link className="header-link navbar-brand" to="/login">
									Iniciar sesión
								</Link>
							</li>
						</>
					) : (
						<>
							<div className="dropdown">
								<button className="btn dropdown-toggle me-5" id="NavBar-button" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<img className="rounded-0" src="/menu.svg" alt="" />
								</button>
								<ul className="dropdown-menu">
									<li>
										<Link className="dropdown-item" to="/users/profile">
											Mi perfil
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="/entries/NewEntry">
											Nueva entrada
										</Link>
									</li>
									<li>
										<button className="dropdown-item" onClick={authLogout}>
											Cerrar sesión
										</button>
									</li>
								</ul>
							</div>

							{/* <img className="" src="/grid-3x3-gap.svg" alt="" /> */}
							{/* <li className="col">
								<Link className="header-link navbar-brand" to="/users/profile">
									Mi perfil
								</Link>
							</li>
							<li className="col">
								<Link className="header-link navbar-brand" to="/entries/NewEntry">
									Nueva entrada
								</Link>
							</li>
							<li className="col">
								<button className="header-btn navbar-toggler" onClick={authLogout}>
									Cerrar sesión
								</button>
							</li> */}
						</>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
