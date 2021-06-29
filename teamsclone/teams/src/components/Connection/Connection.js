import React, {useState} from 'react'
import {Card, Button} from "react-bootstrap";

function Connection(props) {
    const [addRemove, setAddRemove] = useState("Add");
    function checkIfPresent() {   
        var idxOfUser = -1     
        for(let i = 0; i < props.userInGroup.length; i++) {
            if(props.userInGroup[i].id === props.id) {
                idxOfUser = i;
                break;
            }
        }
        return idxOfUser
    }

    function addRemoveUser() {
        const idx = checkIfPresent()
        const memberObj = {
            id: props.id,
            emailid: props.emailid
        }
        if(idx !== -1) {
            const newUserInGroup = props.userInGroup;
            newUserInGroup.splice(idx, 1);
            props.setUserInGroup(newUserInGroup);
            setAddRemove("Add")
        } else {
            props.setUserInGroup([...props.userInGroup, memberObj])
            setAddRemove("Remove")
        }
    }
    return (
        <div>
            <Card className="text-center mt-2">
                <Card.Body>
                    <Card.Title>{props.emailid}</Card.Title>
                    {props.wantToFromGroup && <Button onClick={addRemoveUser}>{addRemove}</Button>}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Connection
