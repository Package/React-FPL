import Axios from 'axios';
import React, { useEffect, useState } from 'react'

export const UpcomingFixturesCard = ({ teamID }) => {

	const [fixtures, setFixtures] = useState([]);

	useEffect(() => {
		Axios.get('https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/fixtures/')
			.then(res => {
				const dateNow = new Date();

				// All fixtures for the selected team
				const fixturesForTeam = res.data.filter(f =>
					(f.team_h === teamID || f.team_a === teamID) && // Filter to team
					f.event && // Has a gameweek scheduled
					f.kickoff_time && // Has a kickoff time scheduled
					Date.parse(f.kickoff_time) > dateNow // Kicks off in the future
				);

				// Sort by most upcoming first and take 5 of them.
				const sortedFixtures = fixturesForTeam.sort((f1, f2) => f1.event - f2.event).slice(0, 5);

				setFixtures(sortedFixtures);
			}).catch(err => console.log(err));
	}, [teamID]);

	if (fixtures.length === 0) {
		return <p>Loading...</p>
	}

	return (
		<div>
			Fixtures: {fixtures.length}
		</div>
	)
}
