/* eslint-disable react/jsx-no-duplicate-props */
import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import ShowGroup from './ShowGroup';
import Header from './../HeaderFooter/Header';
import { Container } from "react-bootstrap";


function ShowGroups() {
    const {currentUser} = useAuth();
    const [groups, setGroups] = useState([]);
    useEffect(() => {
        db.collection("groups").where("groupMembers", "array-contains", currentUser.uid)
        .onSnapshot((snapshot) =>
            setGroups(snapshot.docs.map(doc => ({
                groupId: doc.id,
                groupName: doc.data().groupName
            })))
        );
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <Header />
            <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }} style={{ maxWidth: "400px" }}>
            <div className="w-100">
            <h2 className="text-center mb-4">Your Groups!</h2>
            {groups.map(({groupId, groupName}) => (
                <ShowGroup 
                    key = {groupId}
                    groupId = {groupId}
                    groupName = {groupName}
                />
            ))}
            </div>
            </Container>
        </div>
    )
    
}

export default ShowGroups
