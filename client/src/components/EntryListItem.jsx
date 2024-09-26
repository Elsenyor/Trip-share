import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReactStars from "./react-stars/react-stars.jsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;
import { voteEntryService } from "../../services/entryServices";

const EntryListItem = ({ entry }) => {
	const [rating, setRating] = useState(entry.votes);
	const { authUser } = useContext(AuthContext);

	const handleChange = (newRating) => {
		setRating(newRating);
		voteEntryService(entry.id, newRating)
			.then((response) => response.json())
			.then((data) => {
				data;
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className="card mb-3 card-container p-0">
			<img
				className="card-img-top"
				src={entry.photos[0]?.name ? `${VITE_API_URL}/${entry.photos[0]?.name}` : "/default-entry.jpg"}
				alt={entry.place}
			/>

			<div className="card-body">
				<h3 className="card-title cinzel-card">{entry.title}</h3>

				<div className="card-text mb-3 d-flex align-items-center">
					<img className="me-1 ddv-icon" src="/globe-americas.svg" alt="Lugar" />
					{entry.place}
				</div>

				<div className="card-text mb-3 d-flex align-items-center">
					<img className="me-1 ddv-icon" src="/person-circle.svg" alt="Usuario" />
					{entry.username}
				</div>

				<div className="mb-3">
					<ReactStars
						count={5}
						value={rating}
						onChange={handleChange}
						size={24}
						activeColor="#ffd700"
						isHalf={true}
						enableHoverEffect={!entry.votedByMe}
					/>
					<p>{rating}</p>
				</div>

				{authUser ? (
					<Link className="btn btn-dark" to={`/entries/${entry.id}`}>
						Ir a entrada
					</Link>
				) : (
					<Link className="btn btn-dark" to={`/RegisterPromo`}>
						Ir a entrada
					</Link>
				)}
			</div>
		</div>
	);
};

EntryListItem.propTypes = {
	entry: PropTypes.object.isRequired,
};

export default EntryListItem;
