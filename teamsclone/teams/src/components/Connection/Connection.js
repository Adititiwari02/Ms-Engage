import React from 'react'
import {Card} from "react-bootstrap";

function Connection(props) {
    return (
        <div>
            <h2 className="text-center mb-4">Your Connections!</h2>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{props.emailid}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Connection
