import React, { useState, useEffect } from "react";
import "../../css/Notes.css";
import db from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";

function Note(props) {
    const { currentUser } = useAuth();
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

    function handleClick() {
        props.onDelete(props.id);
    }

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <Button variant={themeName} onClick={handleClick}>
                DELETE
            </Button>
        </div>
    );
}

export default Note;
