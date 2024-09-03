import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const { VITE_API_URL } = import.meta.env;

const UserInfoBar = () => {
	const { authUser } = useContext(AuthContext);
	return (
		<>
			{authUser && (
				<div className="col g-col-4">
					<div className="user-span">
						<span>
							<Link className="header-link navbar-brand" to="/users/profile">
								{authUser.username}
							</Link>
						</span>
					</div>

					{authUser.avatar ? (
						<Link to="/users/profile">
							<img src={`${VITE_API_URL}/${authUser.avatar}`} alt={`Avatar de ${authUser.username}`} />
						</Link>
					) : (
						<Link to="/users/profile">
							<img src="./public/188989.png" alt={`Avatar de ${authUser.username}`} />
						</Link>
					)}
				</div>
			)}
		</>
	);
};

export default UserInfoBar;
