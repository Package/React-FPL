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
	const [playersPicked, setPlayersPicked] = useState([]);
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

	/**
	 * Event handler called when a player has been added to the user's team selection.
	 * 
	 * @param {int} playerID 
	 */
	const onPlayerPicked = (playerID) => {
		const playerDetails = players.find(p => p.id === playerID);

		const newPlayer = {
			id: playerID,
			name: `${playerDetails.first_name} ${[playerDetails.web_name]}`,
			player: playerDetails,
			position: positions.find(p => p.id === playerDetails.element_type),
			team: teams.find(t => t.id === playerDetails.team)
		};

		playerAddedOrRemovedFlashMessage(playerID);
		playersPicked.push(newPlayer);
	}

	/**
	 * Event handler for when a player is removed from the team.
	 * @param {int} playerID 
	 */
	const onPlayerRemoved = (playerID) => {
		playerAddedOrRemovedFlashMessage(playerID);
		setPlayersPicked(playersPicked.filter(p => p.id !== playerID));
	}

	const playerAddedOrRemovedFlashMessage = (playerID) => {
		const playerDetails = players.find(p => p.id === playerID);
		if (!playerDetails) {
			return false;
		}
		const name = `${playerDetails.first_name} ${[playerDetails.web_name]}`;
		const alreadyInTeam = isPlayerInTeam(playerID);

		setMessages([...messages, {
			type: (alreadyInTeam ? 'danger' : 'success'),
			message: `${name} has been ${alreadyInTeam ? 'removed from' : 'added to'} your team.`
		}]);

		// Clear the flash messages after 5 seconds
		setTimeout(() => {
			setMessages([]);
		}, 5000);
	}

	const isPlayerInTeam = (playerID) => {
		const maybePlayer = playersPicked.find(p => p.id === playerID);
		return maybePlayer != null;
	}

	const values = {
		fixtures,
		gameweeks,
		players,
		positions,
		teams,
		playersPicked,
		messages,
		setMessages,
		onPlayerPicked,
		onPlayerRemoved,
		isPlayerInTeam
	};

	return (
		<DataContext.Provider value={values}>
			{children}
		</DataContext.Provider>
	)
};