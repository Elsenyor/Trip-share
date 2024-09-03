import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
// import ToggleTheme from "../components/ThemeComponent";

const LoginPage = () => {
	const { authLogin, authUser } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = (e) => {
		e.preventDefault();
		authLogin(email, password);
	};
	if (authUser) return <Navigate to="/"></Navigate>;
	return (
		<main className="d-flex align-items-center py-4 bg-body-tertiary">
			<div className="form-signin w-50 m-auto">
				<div className="w-50 m-auto">
					<form onSubmit={handleLogin}>
						<img className="mb-4" src="/takeoff.svg" alt="" width="72" height="57"></img>
						<h1 className="h3 mb-3 fw-normal">Tus credenciales</h1>
						<div className="form-floating">
							<input type="email" className="form-control border-secondary" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
							<label htmlFor="email">Dirección email</label>
						</div>
						<div className="form-floating">
							<input type="password" className="form-control border-secondary" id="password" onChange={(e) => setPassword(e.target.value)} />
							<label htmlFor="password">Contraseña</label>
						</div>
						<div className="d-flex justify-content-center mt-5">
							<button className="btn btn-dark w-50 py-2" type="submit">
								Entrar
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
