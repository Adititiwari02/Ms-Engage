import React, {useState, useEffect} from 'react'
import db from './../../firebase';
import { useAuth } from './../../contexts/AuthContext';
import { Button} from "react-bootstrap"

function User(props) {
    const {currentUser} = useAuth();
    const [ifConnection, setIfConnection] = useState(false);
    useEffect(() => {
        db.collection('users').doc(currentUser.uid).collection("connection").doc(props.id).get().then((doc) => {
            if (doc.exists) {
                setIfConnection(true);
            }
        })
    // eslint-disable-next-line
    }, [])
    const sendRequest = (event) => {
        event.preventDefault();

        db.collection("users").doc(props.id).collection("connectionRequests").doc(currentUser.uid).set({
            requestEmail: currentUser.email,
            requestAccepted: false
        });
    }

    if (currentUser && currentUser.uid === props.id) {       
        return (                                    //makes sure we dont display current user
            <div style={{display:'none'}}>
            </div>
        )
    }
    return (
        <div>
            
            {props.email} 
            {ifConnection ? 
                <p>Connected ✔ </p> :
                // eslint-disable-next-line jsx-a11y/accessible-emoji
                <Button className="w-100 mb-4" onClick={sendRequest}>Connect ➕</Button>}
        </div> 
    )
}

export default User
