import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { useHistory, Link, Redirect } from 'react-router-dom';

export const Navigation = () => {

	const [query, setQuery] = useState('');
	const history = useHistory();

	/**
	 * Event handler for when the search form is submitted.
	 * 
	 * @param {Event} e 
	 */
	const onSearch = (e) => {
		e.preventDefault();

		history.push(`/players?query=${query}`);
	}

	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
			<Navbar.Brand as={Link} to="/">React FPL</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/">Home</Nav.Link>
					<Nav.Link as={Link} to="/gameweeks">Gameweeks</Nav.Link>
					<Nav.Link as={Link} to="/players">Players</Nav.Link>
					<Nav.Link as={Link} to="/choose-team">Choose Team</Nav.Link>
				</Nav>
				<Form inline action="/players" method="get" onSubmit={onSearch}>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" name="query" id="query" value={query} onChange={e => setQuery(e.target.value)} />
					<Button type="submit" variant="outline-info">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	)
}
