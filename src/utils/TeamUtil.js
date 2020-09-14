import { getFromLocalStorage } from './StorageUtil';

/**
 * Attempts to retrieve the name of the team from it's ID in accordance to
 * the data we have already cached in localstorage.
 * 
 * @param {int} teamID 
 */
export const teamName = (teamID) => {
	const maybeTeams = JSON.parse(getFromLocalStorage('fpl-teams'));

	if (!maybeTeams) {
		// Fetch from API
		return false;
	}

	return maybeTeams.find(t => t.id === teamID);
}
