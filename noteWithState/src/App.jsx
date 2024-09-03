import { useState, useEffect } from 'react'
import './App.css'
import Note from './component/Note/Note'
import Services from './Services/Services';
import Notification from './component/Notification/Notification';
import Footer from './component/Footer/Footer';

function App() {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [show, setShow] = useState(true);
  const [errormessage, setErrorMessage] = useState('some error happend....')

  // Requesting data
  useEffect(() => {
    Services
      .getAll()
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(`${error} Problem in data fetching`);
      });
  }, []);

// if notes state is null then dont render 
if (!notes) {     return null   }

  const addNote = (e) => {
    e.preventDefault();
    console.log(`Clicked`, e.target);

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    // Pushing data to database
    Services
      .create(noteObject)
      .then((response) => {
        setNotes(notes.concat(response.data));
        setNewNote("");
      })
      .catch(error => {
        console.error("There was an error adding the note!", error);
      });
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportnaceOf = (id) => {
    console.log(`Importance of ${id} needs to be toggled`);
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    Services
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map(n => n.id !== id ? n : response.data));
      })
      .catch(error => {
        setErrorMessage(
          `note ${note.content} was already removed from server.`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        setNotes(notes.filter(n => n.id !== id))
      });
  };

  return (
    <> 
      <div>
        <h1>Notes</h1>
        <Notification message={errormessage} />
        <div>
          <button className='note' onClick={() => setShow(!show)}>
            show {show ? "important" : 'all'}
          </button>
        </div>
        <ul>
          {
            notes.map(note => (
              <Note 
                key={note.id}  
                note={note} 
                toggleImportnaceOf={() => toggleImportnaceOf(note.id)}
              />
            ))
          }
        </ul>
        <form onSubmit={addNote}>         
          <input 
            placeholder='Write what do you want' 
            value={newNote} 
            onChange={handleNoteChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default App;
