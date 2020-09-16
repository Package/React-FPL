import React, { useContext, useState } from 'react'
import { FixtureCard } from '../FixtureCard';
import { Col, Row, Spinner, ListGroup, Pagination } from 'react-bootstrap';
import Moment from 'react-moment';
import { DataContext } from '../../context/DataContext';
import { GameweekFilter } from './GameweekFilter';
import { GameweekPaginator } from './GameweekPaginator';

export const GameweekList = () => {

	const { fixtures, gameweeks } = useContext(DataContext);
	const [gameweek, setGameweek] = useState(1);

	/**
	 * Returns the fixtures for a provided gameweek.
	 * @param {int} gameweek 
	 */
	const forGameweek = () => {
		return fixtures.filter(f => f.event === gameweek);
	}

	/**
	 * Builds the title for use in the fixture cards.
	 * 
	 * @param {object} gameweek 
	 */
	const buildTitle = () => {
		const selectedGameweek = gameweeks.find(gw => gw.id === gameweek);

		return (
			<span>
				{selectedGameweek.name} - <small className="text-muted"><Moment>{selectedGameweek.deadline_time}</Moment></small>
			</span>
		)
	}

	if (fixtures.length === 0 || gameweeks.length === 0) {
		return (
			<Spinner>
				<span className="sr-only">Loading...</span>
			</Spinner>
		)
	}

	return (
		<>
			<h2>Gameweeks</h2>
			<Row>
				<Col md="3">
					<GameweekFilter currentGameweek={gameweek} setGameweek={setGameweek} />
				</Col>
				<Col md="9">
					<GameweekPaginator currentGameweek={gameweek} setGameweek={setGameweek} />
					<FixtureCard title={buildTitle()} fixtures={forGameweek()} />
					<GameweekPaginator currentGameweek={gameweek} setGameweek={setGameweek} />
				</Col>
			</Row>
		</>
	)
}
