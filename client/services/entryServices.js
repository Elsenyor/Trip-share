/* eslint-disable no-unused-vars */
const { VITE_API_URL } = import.meta.env;
const setHeaders = () => {
	const config = {};
	const token = localStorage.getItem("authToken");
	if (!token) {
		return config;
	}
	config.headers = {
		authorization: token,
	};
	return config;
};
export const selectAllEntriesService = async () => {
	// Obtenemos la respuesta del servidor
	const res = await fetch(`${VITE_API_URL}/api/entries`, setHeaders());

	const body = await res.json();

	// Si hay algún error, lo lanzamos
	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data;
};

export const selectEntriesPageService = async (page = 1) => {
	// Ajustar la URL para incluir el parámetro de página
	const res = await fetch(`${VITE_API_URL}/api/entries?page=${page}`, setHeaders());

	const body = await res.json();

	// Si hay algún error, lo lanzamos
	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data;
};

export const createEntryService = async (formData) => {
	const res = await fetch(`${VITE_API_URL}/api/entries`, {
		method: "POST",
		headers: {
			authorization: localStorage.getItem("authToken"),
		},
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const insertPhotoService = async ({ entryId, formData }) => {
	const res = await fetch(`${VITE_API_URL}/api/entries/${entryId}/photos`, {
		method: "POST",
		headers: {
			authorization: localStorage.getItem("authToken"),
		},
		body: formData,
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const getEntryService = async (entryId) => {
	const res = await fetch(`${VITE_API_URL}/api/entries/${entryId}`);
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};

export const voteEntryService = async (entryId, rating) => {
	const res = await fetch(`${VITE_API_URL}/api/entries/${entryId}/votes`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: localStorage.getItem("authToken"),
		},
		body: JSON.stringify({ value: rating }),
	});
	const body = await res.json();
	if (body.status === "error") {
		throw new Error(body.message);
	}
	return body.data;
};
