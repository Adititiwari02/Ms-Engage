/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateNote from "./CreateNote";
import "../../css/Notes.css";
import Header from "./../HeaderFooter/Header";
import { Container } from "react-bootstrap";
import db from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

function NoteCreateDelete() {
    const { currentUser } = useAuth();
    const [notes, setNotes] = useState([]);
    const [themeNum, setThemeNum] = useState(-1);
    const pathname = window.location.pathname;
    const groupId = pathname.split(":")[1];
    const colors = [
        "#0D6EFD",
        "#198754",
        "#212529",
        "#DC3545",
        "#FFC107",
        "#6C757D",
    ];
    useEffect(() => {
        var docRef = db.collection("users").doc(currentUser.uid);
        docRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    setThemeNum(doc.data().themeNo);
                } else {
                    console.log("NOT FOUND ERROR!!");
                }
            })
            .catch((error) => {
                console.log("Error Fetching Document!");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        db.collection("groups")
            .doc(groupId)
            .collection("notes")
            .onSnapshot((snapshot) =>
                setNotes(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        title: doc.data().title,
                        content: doc.data().content,
                    }))
                )
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let header = {
        backgroundColor: colors[themeNum],
        padding: "16px 32px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
        color: "#fff",
        fontWeight: "200",
    };

    function addNote(newNote) {
        setNotes((prevNotes) => {
            return [...prevNotes, newNote];
        });
    }

    function deleteNote(id) {
        // setNotes((prevNotes) => {
        //     return prevNotes.filter((noteItem, index) => {
        //         return index !== id;
        //     });
        // });
        db.collection("groups")
            .doc(groupId)
            .collection("notes")
            .doc(id)
            .delete()
            .then(() => {
                setNotes([]);
                db.collection("groups")
                    .doc(groupId)
                    .collection("notes")
                    .onSnapshot((snapshot) =>
                        setNotes(
                            snapshot.docs.map((doc) => ({
                                id: doc.id,
                                title: doc.data().title,
                                content: doc.data().content,
                            }))
                        )
                    );
            })
            .catch((error) => {
                console.error("Error removing note: ", error);
            });
    }

    return (
        <div>
            <Header />
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
                style={{ maxWidth: "400px" }}
            >
                <div className="w-100">
                    <div style={header}>
                        <h1>Agenda/Notes</h1>
                    </div>
                    <CreateNote onAdd={addNote} />
                    {notes.map((note) => {
                        return (
                            <Note
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                content={note.content}
                                onDelete={deleteNote}
                            />
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}

export default NoteCreateDelete;
