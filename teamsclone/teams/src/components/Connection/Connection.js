import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import db from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

function Connection(props) {
    const { currentUser } = useAuth();
    const [addRemove, setAddRemove] = useState("Add");
    const [themeName, setThemeName] = useState("");
    useEffect(() => {
        var docRef = db.collection("users").doc(currentUser.uid);
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setThemeName(doc.data().themeChoice);
                } else {
                    console.log("NOT FOUND ERROR!!");
                }
            })
            .catch((error) => {
                console.log("Error Fetching Document!");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function checkIfPresent() {
        var idxOfUser = -1;
        for (let i = 0; i < props.userInGroup.length; i++) {
            if (props.userInGroup[i] === props.id) {
                idxOfUser = i;
                break;
            }
        }
        return idxOfUser;
    }

    function addRemoveUser() {
        const idx = checkIfPresent();
        if (idx !== -1) {
            const newUserInGroup = props.userInGroup;
            newUserInGroup.splice(idx, 1);
            props.setUserInGroup(newUserInGroup);
            setAddRemove("Add");
        } else {
            props.setUserInGroup([...props.userInGroup, props.id]);
            setAddRemove("Remove");
        }
    }
    return (
        <div>
            <Card className="text-center mt-2">
                <Card.Body>
                    <Card.Title>{props.emailid}</Card.Title>
                    {props.wantToFromGroup && (
                        <Button variant={themeName} onClick={addRemoveUser}>
                            {addRemove}
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}

export default Connection;
