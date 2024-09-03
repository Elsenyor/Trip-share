import PropTypes from "prop-types";

const Button = ({ text, type, onClick }) => {
	return (
		<button className="btn btn-dark w-50 py-2" type={type} onClick={onClick}>
			{text}
		</button>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	type: PropTypes.string,
};

export default Button;
