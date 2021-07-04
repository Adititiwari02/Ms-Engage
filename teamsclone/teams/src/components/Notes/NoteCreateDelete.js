/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import Note from "./Note";
import CreateNote from "./CreateNote";
import "../../css/Notes.css"
import Header from './../HeaderFooter/Header';
import { Container } from "react-bootstrap"

function NoteCreateDelete() {
  const [notes, setNotes] = useState([]);

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
          <div className="header">
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