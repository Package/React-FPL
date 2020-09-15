import Axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext(false);

export const DataProvider = ({ children }) => {

	const [gameweeks, setGameweeks] = useState([]);
	const [players, setPlayers] = useState([]);
	const [fixtures, setFixtures] = useState([]);
	const [playerTypes, setPlayerTypes] = useState([]);
	const [error, setError] = useState('');
	const [loadingData, setLoadingData] = useState(true);
	const [loadingFixtures, setLoadingFixtures] = useState(true);

	const DATA_URL = 'https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/bootstrap-static/';
	const FIXTURES_URL = 'https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/fixtures/';

	// Loads in key data
	useEffect(() => {
		if (loadingData) {
			setLoadingData(false);

			Axios.get(DATA_URL).then(res => {
				setGameweeks(res.data.events);
				setPlayers(res.data.elements);
				setPlayerTypes(res.data.element_types);
			}).catch(err => {
				setError(err);
			});
		}
	}, [gameweeks, players, playerTypes, loadingData]);

	// Load in fixture data
	useEffect(() => {
		if (loadingFixtures) {
			setLoadingFixtures(false);
			Axios.get(FIXTURES_URL).then(res => {
				setFixtures(res.data);
			}).catch(err => {
				setError(err);
			});
		}
	}, [fixtures, loadingFixtures, error])


	const values = {
		fixtures,
		gameweeks,
		players,
		playerTypes
	};

	return (
		<DataContext.Provider value={values}>
			{children}
		</DataContext.Provider>
	)
};