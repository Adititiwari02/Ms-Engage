/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import Connection from './Connection';
import {Button} from "react-bootstrap";
import Header from './../HeaderFooter/Header';
import { Container } from "react-bootstrap";

function Connections() {
    const {currentUser} = useAuth();
    const [connections, setConnections] = useState([]);
    const [formGroup, setFormGroup] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [userInGroup, setUserInGroup] = useState([]);
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

    useEffect(() => {
        db.collection("users").doc(currentUser.uid).collection("connections")
        .onSnapshot((snapshot) => 
            setConnections(snapshot.docs.map((doc) => ({
                connectionId: doc.id,
                connectionEmail: doc.data().connectionEmail
            })))
        );
    // eslint-disable-next-line
    }, [])

    function ifformedGroup() {
        setFormGroup(!formGroup);
        if(!formGroup) {
            const groupUsers = [...userInGroup, currentUser.uid]
            setUserInGroup(groupUsers)  // adding own data in the group users
        } else {
            const newArr = [];
            setUserInGroup(newArr);                                      // setting back to zero
        }
            
    }
    
    function saveGroup() {
        if(userInGroup.length > 1 && groupName !== "") {
            db.collection("groups").add({
                groupName: groupName,
                groupMembers: userInGroup
            })
        } else {
            alert("Less than two users or no group name please check");
        }
        const newArr = [];
        setUserInGroup(newArr);  
        setFormGroup(!formGroup);
        setGroupName("");
        window.location.reload();
    }
    function cancelGroup() {
        const newArr = [];
        setUserInGroup(newArr);  
        setFormGroup(!formGroup);
        setGroupName("");
        window.location.reload();
    }

    return (
        <div>
            <Header />
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }} style={{ maxWidth: "400px" }}>
            <div className="w-100">
            <h2 className="text-center mb-4">Your Connections!</h2>
            <Button variant={themeName} className="btn w-100 mb-3" onClick={ifformedGroup}>Create Group</Button>
            {formGroup && 
            <label>
                Enter Group Name <br />
                <input 
                    onChange={(e) => {
                        setGroupName(e.target.value)
                    }} 
                    type="text" value={groupName} 
                    placeholder="Group Name"/>
            </label>}
           {connections.map(({ connectionId, connectionEmail }) => (
                <Connection 
                    key = {connectionId}
                    id = {connectionId}
                    emailid = {connectionEmail}
                    wantToFromGroup = {formGroup}
                    groupName = {groupName}
                    setGroupName = {setGroupName}
                    userInGroup = {userInGroup}
                    setUserInGroup = {setUserInGroup}
                />
            ))}
            {formGroup && 
                <div>
                    <div>
                        <Button variant={themeName} className="btn w-100 mt-3" onClick={saveGroup}>Save Changes</Button>
                    </div>
                    <div>
                        <Button variant={themeName} className="btn w-100 mt-3" onClick={cancelGroup}>Cancel</Button>
                    </div>
                </div>
            }
        </div>
        </Container>
        </div>
    )
}

export default Connections
