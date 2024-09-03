import { useState, useCallback } from "react";

export default function useConfig(initialConfig) {
	const [config, setConfigState] = useState(initialConfig);

	const setConfig = useCallback((newConfig) => {
		setConfigState((prevConfig) => ({
			...prevConfig,
			...newConfig,
		}));
	}, []);

	return [config, setConfig];
}
