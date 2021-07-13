import React, { useState, useEffect } from "react";
import "../../css/Notes.css";
import db from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";

function CreateArea(props) {
    const { currentUser } = useAuth();
    const pathname = window.location.pathname;
    const groupId = pathname.split(":")[1];
    const [note, setNote] = useState({
        id: "",
        title: "",
        content: "",
    });
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

    function handleChange(event) {
        const { name, value } = event.target;

        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    }

    function submitNote(event) {
        db.collection("groups")
            .doc(groupId)
            .collection("notes")
            .add({
                title: note.title,
                content: note.content,
            })
            .then(function (docRef) {
                //console.log("Document written with ID: ", docRef.id);
                db.collection("groups")
                    .doc(groupId)
                    .collection("notes")
                    .doc(docRef)
                    .set({
                        title: note.title,
                        content: note.content,
                        id: docRef,
                    });
                props.onAdd(note);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
        setNote({
            id: "",
            title: "",
            content: "",
        });
        event.preventDefault();
    }
    return (
        <div>
            <form>
                <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                />
                <textarea
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows="3"
                />
                <Button variant={themeName} onClick={submitNote}>
                    Add
                </Button>
            </form>
        </div>
    );
}

export default CreateArea;
