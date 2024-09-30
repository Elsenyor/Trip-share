/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { selectEntriesPageService } from "../../services/entryServices";

const useEntries = () => {
	const [currentEntries, setCurrentEntries] = useState([]);
	const [prevPage, setPrevPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [totalEntries, setTotalEntries] = useState(null);
	const [entryQuantity, setEntryQuantity] = useState(null);
	const fetchEntries = async (page) => {
		if (!entryQuantity) return;
		try {
			const { entries, totalPages, totalEntries } = await selectEntriesPageService(page, entryQuantity);
			setCurrentEntries(currentEntries.concat(entries.filter((entry) => !currentEntries.some((e) => e.id === entry.id))));
			setPrevPage(currentPage - 1 < 1 ? null : currentPage - 1);
			setNextPage(currentPage + 1 > totalPages ? null : currentPage + 1);
			setTotalPages(totalPages);
			setTotalEntries(totalEntries);
		} catch (error) {
			toast.error(error.message);
		}
	};
	useEffect(() => {
		fetchEntries(currentPage, entryQuantity);
	}, [entryQuantity]);
	const goToPage = (page) => {
		setCurrentPage(page);
	};
	return {
		entries: currentEntries,
		prevPage,
		nextPage,
		currentPage,
		totalPages,
		totalEntries,
		goToPage,
		entryQuantity,
		fetchEntries,
		setEntryQuantity,
	};
};

export default useEntries;
