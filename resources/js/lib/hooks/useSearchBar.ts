import { useState } from "react";

export const useSearchBar = () => {
	const [search, setSearch] = useState("");
	const searchValue = search.toLocaleLowerCase();
	return {
		setSearch,
		searchValue,
	};
};
