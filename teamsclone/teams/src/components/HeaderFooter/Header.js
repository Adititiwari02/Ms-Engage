import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {useAuth} from '../../contexts/AuthContext'
import { v1 as uuid } from "uuid"
import { Tooltip } from 'reactstrap';

function Header() {
    const {currentUser} = useAuth();
    const id = uuid();
    const [themeName, setThemeName] = useState("");
    const [tooltipProfile, setTooltipProfile] = useState(false);
    const [tooltipInstantMeeting, setTooltipInstantMeeting] = useState(false);
    const [tooltipUsers, setTooltipUsers] = useState(false);
    const [tooltipRequests, setTooltipRequests] = useState(false);
    const [tooltipConnections, setTooltipConnections] = useState(false);
    const [tooltipGroups, setTooltipGroups] = useState(false);


    const toggleProfile = () => setTooltipProfile(!tooltipProfile);

    const toggleInstantMeeting = () => setTooltipInstantMeeting(!tooltipInstantMeeting);

    const toggleUsers = () => setTooltipUsers(!tooltipUsers);

    const toggleRequests = () => setTooltipRequests(!tooltipRequests);

    const toggleConnections = () => setTooltipConnections(!tooltipConnections);

    const toggleGroups = () => setTooltipGroups(!tooltipGroups);

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
            themeChoice: "primary",
            themeNo: 0
        })
        setThemeName("primary")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme1() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "success",
            themeNo: 1
        })
        setThemeName("success")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme2() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "dark",
            themeNo: 2
        })
        setThemeName("dark")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme3() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "danger",
            themeNo: 3
        })
        setThemeName("danger")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme4() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "warning",
            themeNo: 4
        })
        setThemeName("warning")
        alert("kindly refresh browser to see changes")
    }
    function changeTheme5() {
        db.collection("users").doc(currentUser.uid).update({
            themeChoice: "secondary",
            themeNo: 5
        })
        setThemeName("secondary")
        alert("kindly refresh browser to see changes")
    }
    function instantMeet() {
        // eslint-disable-next-line no-useless-concat
        alert("Copy the following link and share to invite users to your meeting:  " + `/room/${id}`)
    }
    return (
        <div>
            <Navbar fixed="top" collapseOnSelect expand="lg" bg={themeName} variant="dark" className="w-100" style={{position: "sticky", padding: "10px", marginBottom: "40px"}}>
                <Navbar.Brand href="/">Teams Clone</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link id="notes" href="/dashboard">Profile</Nav.Link>
                    <Tooltip placement="bottom" isOpen={tooltipProfile} target="notes" toggle={toggleProfile}>
                        <p>Profile</p>
                        <span>This is a place to update your passwords, sign out etc.</span>
                    </Tooltip>  
                    <Nav.Link id="meeting" href={`/room/${id}`} onClick={instantMeet} target="_blank">Instant Meeting</Nav.Link>
                    <Tooltip placement="bottom" isOpen={tooltipInstantMeeting} target="meeting" toggle={toggleInstantMeeting}>
                        <p>Instant Meeting</p>
                        <span>Lets you have a meeting even without forming a group! However as a draw back you wont be able to
                            save notes, chat, or create a survey/answer a survey.
                        </span>
                    </Tooltip>  
                    <Nav.Link id="users" href="/users">Users</Nav.Link>
                    <Tooltip placement="bottom" isOpen={tooltipUsers} target="users" toggle={toggleUsers}>
                        <p>Users</p>
                        <span>Lists all the users of the application. If the user is connected it shows a tick, else an option to
                            send a connection request.
                        </span>
                    </Tooltip>  
                    <Nav.Link id="requests" href="/requests">Requests</Nav.Link>
                    <Tooltip placement="bottom" isOpen={tooltipRequests} target="requests" toggle={toggleRequests}>
                        <p>Requests</p>
                        <span>You can see all the connections requests here and accept/reject them.</span>
                    </Tooltip>  
                    <Nav.Link id="connections" href="/connections">Connections</Nav.Link>
                    <Tooltip placement="bottom" isOpen={tooltipConnections} target="connections" toggle={toggleConnections}>
                        <p>Connections</p>
                        <span>A place to see all your connections as well as create groups!</span>
                    </Tooltip>  
                    <Nav.Link id="groups" href="/groups">Groups</Nav.Link>
                    <Tooltip placement="bottom" isOpen={tooltipGroups} target="groups" toggle={toggleGroups}>
                        <p>Groups</p>
                        <span>Over here you can see your groups and for each group you can have video calls, store important notes & create surveys!</span>
                    </Tooltip>  
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
