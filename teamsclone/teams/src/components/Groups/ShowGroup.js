import React, {useState} from 'react'
import {Card} from "react-bootstrap";

function ShowGroup(props) {
    const [clicked, setClicked] = useState(false)
    const [groupClicked, setGroupClicked] = useState("")
    const styleMsgs = {
        position: "relative",
        left: "200%",
        top: "0%"
    }
    function showInfo() {
        console.log(props.groupName)
        setClicked(!clicked)
        if(!clicked) setGroupClicked(props.groupName)
    }
    return (
        <div>
            <Card className="text-center mt-2" onClick={showInfo}>
                <Card.Body>
                    <Card.Title>{props.groupName}</Card.Title>
                </Card.Body>
            </Card>   
            {clicked && 
            <div style={styleMsgs}>
                <Card className="text-center mt-2" onClick={showInfo}>
                    <Card.Body>
                        <Card.Title>You are seeing {groupClicked}</Card.Title>
                    </Card.Body>
                </Card>   
            </div>}
        </div>
    )
}

export default ShowGroup
