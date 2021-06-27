import React from 'react'
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';
import {Card, Button} from "react-bootstrap";

function Request(props) {
    const {currentUser} = useAuth();

    const acceptRequest = (event) => {
        event.preventDefault();
        db.collection("users").doc(props.id).collection("connections").doc(currentUser.uid).set({
            connnectionEmail: currentUser.email,
        });
        db.collection("users").doc(currentUser.uid).collection("connections").doc(props.id).set({
            connnectionEmail: props.emailid,
        }).then(() => {
            db.collection("users").doc(currentUser.uid).collection("connnectionRequests").doc(props.id).delete();
        });
    }

    const declineRequest = (event) => {
        event.preventDefault();
        db.collection("users").doc(currentUser.uid).collection("connnectionRequests").doc(currentUser.uid).delete().then(() => {
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
                    <Button variant="primary" onClick={acceptRequest}>Accept</Button>
                    <Button variant="primary" onClick={declineRequest}>Decline</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Request
