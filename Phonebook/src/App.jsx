import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data);
        console.log(response.data);
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
      const isDuplicateName = persons.some(
        (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
      );
      const isDuplicateNumber = persons.some(
        (person) => person.number === newNumber.trim()
      );

      if (isDuplicateName || isDuplicateNumber) {
        if (isDuplicateName) {
          alert(`The name "${newName}" already exists!`);
        }
        if (isDuplicateNumber) {
          alert(`The number "${newNumber}" already exists!`);
        }
      } else {
        const newPerson = { name: newName.trim(), number: newNumber.trim() };
        axios.post("http://localhost:3001/persons", newPerson)
          .then((response) => {
            setPersons(persons.concat(response.data));
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
              Name: {p.name} Numbers: {p.number}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
