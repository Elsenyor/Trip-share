import { useEffect, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { activateUserService } from "../../services/userServices";

const ValidateUserPage = () => {
	// Obtenemos los parámetros de la URL (path.param) y los guardamos en una variable
	const { registrationCode } = useParams();
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext);

	// utilizamos un useEffect para validar al usuario cuando se monte el componente
	useEffect(() => {
		const fetchValidateUser = async () => {
			try {
				// Llamamos a la función que valida al usuario y le pasamos el registrationCode que recibimos por parámetros
				await activateUserService(registrationCode);
				toast.success("¡Usuario activado!");
				// Si todo va bien, redirigimos al usuario a la página de login
				navigate("/login");
			} catch (error) {
				toast.error("¡Código de activación incorrecto!");
				navigate("/register");
			}
		};
		if (!authUser) {
			fetchValidateUser();
		}

		// Llamamos a la función fetchValidateUser
	}, [registrationCode, navigate, authUser]);

	if (authUser) return <Navigate to="/"></Navigate>;

	return (
		<div>
			<h1>Página de validación de usuario</h1>
		</div>
	);
};

export default ValidateUserPage;
