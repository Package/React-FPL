import Axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext(false);

export const DataProvider = ({ children }) => {

	const [gameweeks, setGameweeks] = useState([]);
	const [players, setPlayers] = useState([]);
	const [fixtures, setFixtures] = useState([]);
	const [positions, setPositions] = useState([]);
	const [teams, setTeams] = useState([]);
	const [error, setError] = useState('');
	const [loadingData, setLoadingData] = useState(true);
	const [loadingFixtures, setLoadingFixtures] = useState(true);
	const [messages, setMessages] = useState([]);

	/**
	 * API endpoints to load in the Fantasy Premier League data.
	 */
	const DATA_URL = 'https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/bootstrap-static/';
	const FIXTURES_URL = 'https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/fixtures/';

	/**
	 * Loads in the key data such as teams, players, etc.
	 */
	useEffect(() => {
		if (loadingData) {
			console.log("Loading in the core data.");
			setLoadingData(false);

			Axios.get(DATA_URL).then(res => {
				setGameweeks(res.data.events);
				setPlayers(res.data.elements);
				setTeams(res.data.teams);
				setPositions(res.data.element_types);
			}).catch(err => {
				setError(err);
			});
		}
	}, [gameweeks, players, teams, positions, loadingData]);

	/**
	 * Loads in the fixture information.
	 */
	useEffect(() => {
		if (loadingFixtures) {
			console.log("Loading in the fixtures data.");
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
		positions,
		teams,
		messages,
		setMessages,
	};

	return (
		<DataContext.Provider value={values}>
			{children}
		</DataContext.Provider>
	)
};