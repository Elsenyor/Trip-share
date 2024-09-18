import { useEffect, useContext } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { activateUserService } from "../../services/userServices";

const ValidateUserPage = () => {
	const { registrationCode } = useParams();
	const navigate = useNavigate();
	const { authUser } = useContext(AuthContext);
	useEffect(() => {
		const fetchValidateUser = async () => {
			try {
				await activateUserService(registrationCode);
				toast.success("¡Usuario activado!");
				navigate("/login");
			} catch (error) {
				toast.error("¡Código de activación incorrecto!");
				navigate("/register");
			}
		};
		if (!authUser) {
			fetchValidateUser();
		}
	}, [registrationCode, navigate, authUser]);

	if (authUser) return <Navigate to="/"></Navigate>;

	return (
		<div>
			<h1>Página de validación de usuario</h1>
		</div>
	);
};

export default ValidateUserPage;
