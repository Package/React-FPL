import React, { useEffect, useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import { Modal, Button, Badge } from 'react-bootstrap';
import { UpcomingFixturesCard } from '../Team/UpcomingFixturesCard';

export const PlayerDetails = ({ playerID, onClose }) => {

	const { players } = useContext(DataContext);
	const [details, setDetails] = useState({});

	/**
	 * Updates the details of the player selected
	 */
	useEffect(() => {
		const player = players.find(p => p.id === parseInt(playerID));

		console.log(player);
		setDetails(player ? player : {});
	}, [playerID, players])

	/**
	 * Has a player been selected to render in the modal?
	 */
	const hasPlayerSelected = () => {
		return players.length > 0 && playerID;
	}

	/**
	 * Clears the selected player essentially closing this modal.
	 */
	const clearPlayer = () => {
		setDetails({});
		onClose();
	}

	return (
		<Modal show={hasPlayerSelected()} onHide={clearPlayer}>
			<Modal.Header closeButton>
				<h2>
					{details.first_name} {' '} {details.second_name}
				</h2>
			</Modal.Header>

			<Modal.Body>
				<div className="mb-3">
					<h5>Key Details</h5>
					<Badge className="p-2 mr-2 mb-2" variant="primary">Form: {details.form}</Badge>
					<Badge className="p-2 mr-2 mb-2" variant="primary">Last GW: {details.event_points}</Badge>
					<Badge className="p-2 mr-2 mb-2" variant="primary">Total: {details.total_points}</Badge>
					<Badge className="p-2 mr-2 mb-2" variant="primary">Price: {(details.now_cost / 10.0).toFixed(1)}</Badge>
					<Badge className="p-2 mr-2 mb-2" variant="primary">Selected By: {details.selected_by_percent}%</Badge>
				</div>

				<div className="mb-3">
					<UpcomingFixturesCard teamID={details.team} />
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={() => clearPlayer()}>Close</Button>
			</Modal.Footer>
		</Modal>
	)
}
