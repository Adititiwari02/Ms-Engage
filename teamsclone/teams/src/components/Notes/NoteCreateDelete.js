import React, { useState } from "react";
import Note from "./Note";
import CreateNote from "./CreateNote";
import "./Notes.css"

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
  );
}

export default NoteCreateDelete;