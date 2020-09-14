import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export const MyNav = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
			<Navbar.Brand as={Link} to="/">React FPL</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/">Home</Nav.Link>
					<Nav.Link as={Link} to="/gameweeks">Gameweeks</Nav.Link>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	)
}
