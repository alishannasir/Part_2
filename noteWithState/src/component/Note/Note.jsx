const Note = ({ note, toggleImportnaceOf}) => {
  const label = note.importsnt ? "make not importsnt" : "make important"
    return (
      <>
             <li>{note.content}</li>
             <button onChange={toggleImportnaceOf}>{label}</button>
      </>
    )
  }
  
  export default Note