import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext';
import { Table } from 'react-bootstrap';

export const TeamPlayerList = ({ players }) => {

	const { positions } = useContext(DataContext);

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
		return parseFloat(price / 10.0).toFixed(2);
	}

	return (
		<Table striped hover>
			<thead>
				<tr>
					<th>Name</th>
					<th>Position</th>
					<th>Price $</th>
					<th>Selected By %</th>
					<th>Total Points</th>
				</tr>
			</thead>
			<tbody>
				{players.map((p) => (
					<tr key={p.id}>
						<td>{`${p.first_name} ${p.second_name}`}</td>
						<td>{positionName(p.element_type)}</td>
						<td>{formatPrice(p.now_cost)}</td>
						<td>{p.selected_by_percent}</td>
						<td>{p.total_points}</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}
