import React, { useEffect, useState, useContext } from 'react'
import { FixtureCard } from '../FixtureCard';
import { teamName } from '../../utils/TeamUtil';
import { DataContext } from '../../context/DataContext';

export const UpcomingFixturesCard = ({ teamID }) => {

	const { fixtures } = useContext(DataContext);
	const [upcomingFixtures, setUpcomingFixtures] = useState([]);

	useEffect(() => {
		const dateNow = new Date();

		// All fixtures for the selected team
		const fixturesForTeam = fixtures.filter(f =>
			(f.team_h === teamID || f.team_a === teamID) && // Filter to team
			f.event && // Has a gameweek scheduled
			f.kickoff_time && // Has a kickoff time scheduled
			Date.parse(f.kickoff_time) > dateNow // Kicks off in the future
		);

		// Sort by most upcoming first and take 5 of them.
		const sortedFixtures = fixturesForTeam.sort((f1, f2) => f1.event - f2.event).slice(0, 5);

		setUpcomingFixtures(sortedFixtures);
	}, [teamID, fixtures]);

	if (upcomingFixtures.length === 0) {
		return <p>Loading...</p>
	}

	const team = teamName(teamID);

	return (
		<FixtureCard title={`Upcoming fixtures for ${team.name}`} fixtures={upcomingFixtures} />
	)
}
