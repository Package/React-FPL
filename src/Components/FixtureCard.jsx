import React from 'react'
import { Link } from 'react-router-dom';
import { Card, ListGroup, Image } from 'react-bootstrap';
import { teamName } from '../utils/TeamUtil';

export const FixtureCard = ({ title, fixtures }) => {

	return (
		<Card>
			<Card.Header>
				{title}
			</Card.Header>

			<Card.Body>
				<ListGroup variant="flush">
					{fixtures.map((fixture) =>
						<ListGroup.Item key={fixture.id}>
							<Link to={`team/${fixture.team_h}`}>
								{teamName(fixture.team_h).name}
							</Link>
							<Image className="ml-1" height="30" src={`/TeamBadges/${teamName(fixture.team_h).short_name}.png`} />
							{fixture.started && <span className="text-muted mr-1 ml-1">{fixture.team_h_score} - {fixture.team_a_score}</span>}
							{!fixture.started && <span className="mr-1 ml-1">vs.</span>}
							<Image className="mr-1" height="30" src={`/TeamBadges/${teamName(fixture.team_a).short_name}.png`} />
							<Link to={`team/${fixture.team_a}`}>
								{teamName(fixture.team_a).name}
							</Link>
						</ListGroup.Item>
					)}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}
