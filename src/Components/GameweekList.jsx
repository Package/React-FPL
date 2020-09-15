import React, { useContext } from 'react'
import { FixtureCard } from './FixtureCard';
import { Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { DataContext } from '../context/DataContext';

export const GameweekList = () => {

	const { fixtures, gameweeks } = useContext(DataContext);

	/**
	 * Returns the fixtures for a provided gameweek.
	 * @param {int} gameweek 
	 */
	const forGameweek = (gameweek) => {
		return fixtures.filter(f => f.event === gameweek);
	}

	/**
	 * Builds the title for use in the fixture cards.
	 * 
	 * @param {object} gameweek 
	 */
	const buildTitle = (gameweek) => {
		return (
			<span>
				{gameweek.name} - <small className="text-muted"><Moment>{gameweek.deadline_time}</Moment></small>
			</span>
		)
	}

	return (
		<>
			<h2>Gameweeks</h2>
			<Row>
				{gameweeks.map(gw => {
					return (
						<div className="col-md-6 mt-2 mb-2" key={gw.id}>
							<FixtureCard title={buildTitle(gw)} fixtures={forGameweek(gw.id)} />
						</div>
					)
				})}
			</Row>
		</>
	)
}
