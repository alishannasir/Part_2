import React, { useState, useEffect } from 'react';
import Source from './Source/Source';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    Source
    .getData()
      .then((data) => {
        setPersons(data);
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNames = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() !== "" && newNumber.trim() !== "") {
        const existingPerson = persons.find(
            (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
        );

        if (existingPerson) {
            if (window.confirm(`The name "${newName}" already exists. Do you want to update the number?`)) {
                const updatedPerson = { ...existingPerson, number: newNumber.trim() };
                Source.replaceData(existingPerson.id, updatedPerson)
                    .then((data) => {
                        setPersons(persons.map(person =>
                            person.id === existingPerson.id ? data : person
                        ));
                        setNewName("");
                        setNewNumber("");
                    })
                    .catch(error => {
                        console.error("Error updating person:", error);
                    });
            }
        } else {
            const newPerson = { name: newName.trim(), number: newNumber.trim() };
            Source.postData(newPerson)
                .then((data) => {
                    setPersons(persons.concat(data));
                    setNewName("");
                    setNewNumber("");
                })
                .catch(error => {
                    console.error("Error adding person:", error);
                });
        }
    }
};



  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    const results = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(results);
  };
 
   const handleDelete = (id)=>{
        window.confirm("do u really want to delete?")
        Source
        .deleteData(id)
        .then(()=>{
          const updated =  persons.filter(item => item.id !== id)
          setPersons(updated);
        })
        .catch((error)=>{
              console.error("Error deleting data:", error);     
        })
        
   }

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <div>
          <form onSubmit={handleSearchSubmit}>
            Filter Names:{" "}
            <input
              type="text"
              onChange={handleSearch}
              value={searchTerm}
              placeholder="Search Name here"
            />
            <button type="submit">Search</button>
          </form>
          {hasSearched && (
            <ul>
              {searchResult.length > 0 ? (
                searchResult.map((p, i) => <li key={i}>{p.name}</li>)
              ) : (
                <li>No results found</li>
              )}
            </ul>
          )}
        </div>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            onChange={handleNames}
            value={newName}
            placeholder="Enter Your Name"
          />
          <input
            type="text"
            onChange={handleNumber}
            placeholder="Enter Number"
            value={newNumber}
          />
          <button type="submit">Add</button>
        </form>
        <h1>Numbers</h1>
        <ul>
          {persons.map((p, i) => (
            <li key={i}>
              Name: {p.name} Numbers: {p.number} <button onClick={()=>{handleDelete(p.id)}}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
