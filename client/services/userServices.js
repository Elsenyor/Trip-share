const { VITE_API_URL } = import.meta.env;

// Función que realiza una petición al servidor para registrar un usuario
export const singUpService = async (username, email, password) => {
	// Obtenemos la respuesta del servidor
	const res = await fetch(`${VITE_API_URL}/api/users/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, email, password }),
	});

	const body = await res.json();

	// Si hay algún error, lo lanzamos
	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.message;
};

export const loginService = async (email, password) => {
	const res = await fetch(`${VITE_API_URL}/api/users/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const body = await res.json();

	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data.token;
};

// Función que realiza una petición al servidor para validar un usuario
export const activateUserService = async (registrationCode) => {
	// Obtenemos la respuesta del servidor
	const res = await fetch(`${VITE_API_URL}/api/users/validate/${registrationCode}`, {
		method: "PUT",
	});
	// Obtenemos el body de la respuesta convirtiéndolo de JSON a JS {}
	const body = await res.json();

	// Si hay algún error, lo lanzamos
	if (body.status === "error") {
		throw new Error(body.message);
	}
};

// Funcion que retorna los datos del usuario que esta logueado
export const getPrivateProfileService = async (authToken) => {
	// Obtenemos la respuesta del servidor
	const res = await fetch(`${VITE_API_URL}/api/users`, {
		headers: {
			Authorization: authToken,
		},
	});

	// Obtenemos el body de la respuesta convirtiéndolo de JSON a JS {}
	const body = await res.json();

	// Si hay algún error, lo lanzamos
	if (body.status === "error") {
		throw new Error(body.message);
	}

	// Retornamos los datos del usuario
	return body.data.user;
};

export const updateUserAndEmailService = async (username, email, authToken) => {
	// Obtenemos la respuesta del servidor
	const res = await fetch(`${VITE_API_URL}/api/users`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: authToken,
		},
		body: JSON.stringify({ username, email }),
	});

	const body = await res.json();

	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data.user;
};

// Es importante el orden de las lo que reciba la función, primero el avatar y luego el token ya que si no reconoce el avatar como un objeto

export const updateAvatarService = async (avatar, authToken) => {
	// creamos un objeto FormData
	const formData = new FormData();
	// añadimos la imagen al objeto formData
	formData.append("avatar", avatar);

	// Obtenemos la respuesta del servidor
	const res = await fetch(`${VITE_API_URL}/api/users/avatar`, {
		method: "PUT",
		headers: {
			Authorization: authToken,
		},
		body: formData,
	});
	const body = await res.json();

	if (body.status === "error") {
		throw new Error(body.message);
	}

	return body.data.avatar.name;
};
