
/**
 * Records a property in localstorage with the provided value.
 * 
 * @param {string} property 
 * @param {mixed} value 
 */
export const setInStorage = (property, value) => {
	localStorage.setItem(property, JSON.stringify(value));
}

/**
 * Attempts to get a property from localstorage. If said property does not 
 * exist, false is returned.
 * 
 * @param {string} property 
 */
export const getFromLocalStorage = (property) => {
	const maybeItem = localStorage.getItem(property);

	if (maybeItem) {
		return maybeItem;
	}

	return false;
}