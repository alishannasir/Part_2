import { useState, useEffect } from 'react'
import './App.css'
import Note from './component/Note/Note'
import axios, { Axios } from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("")
  const [show, setShow] = useState(true)
  // requesting data 
   useEffect(()=>{
    console.log("effect");
    
    axios.get('http://localhost:3001/notes').then((response)=>{
      setNotes(response.data)
    }).catch(error => {
      console.error("There was an error fetching the notes!", error);
    });
   },[])


  const addNote = (e)=>{
    e.preventDefault()
    console.log(`Clicked`, e.target);

    const noteobject = {
      content : newNote,
      important: Math.random() < 0.5,
    }
//  Pushed data to data base
   axios.post('http://localhost:3001/notes', noteobject).then((response)=>{
    setNotes(notes.concat(response.data))
    setNewNote("")
   }) .catch(error => {
    console.error("There was an error adding the note!", error);
  });

  }
  const handleNoteChange =(e)=>{
    setNewNote(e.target.value)
    
  }

  const toggleImportnaceOf=(id)=>{
      console.log(`importnace of ${id} needs to be toggled`);
      const url = `http://localhost:3001/notes/${id}`
      const note = note.find(n=>n.id ===id)
      const changeNote= {...note, important: !note.important}
      axios.put(url, changeNote).then(response=>{
        setNotes(notes.map(n=>n.id !== id ? n : response.data))
      })
  }
  return (
    <> 
        <div>
            <h1>Notes</h1>
            <div>
               <button onClick={()=> {
                setShow(!show)
               }}>
                  show {show ? "important" : 'all'}
               </button>
            </div>
              <ul>
              {
            notes.map(note => (
              <Note 
              key={note.id}  
              note={note} 
              toggleImportnaceOf={()=>{toggleImportnaceOf(note.id)}}
              />
            ))
          }
              </ul>
            <form action="" onSubmit={addNote}>         
                <input placeholder='Write what do u want' value={newNote} onChange={handleNoteChange}/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    </>
  )
}

export default App
