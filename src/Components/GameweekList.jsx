import React, { useEffect, useState } from 'react'
import { FixtureCard } from './FixtureCard';
import Axios from 'axios';
import { Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { setInStorage } from '../utils/StorageUtil';

export const GameweekList = () => {

	const [fixtures, setFixtures] = useState([]);
	const [teams, setTeams] = useState([]);
	const [gameweeks, setGameweeks] = useState([]);

	/**
	 * Pull in fixtures and team data from the API.
	 */
	useEffect(() => {
		// Pull in the core data - teams, gameweeks
		Axios.get('https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/bootstrap-static/')
			.then(res => {
				setInStorage('fpl-teams', res.data.teams);
				setInStorage('fpl-gameweeks', res.data.events);

				setTeams(res.data.teams)
				setGameweeks(res.data.events)
			})
			.catch(err => console.log(err));

		// Pull in the fixture list
		Axios.get('https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/fixtures/')
			.then(res => {
				setInStorage('fpl-fixtures', res.data);

				setFixtures(res.data)
			})
			.catch(err => console.log(err));
	}, []);

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
