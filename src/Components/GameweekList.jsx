import React, { useEffect, useState } from 'react'
import { FixtureList } from './FixtureList';
import Axios from 'axios';
import { Row } from 'react-bootstrap';

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
				setTeams(res.data.teams)
				setGameweeks(res.data.events)
			})
			.catch(err => console.log(err));

		// Pull in the fixture list
		Axios.get('https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/fixtures/')
			.then(res => setFixtures(res.data))
			.catch(err => console.log(err));
	}, []);

	/**
	 * Returns the fixtures for a provided gameweek.
	 * @param {int} gameweek 
	 */
	const forGameweek = (gameweek) => {
		return fixtures.filter(f => f.event === gameweek);
	}

	return (
		<Row>
			{gameweeks.map(gw => {
				return (
					<div className="col-md-6 mt-2 mb-2" key={gw.id}>
						<FixtureList gameweek={gw} fixtures={forGameweek(gw.id)} teams={teams} />
					</div>
				)
			})}
		</Row>
	)
}
