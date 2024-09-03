/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import Button from "../components/jsxComponents/Button";

const UserProfilePage = () => {
	const { authUser, authEditUserAndEmail, authEditAvatar } = useContext(AuthContext);
	const [username, setUsername] = useState(authUser?.username);
	const [email, setEmail] = useState(authUser?.email);
	const [avatar, setAvatar] = useState(null);
	const handleUsernameAndEmail = (e) => {
		e.preventDefault();
		authEditUserAndEmail(username, email);
	};
	const handleAvatar = (e) => {
		e.preventDefault();
		authEditAvatar(avatar);
	};

	if (!authUser) return <Navigate to="/login"></Navigate>;
	return (
		<main className="d-flex align-items-center py-4 bg-body-tertiary flex-grow-1">
			<div className="form-signin w-25 m-auto">
				<form onSubmit={handleUsernameAndEmail}>
					<h1 className="h3 mb-3 fw-normal">Tu perfil</h1>
					<div className="form-floating">
						<input
							className="form-control border-secondary"
							type="text"
							id="username"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label htmlFor="username"> Usuario: </label>
					</div>
					<div className="form-floating">
						<input className="form-control border-secondary" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<label htmlFor="email"> Email: </label>
					</div>
					<div className="form-floating">
						<Button text="Editar" type="submit" />
					</div>
				</form>

				<form onSubmit={handleAvatar}>
					<div className="form-floating">
						<input
							className="form-control border-secondary"
							type="file"
							accept="image/png, image/jpg"
							required
							onChange={(e) => setAvatar(e.target.files[0])}
						/>
						<Button text="Subir avatar" type="submit" />
					</div>
				</form>
			</div>
		</main>
	);
};

export default UserProfilePage;
