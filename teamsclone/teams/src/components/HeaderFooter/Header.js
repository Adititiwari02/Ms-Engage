import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function Header() {
    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="primary" variant="dark" className="w-100" style={{position: "sticky", padding: "10px", marginBottom: "40px"}}>
                <Navbar.Brand href="/">Teams Clone</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/update-profile">Profile</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                    <Nav.Link href="/requests">Requests</Nav.Link>
                    <Nav.Link href="/connections">Connections</Nav.Link>
                    <Nav.Link href="/groups">Groups</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <NavDropdown title="Themes" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Ocean Blue</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.2">Forest Green</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.3">Space Black</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
