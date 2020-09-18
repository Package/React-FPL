import React, { useContext } from 'react'
import { Pagination } from 'react-bootstrap';
import { DataContext } from '../../context/DataContext';

export const GameweekPaginator = ({ currentGameweek, setGameweek }) => {

	const { gameweeks } = useContext(DataContext);

	return (
		<Pagination>
			<Pagination.First disabled={currentGameweek <= 1} onClick={() => setGameweek(1)}>First</Pagination.First>
			<Pagination.Prev disabled={currentGameweek <= 1} onClick={() => setGameweek(currentGameweek - 1)}>Prev</Pagination.Prev>
			<Pagination.Next disabled={currentGameweek === gameweeks.length} onClick={() => setGameweek(currentGameweek + 1)}>Next</Pagination.Next>
			<Pagination.Last disabled={currentGameweek === gameweeks.length} onClick={() => setGameweek(gameweeks.length)}>Last</Pagination.Last>
		</Pagination>
	)
}
