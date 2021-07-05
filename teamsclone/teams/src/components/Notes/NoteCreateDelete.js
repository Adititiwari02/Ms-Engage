/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateNote from "./CreateNote";
import "../../css/Notes.css"
import Header from './../HeaderFooter/Header';
import { Container } from "react-bootstrap"
import db from '../../firebase';
import {useAuth} from '../../contexts/AuthContext';

function NoteCreateDelete() {
  const {currentUser} = useAuth();
  const [notes, setNotes] = useState([]);
  const [themeName, setThemeName] = useState("");
    useEffect(() => {
        var docRef= db.collection("users").doc(currentUser.uid)
        docRef.get().then((doc) => {
            if(doc.exists) {
                setThemeName(doc.data().themeChoice)
            } else {
                console.log("NOT FOUND ERROR!!")
            }
        }).catch((error) =>{
            console.log("Error Fetching Document!")
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  let header = {}
  if(themeName === "primary") {
    header = {
      backgroundColor: "#0D6EFD",
      margin: "auto -16px",
      padding: "16px 32px",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
      color: "#fff",
      fontWeight: "200",
    }
  } else if(themeName === "success"){
    header = {
      backgroundColor: "#198754",
      margin: "auto -16px",
      padding: "16px 32px",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
      color: "#fff",
      fontWeight: "200",
    }
  } else if(themeName === "dark") {
    header = {
      backgroundColor: "#212529",
      margin: "auto -16px",
      padding: "16px 32px",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
      color: "#fff",
      fontWeight: "200",
    }
  } else if(themeName === "danger") {
    header = {
      backgroundColor: "#DC3545",
      margin: "auto -16px",
      padding: "16px 32px",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
      color: "#fff",
      fontWeight: "200",
    }
  } else if(themeName === "warning") {
    header = {
      backgroundColor: "#FFC107",
      margin: "auto -16px",
      padding: "16px 32px",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
      color: "#fff",
      fontWeight: "200",
    }
  } else if(themeName === "secondary") {
    header = {
      backgroundColor: "#6C757D",
      margin: "auto -16px",
      padding: "16px 32px",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.3)",
      color: "#fff",
      fontWeight: "200",
    }
  }
  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
        <Header />
        <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }} style={{ maxWidth: "400px" }}>
        <div className="w-100">
          <div style={header}>
              <h1>Agenda/Notes</h1>
          </div>
          <CreateNote onAdd={addNote} />
          {notes.map((noteItem, index) => {
              return (
              <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
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