import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

// importamos los servicios

const RegisterPage = () => {
	const { authRegister, authUser } = useContext(AuthContext);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatedPass, setRepeatedPass] = useState("");

	// Funcion que maneja el envio del formulario
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			// Validamos que las contraseñas sean iguales
			if (password !== repeatedPass) {
				throw new Error("Las contraseñas no coinciden");
			}

			// Realizamos la petición al servidor
			authRegister(username, email, password);
		} catch (error) {
			alert(error.message);
		}
	};

	if (authUser) return <Navigate to="/"></Navigate>;

	return (
		<main className="d-flex align-items-center py-4 bg-body-tertiary">
			<div className="form-signin w-50 m-auto">
				<form onSubmit={handleSubmit}>
					<img className="mb-4" src="/takeoff.svg" alt="" width="72" height="57"></img>
					<h1 className="h3 mb-3 fw-normal">Registrarse</h1>
					<div className="form-floating">
						<input
							onChange={(e) => setUsername(e.target.value)}
							value={username}
							type="text"
							id="username"
							name="name"
							className="form-control border-secondary"
						/>
						<label htmlFor="username">Nombre de usuario:</label>
					</div>
					<div className="form-floating">
						<input
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							type="email"
							id="email"
							name="email"
							className="form-control border-secondary"
						/>
						<label htmlFor="email">Correo electrónico:</label>
					</div>
					<div className="form-floating">
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							type="password"
							id="password"
							name="password"
							className="form-control border-secondary"
						/>
						<label htmlFor="password">Contraseña:</label>
					</div>
					<div className="form-floating">
						<input
							onChange={(e) => setRepeatedPass(e.target.value)}
							value={repeatedPass}
							type="password"
							id="repeatedPass"
							name="password-confirm"
							className="form-control border-secondary"
						/>
						<label htmlFor="repeatedPass">Confirmar contraseña:</label>
					</div>
					<div className="d-flex justify-content-center mt-5">
						<button className="btn btn-dark w-50 py-2" type="submit">
							Registrarse
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default RegisterPage;
