import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap';
import { DataContext } from '../context/DataContext';

export const GameweekPaginator = ({ currentGameweek, setGameweek }) => {

	const { gameweeks } = useContext(DataContext);

	return (
		<Pagination>
			{currentGameweek > 1 && <Pagination.First onClick={() => setGameweek(1)}>First</Pagination.First>}
			{currentGameweek > 1 && <Pagination.Prev onClick={() => setGameweek(currentGameweek - 1)}>Prev</Pagination.Prev>}
			{currentGameweek < gameweeks.length && <Pagination.Next onClick={() => setGameweek(currentGameweek + 1)}>Next</Pagination.Next>}
			{currentGameweek < gameweeks.length && <Pagination.Last onClick={() => setGameweek(gameweeks.length)}>Last</Pagination.Last>}
		</Pagination>
	)
}
