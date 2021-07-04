import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {useAuth} from '../../contexts/AuthContext'

function Header() {
    const {currentUser} = useAuth();
    const [themeName, setThemeName] = useState("");
    useEffect(() => {
        var docRef= db.collection("users").doc(currentUser.uid)
        docRef.get().then((doc) => {
            if(doc.exists) {
                setThemeName(doc.data().themeChoice)
            } else {
                console.log("NOT FOUND ERROR!!")
            }
        }).catch((error) =>{
            console.log("Error Fetching Document!")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function changeTheme0() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "primary"
        })
        setThemeName("primary")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme1() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "success"
        })
        setThemeName("success")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme2() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "dark"
        })
        setThemeName("dark")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme3() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "danger"
        })
        setThemeName("danger")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme4() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "warning"
        })
        setThemeName("warning")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme5() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "secondary"
        })
        setThemeName("secondary")
        alert("kindly refresh browser to see changes")
    }
    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg={themeName} variant="dark" className="w-100" style={{position: "sticky", padding: "10px", marginBottom: "40px"}}>
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
                        <NavDropdown.Item onClick={changeTheme0}>Ocean Blue</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={changeTheme1}>Forest Green</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={changeTheme2}>Space Black</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={changeTheme3}>Fire Red</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={changeTheme4}>Sunny Yellow</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={changeTheme5}>Thunder Grey</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}


export default Header
