import React, { useContext, useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap';
import { DataContext } from '../../context/DataContext'
import { Loading } from '../Layout/Loading';
import { TeamPlayerList } from '../Team/TeamPlayerList';
import { PlayerListFilter } from './PlayerListFilter';

export const PlayerList = () => {

	const { players, positions, teams } = useContext(DataContext);
	const [filteredPlayers, setFilteredPlayers] = useState([]);

	if (players.length === 0 || positions.length === 0 || teams.length === 0) {
		return (
			<Loading />
		)
	}

	return (
		<Row>
			<Col sm="3" className="vh-100">
				<PlayerListFilter onFilter={setFilteredPlayers} />
			</Col>

			<Col sm="9">
				<h1 className="sr-only">Player Finder</h1>

				<Alert variant="primary">
					<Alert.Heading>Player Finder</Alert.Heading>
					<p>You can use this page to find Fantasy Premier League players. Use the filters on side to allow you to sort by team, price or position.</p>
					<hr />
					<small>
						Currently showing <strong>{filteredPlayers.length}</strong> of <strong>{players.length}</strong> players!
					</small>
				</Alert>
				{filteredPlayers.length > 0 && <TeamPlayerList players={filteredPlayers} />}
			</Col>
		</Row>
	)
}
