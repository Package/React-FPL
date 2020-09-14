import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Tabs, Tab, TabContent, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { PlayerList } from './PlayerList';
import { UpcomingFixturesCard } from './UpcomingFixturesCard';

export const Team = () => {

	const [team, setTeam] = useState({});
	const [players, setPlayers] = useState([]);
	const [positions, setPositions] = useState([]);
	const [tab, setTab] = useState('info');
	const { teamID } = useParams();

	useEffect(() => {
		Axios.get('https://cors-anywhere.herokuapp.com/https://fantasy.premierleague.com/api/bootstrap-static/')
			.then(res => {
				// Save position data
				setPositions(res.data.element_types);

				// Filter team info to just the specified team
				const filteredTeam = res.data.teams.filter(t => t.id === parseInt(teamID))[0];
				setTeam(filteredTeam);

				// Filter players to just players of the specified team
				let filteredPlayers = res.data.elements.filter(p => p.team === parseInt(teamID));
				filteredPlayers.sort((x, y) => x.element_type - y.element_type);
				setPlayers(filteredPlayers);
			})
			.catch(err => console.log(err));
	}, [teamID])

	if (players.length === 0) {
		return <p>Loading...</p>
	}

	return (
		<>
			<h2>
				<Image src={`/TeamBadges/${team.short_name}.png`} alt={team.name} className="mr-2 mb-1" />
				{team.name}
			</h2>

			<Tabs defaultActiveKey={tab} onSelect={(t) => setTab(t)} id="team-tabs">
				<Tab eventKey="info" title="Team Info">
					<TabContent>
						Team: {team.name}
						<p>Team Info will go here.</p>

						<UpcomingFixturesCard teamID={parseInt(teamID)} />
					</TabContent>
				</Tab>
				<Tab eventKey="players" title="Players">
					<TabContent>
						<PlayerList players={players} positions={positions} />
					</TabContent>
				</Tab>
			</Tabs>
		</>
	)
}
