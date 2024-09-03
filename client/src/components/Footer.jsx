import ToggleTheme from "./ThemeComponent";

// Inicializamos el componente.
const Footer = () => {
	return (
		<footer className="custom-footer text-center bg-white border-top py-3">
			<ToggleTheme />
			<p className="mb-0 text-secondary">&copy; Diario de Viajes APP 2024</p>
		</footer>
	);
};

export default Footer;
