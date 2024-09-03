import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const namesInput = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Filter countries based on the input value
    const matches = countries.filter((country) =>
      country.name.common.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Check if there are too many matches
    if (matches.length > 10) {
      <p>Too Many Matches, please specify</p>
    } else {
      setFilteredCountries(matches);
    }
  };

  return (
    <>
      <h1>Countries Information</h1>
      <input
        type="text"
        value={value}
        onChange={namesInput}
        placeholder="country name"
      />

      <ul>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))
        ) : value.length > 0 ? (
          <li>No matches found or too many matches. Please refine your search.</li>
        ) : null}
      </ul>
    </>
  );
}

export default App;
