import React, { useState, useEffect, useContext } from 'react'
import { Card, Dropdown, DropdownButton, Button, ButtonGroup } from 'react-bootstrap';
import { DataContext } from '../../context/DataContext';
import { TeamBadge } from '../Team/TeamBadge';

export const PlayerListFilter = ({ onFilter }) => {

	const { players, positions, teams } = useContext(DataContext);
	const [selectedPosition, setSelectedPosition] = useState(false);
	const [selectedPrice, setSelectedPrice] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState(false);

	/**
	 * Returns the array of prices available for filtering.
	 */
	const getPriceArray = () => {
		if (players.length === 0) {
			return [];
		}

		let prices = [];

		let minPrice = 1000;
		let maxPrice = 0;

		for (let index = 0; index < players.length; index++) {
			const currPrice = players[index].now_cost / 10.0;

			if (currPrice < minPrice) {
				minPrice = currPrice;
			}
			if (currPrice > maxPrice) {
				maxPrice = currPrice;
			}
		}

		for (let price = minPrice; price <= maxPrice; price += 0.5) {
			prices.push(price);
		}

		return prices;
	}

	/**
	 * Returns the name of the position that is currently selected.
	 */
	const getSelectedPositionName = () => {
		if (!selectedPosition) {
			return 'Select Position';
		}

		return positions.find(p => p.id === selectedPosition)['plural_name'];
	}

	/**
	 * Returns the name of theteam that is currently selected
	 */
	const getSelectedTeamName = () => {
		if (!selectedTeam) {
			return 'Select Team';
		}

		return teams.find(t => t.id === selectedTeam)['name'];
	}

	/**
	 * Formats the provided price for outptu
	 */
	const formatPrice = (price) => {
		return price ? `${price.toFixed(1)}` : 'Any';
	}

	/**
	 * Performs the filtering on the players.
	 */
	useEffect(() => {
		let filtered = [];

		// Start with all players initially (providing something has been selected)
		if (selectedPosition || selectedPrice || selectedTeam) {
			filtered = players;
		}

		// Filter by position
		if (selectedPosition) {
			filtered = filtered.filter(p => p.element_type === selectedPosition);
		}

		// Filter by price
		if (selectedPrice) {
			filtered = filtered.filter(p => p.now_cost <= (selectedPrice * 10));
		}

		// Filter by team
		if (selectedTeam) {
			filtered = filtered.filter(p => p.team === selectedTeam);
		}

		// Sort by total points (highest first) then by position (goalkeeper to forward)
		filtered.sort((f1, f2) => f2.total_points - f1.total_points).sort((f1, f2) => f1.element_type - f2.element_type);

		onFilter(filtered);
	}, [onFilter, players, selectedPosition, selectedPrice, selectedTeam]);

	return (
		<>
			<Card className="mb-2">
				<Card.Body>
					<Card.Title>By Position</Card.Title>
					<Card.Text>
						<DropdownButton variant="dark" title={getSelectedPositionName()} activeKey={selectedPosition} className="mb-2">
							{positions.map((p) => (
								<Dropdown.Item key={p.id} onClick={() => setSelectedPosition(p.id)}>
									{p.plural_name}
								</Dropdown.Item>
							))}
						</DropdownButton>
						{selectedPosition > 0 && <Button variant="outline-danger" size="sm" onClick={() => setSelectedPosition(0)}>Clear</Button>}
					</Card.Text>
				</Card.Body>
			</Card>

			<Card className="mb-2">
				<Card.Body>
					<Card.Title>By Team</Card.Title>
					<Card.Text>
						<DropdownButton variant="dark" title={getSelectedTeamName()} activeKey={selectedTeam} className="mb-2">
							{teams.map((t) => (
								<Dropdown.Item key={t.id} onClick={() => setSelectedTeam(t.id)}>
									<TeamBadge teamID={t.id} />{' '}
									{t.name}
								</Dropdown.Item>
							))}
						</DropdownButton>
						{selectedTeam > 0 && <Button variant="outline-danger" size="sm" onClick={() => setSelectedTeam(0)}>Clear</Button>}
					</Card.Text>
				</Card.Body>
			</Card>

			<Card className="mb-2">
				<Card.Body>
					<Card.Title>By Price</Card.Title>
					<Card.Text>
						<DropdownButton variant="dark" title={selectedPrice ? `${formatPrice(selectedPrice)} or less` : 'Select Price'} activeKey={selectedPrice * 10} className="mb-2">
							{getPriceArray().map((price) => (
								<Dropdown.Item key={price * 10} onClick={() => setSelectedPrice(price)}>
									{formatPrice(price)}
								</Dropdown.Item>
							))}
						</DropdownButton>
						{selectedPrice > 0 && <Button variant="outline-danger" size="sm" onClick={() => setSelectedPrice(0)}>Clear</Button>}
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	)
}
