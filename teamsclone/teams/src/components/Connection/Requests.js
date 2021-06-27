import React, { useEffect, useState } from "react";
import Request from './Request';
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';


function Requests() {
    const {currentUser} = useAuth();
    const [connections, setConnections] = useState([]);

    useEffect(() => {
        db.collection("users").doc(currentUser.uid).collection("connectionRequests")
        .onSnapshot((snapshot) => 
            setConnections(snapshot.docs.map((doc) => ({
                requestId: doc.id,
                request: doc.data()
            })))
        );
    // eslint-disable-next-line
    }, [])

    return (
    <div>
        <h2 >Connection Requests</h2>
        <div>
            {connections.map(({ requestId, request }) => (
                <Request 
                    key = {requestId}
                    id = {requestId}
                    emailid = {request.requestEmail}
                />
            ))}
        </div>
    </div>
  );
}

export default Requests;