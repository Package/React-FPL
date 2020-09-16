import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Card, ListGroup, Image, Modal, Button } from 'react-bootstrap';
import { teamName } from '../utils/TeamUtil';
import { TeamBadge } from './Team/TeamBadge';

export const FixtureCard = ({ title, fixtures }) => {

	const [selectedFixture, setSelectedFixture] = useState({});

	const fixtureScore = (fixture) => {
		if (fixture.started) {
			return (
				<span className="text-muted mr-1 ml-1" onClick={() => setSelectedFixture(fixture)}>
					{fixture.team_h_score} - {fixture.team_a_score}
				</span>
			)
		} else {
			return (<span className="mr-1 ml-1">vs.</span>)
		}
	}

	const hasSelectedFixture = () => {
		return Object.keys(selectedFixture).length > 0;
	}

	const clearSelectedFixture = () => {
		setSelectedFixture({});
	}

	const getBonusStat = (fixture) => {
		const stats = fixture.stats;
		if (!stats || stats.length === 0) {
			return false;
		}

		return stats.find(s => s.identifier === "bonus");
	}

	return (
		<>
			<Modal show={hasSelectedFixture()} onHide={clearSelectedFixture}>
				<Modal.Header closeButton>
					<Modal.Title>Bonus Points</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					Bonus information to go here.
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" onClick={clearSelectedFixture}>Close</Button>
				</Modal.Footer>
			</Modal>

			<Card variant="primary" className="mb-3">
				<Card.Header>
					{title}
				</Card.Header>

				<Card.Body>
					<ListGroup variant="flush">
						{fixtures.map((fixture) =>
							<ListGroup.Item key={fixture.id}>
								<Link to={`/team/${fixture.team_h}`}>
									{teamName(fixture.team_h).name}
								</Link>
								<TeamBadge className="ml-1" teamID={fixture.team_h} />
								{fixtureScore(fixture)}
								<TeamBadge teamID={fixture.team_a} />
								<Link to={`/team/${fixture.team_a}`}>
									{teamName(fixture.team_a).name}
								</Link>
							</ListGroup.Item>
						)}
					</ListGroup>
				</Card.Body>
			</Card>
		</>
	)
}
