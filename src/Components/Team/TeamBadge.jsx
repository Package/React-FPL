import React, { useContext } from 'react'
import { Image } from 'react-bootstrap';
import { DataContext } from '../../context/DataContext'

export const TeamBadge = ({ teamID }) => {

	const { teams } = useContext(DataContext);

	const teamInfo = () => {
		return teams.find((t) => t.id === teamID);
	}

	if (teams.length === 0) {
		return false;
	}

	return (
		<Image className="ml-1" height="30" title={teamInfo().name} src={`/TeamBadges/${teamInfo().short_name}.png`} />
	)
}
