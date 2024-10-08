import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import EntryList from "../components/EntryList";

const Home = () => {
	const { authUser } = useContext(AuthContext);
	return (
		<>
			{!authUser ? (
				<>
					<li className="row">
						<div className="col-12 col-md-6">
							<h1 className="display-4 text-center">Bienvenido a TripShare</h1>
							<p className="lead text-center">La mejor plataforma para compartir tus viajes</p>
							<div className="d-flex justify-content-center">
								<Link to="/register" className="btn btn-primary me-2">
									Registrarse
								</Link>
								<Link to="/login" className="btn btn-secondary">
									Iniciar sesión
								</Link>
							</div>
						</div>
						<div className="col-12 col-md-6">
							<img src="/blogging.svg" alt="blogging" className="img-fluid" />
						</div>
					</li>
				</>
			) : (
				<>
					<div className="container d-flex flex-column container-fluid ">
						<EntryList />
					</div>
				</>
			)}
		</>
	);
};

export default Home;
