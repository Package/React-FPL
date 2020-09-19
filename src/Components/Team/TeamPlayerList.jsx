import React, { useContext, useState } from 'react'
import { DataContext } from '../../context/DataContext';
import { Button, Table } from 'react-bootstrap';
import { TeamBadge } from './TeamBadge';
import { PlayerDetails } from '../Players/PlayerDetails';

export const TeamPlayerList = ({ players }) => {

	const { positions } = useContext(DataContext);
	const [selectedPlayer, setSelectedPlayer] = useState(false);

	/**
	 * Returns the name of the position.
	 * 
	 * @param {int} type 
	 */
	const positionName = (type) => {
		return positions.find(p => p.id === type).singular_name;
	}

	/**
	 * Formats and returns the price of the player.
	 * 
	 * @param {int} price 
	 */
	const formatPrice = (price) => {
		return parseFloat(price / 10.0).toFixed(1);
	}

	const onModalClose = () => {
		setSelectedPlayer(false);
	}

	const openModal = (e, player) => {
		e.preventDefault();
		setSelectedPlayer(player);
	}

	return (
		<>
			{selectedPlayer > 0 &&
				<PlayerDetails playerID={selectedPlayer} onClose={onModalClose} />
			}
			<Table striped hover size="sm">
				<thead>
					<tr>
						<th>Team</th>
						<th>Name</th>
						<th>Position</th>
						<th>Price</th>
						<th>Selected By</th>
						<th>Total Points</th>
					</tr>
				</thead>
				<tbody>
					{players.map((p) => (
						<tr key={p.id}>
							<td>
								<TeamBadge teamID={p.team} />
							</td>
							<td>
								<Button variant="link" onClick={e => openModal(e, p.id)} title={`${p.first_name} ${p.second_name}`}>
									{`${p.first_name} ${p.web_name}`}
								</Button>
							</td>
							<td>{positionName(p.element_type)}</td>
							<td>{formatPrice(p.now_cost)}</td>
							<td>{p.selected_by_percent}%</td>
							<td>{p.total_points}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	)
}
