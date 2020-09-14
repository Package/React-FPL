import React from 'react'
import { Card, ListGroup, Image } from 'react-bootstrap';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const FixtureList = ({ gameweek, fixtures, teams }) => {

	/**
	 * Returns the team information by ID
	 * @param {int} teamID 
	 */
	const team = (teamID) => {
		var foundTeam = teams.filter(t => t.id === teamID);
		if (foundTeam.length > 0) {
			return foundTeam[0];
		}

		return false;
	}

	if (fixtures.length === 0) {
		return (
			<p>Loading...</p>
		)
	}

	return (
		<Card>
			<Card.Header>
				{gameweek.name} - <small className="text-muted"><Moment>{gameweek.deadline_time}</Moment></small>
			</Card.Header>

			<Card.Body>
				<ListGroup variant="flush">
					{fixtures.map((fixture) =>
						<ListGroup.Item key={fixture.id}>
							<Link to={`team/${fixture.team_h}`}>
								{team(fixture.team_h).name}
							</Link>
							<Image className="ml-1" height="30" src={`/TeamBadges/${team(fixture.team_h).short_name}.png`} />
							{fixture.started && <span className="text-muted mr-1 ml-1">{fixture.team_h_score} - {fixture.team_a_score}</span>}
							{!fixture.started && <span className="mr-1 ml-1">vs.</span>}
							<Image className="mr-1" height="30" src={`/TeamBadges/${team(fixture.team_a).short_name}.png`} />
							<Link to={`team/${fixture.team_a}`}>
								{team(fixture.team_a).name}
							</Link>
						</ListGroup.Item>
					)}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}
