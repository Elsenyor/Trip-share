import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { singUpService, loginService, getPrivateProfileService, updateUserAndEmailService, updateAvatarService } from "../../services/userServices";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		const fetchPrivateProfile = async () => {
			try {
				const user = await getPrivateProfileService(authToken);
				setAuthUser(user);
			} catch (error) {
				toast.error("Sesión expirada, vuelva a iniciar sesión");
			}
		};
		if (authToken) {
			fetchPrivateProfile();
		}
	}, [authToken]);
	const authRegister = async (username, email, password) => {
		try {
			const message = await singUpService(username, email, password);
			toast.success(message);
			navigate("/login");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const authLogin = async (email, password) => {
		try {
			const authToken = await loginService(email, password);
			setAuthToken(authToken);
			localStorage.setItem("authToken", authToken);
		} catch (error) {
			toast.error(error.message);
		}
	};
	const authLogout = () => {
		setAuthToken(null);
		setAuthUser(null);
		localStorage.removeItem("authToken");
	};

	const authEditUserAndEmail = async (username, email) => {
		try {
			const user = await updateUserAndEmailService(username, email, authToken);
			setAuthUser({ ...authUser, username: user.username || authUser.username, email: user.email || authUser });
			toast.success("Usuario actualizado");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const authEditAvatar = async (avatar) => {
		try {
			const avatarName = await updateAvatarService(avatar, authToken);
			setAuthUser({ ...authUser, avatar: avatarName });
			toast.success("Avatar actualizado");
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<AuthContext.Provider value={{ authLogin, authRegister, authToken, authLogout, authUser, authEditUserAndEmail, authEditAvatar }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
