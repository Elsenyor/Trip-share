import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ValidateUserPage from "./pages/ValidateUserPage";
import UserProfilePage from "./pages/UserProfilePage";
import NewEntryPage from "./pages/NewEntryPage";
import EntryPage from "./pages/EntryPage";
import RegisterPromo from "./pages/RegisterPromo";

// Inicializamos el componente.
const App = () => {
	return (
		<div className="app d-flex flex-column min-vh-100">
			<div className="">
				<Header />
			</div>

			{/* Set up toaster error or success messages */}
			<Toaster position="top-center" toastOption={{ duration: 6000 }} />
			{/* Element to render  */}
			<main className="flex-grow-1 container my-4 d-flex">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<NotFound />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/users/validate/:registrationCode" element={<ValidateUserPage />} />
					<Route path="/users/profile" element={<UserProfilePage />} />
					<Route path="/entries/NewEntry" element={<NewEntryPage />} />
					<Route path="/entries/:entryId" element={<EntryPage />} />
					<Route path="/RegisterPromo" element={<RegisterPromo />} />
				</Routes>
			</main>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default App;
