import React, { useContext } from 'react'
import { ListGroup, Pagination } from 'react-bootstrap';
import { DataContext } from '../../context/DataContext';

export const GameweekFilter = ({ currentGameweek, setGameweek }) => {

	const { gameweeks } = useContext(DataContext);

	return (
		<>
			<ListGroup>
				{gameweeks.map((gw) => (
					<ListGroup.Item active={gw.id === currentGameweek} action key={gw.id} onClick={() => setGameweek(gw.id)}>
						{gw.name}
					</ListGroup.Item>
				))}
			</ListGroup>
		</>
	)
}
