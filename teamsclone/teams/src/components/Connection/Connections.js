import React, {useState, useEffect} from 'react'
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import Connection from './Connection';

function Connections() {
    const {currentUser} = useAuth();
    const [connections, setConnections] = useState([]);

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
    return (
        <div>
            {connections.map(({ connectionId, connectionEmail }) => (
                <Connection 
                    key = {connectionId}
                    id = {connectionId}
                    emailid = {connectionEmail}
                />
            ))}
        </div>
    )
}

export default Connections
