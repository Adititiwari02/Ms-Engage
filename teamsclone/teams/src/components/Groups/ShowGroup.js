import React, {useState} from 'react';
import {Card} from "react-bootstrap";
// import db from '../../firebase';

function ShowGroup(props) {
    var [input, setInput] = useState("");
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
    function sendMessage() {
        console.log(input);
        // db.collection
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
                <Card className="text-center mt-2">
                    <Card.Body>
                        <Card.Title>You are seeing {groupClicked}</Card.Title>
                        <div>
                            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                            <button type="submit" onClick={sendMessage}> Send a Message</button>
                        </div>
                    </Card.Body>
                </Card>   
            </div>}
        </div>
    )
}

export default ShowGroup
