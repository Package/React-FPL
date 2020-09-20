import { useLocation } from 'react-router-dom';

export const useSearch = (param) => {
	const location = useLocation();
	const queryParms = new URLSearchParams(location.search);
	const maybeSearchTerm = queryParms.get(param);

	if (!maybeSearchTerm) {
		return false;
	}

	return maybeSearchTerm;
}