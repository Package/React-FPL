import React, { createContext, useContext, useState } from 'react';
import { DataContext } from './DataContext';

export const SelectionContext = createContext(false);

export const SelectionProvider = ({ children }) => {

	const { players, positions, messages, teams, setMessages } = useContext(DataContext);
	const [playersPicked, setPlayersPicked] = useState([]);

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

	/**
	 * Adds an alert (flash message) onto the page after a player is added/removed from the team.
	 * 
	 * @param {int} playerID 
	 */
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

	/**
	 * Is the provided player in the user's team selection
	 * @param {int} playerID 
	 */
	const isPlayerInTeam = (playerID) => {
		return playersPicked.find(p => p.id === playerID) != null;
	}

	const values = {
		onPlayerPicked,
		onPlayerRemoved,
		isPlayerInTeam,
		playersPicked
	};

	return (
		<SelectionContext.Provider value={values}>
			{children}
		</SelectionContext.Provider>
	)
}