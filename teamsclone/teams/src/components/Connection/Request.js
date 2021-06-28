import React from 'react'
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import {Card, Button} from "react-bootstrap";

function Request(props) {
    const {currentUser} = useAuth();

    const acceptRequest = (event) => {
        event.preventDefault();
        db.collection("users").doc(props.id).collection("connections").doc(currentUser.uid).set({
            connectionEmail: currentUser.email,
        });
        db.collection("users").doc(currentUser.uid).collection("connections").doc(props.id).set({
            connectionEmail: props.emailid,
        });
        db.collection("users").doc(currentUser.uid).collection("connectionRequests").doc(props.id).delete().then(() => {
            console.log("Item successfully deleted!");
        }).catch((error) => {
            console.error("Error removing item: ", error);
        });
    }

    const declineRequest = (event) => {
        event.preventDefault();
        db.collection("users").doc(currentUser.uid).collection("connectionRequests").doc(props.id).delete().then(() => {
            console.log("Item successfully deleted!");
        }).catch((error) => {
            console.error("Error removing item: ", error);
        });
    }

    return (
        <div>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{props.emailid}</Card.Title>
                    <Button variant="primary" className="btn btn-primary w-100 mt-3" onClick={acceptRequest}>Accept</Button>
                    <Button variant="primary" className="btn btn-primary w-100 mt-3" onClick={declineRequest}>Decline</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Request
