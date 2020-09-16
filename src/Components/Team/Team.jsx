import React, { useState, useEffect, useContext } from 'react'
import { Tabs, Tab, TabContent, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataContext';
import { TeamPlayerList } from './TeamPlayerList';
import { UpcomingFixturesCard } from './UpcomingFixturesCard';

export const Team = () => {

	const { teams, players } = useContext(DataContext);

	const [team, setTeam] = useState({});
	const [teamPlayers, setTeamPlayers] = useState([]);

	const [tab, setTab] = useState('info');
	const { teamID } = useParams();

	useEffect(() => {
		// Filter team info to just the specified team
		const filteredTeam = teams.find(t => t.id === parseInt(teamID));
		setTeam(filteredTeam);

		// Filter players to just players of the specified team
		let filteredPlayers = players.filter(p => p.team === parseInt(teamID));
		filteredPlayers.sort((x, y) => x.element_type - y.element_type);
		setTeamPlayers(filteredPlayers);
	}, [teamID, players, teams])

	if (!team || teamPlayers.length === 0) {
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
					<TabContent className="pt-2">
						<UpcomingFixturesCard teamID={parseInt(teamID)} />
					</TabContent>
				</Tab>
				<Tab eventKey="players" title="Players">
					<TabContent className="pt-2">
						<TeamPlayerList players={teamPlayers} />
					</TabContent>
				</Tab>
			</Tabs>
		</>
	)
}
