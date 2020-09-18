import { useLocation } from 'react-router-dom';

export const useSearch = () => {
	const location = useLocation();
	const queryParms = new URLSearchParams(location.search);
	const maybeSearchTerm = queryParms.get('query');

	if (!maybeSearchTerm) {
		return false;
	}

	return maybeSearchTerm;
}