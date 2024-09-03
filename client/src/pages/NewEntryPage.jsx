import { useRef } from "react";
import toast from "react-hot-toast";

import { createEntryService } from "../../services/entryServices";

const NewEntryPage = () => {
	const titleRef = useRef();
	const placeRef = useRef();
	const descriptionRef = useRef();
	const photosRef = useRef();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = titleRef.current.value;
		const place = placeRef.current.value;
		const description = descriptionRef.current.value;
		const photos = photosRef.current.files;

		const formData = new FormData();
		formData.append("title", title);
		formData.append("place", place);
		formData.append("description", description);
		for (let i = 0; i < photos.length; i++) {
			formData.append("photos", photos[i]);
		}
		try {
			await createEntryService(formData);
			titleRef.current.value = "";
			placeRef.current.value = "";
			descriptionRef.current.value = "";
			photosRef.current.value = "";
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<main className="d-flex align-items-center py-4 bg-body-tertiary">
			<div className="form-signin w-50 m-auto">
				<form onSubmit={handleSubmit}>
					<h1 className="h3 mb-3 fw-normal">Crear nueva entrada</h1>
					<div className="form-floating">
						<input className="form-control border-secondary" type="text" id="title" name="title" required ref={titleRef} />
						<label htmlFor="title">Título</label>
					</div>
					<div className="form-floating">
						<input className="form-control border-secondary" type="text" id="place" name="place" required ref={placeRef} />
						<label htmlFor="place">Lugar</label>
					</div>
					<div className="form-floating">
						<textarea className="form-control border-secondary" id="description" name="description" required ref={descriptionRef}></textarea>
						<label htmlFor="description">Descripción</label>
					</div>
					<div className="form-floating">
						<input className="form-control border-secondary" type="file" id="photos" name="photo" multiple required ref={photosRef} />
						<label htmlFor="photos">Fotos</label>
					</div>
					<div>
						<button className="btn btn-dark w-50 py-2" type="submit">
							Enviar
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default NewEntryPage;
