/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import toast from "react-hot-toast";
const { VITE_API_URL } = import.meta.env;
import { getEntryService } from "../../services/entryServices.js";

const EntryPage = () => {
	const { entryId } = useParams();
	const [entry, setEntry] = useState({});
	useEffect(() => {
		const fetchEntry = async () => {
			try {
				const { entry } = await getEntryService(entryId);
				console.log(entry);
				setEntry(entry);
			} catch (error) {
				toast.error("¡Error al cargar la entrada!");
			}
		};
		fetchEntry();
	}, [entryId]);

	return (
		<main className="entry-page">
			<div className="entry-title">
				<h1>{entry.title}</h1>
			</div>
			<div className="entry-photo">
				{entry.photos?.length > 0 ? <img src={`${VITE_API_URL}/${entry.photos[0]?.name}`} alt="" /> : <img src="/default-entry.jpg" alt="" />}
			</div>
			<div className="entry-info">
				<p>
					<strong>Lugar: </strong>
					{entry.place}
				</p>
				<p>
					<strong>Descripción: </strong>
					{entry.description}
				</p>
				<p>
					<strong>Creado por: </strong>
					{entry.username}
				</p>
				<p>
					<strong>Media de votos: </strong>
					{!entry.votes ? "Sin votos" : entry.votes}
				</p>
				<p>
					<strong>Fecha de creación: </strong>
					{moment(entry.createdAt).format("DD/MM/YYYY [a las] HH:mm")}
				</p>
			</div>
		</main>
	);
};

export default EntryPage;
