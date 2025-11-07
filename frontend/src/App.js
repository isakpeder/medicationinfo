import React, { useState } from 'react';
import './App.css';

function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [drugData, setDrugData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchHandler = async () => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setError('Plese enter at least 2 characters');
      return;
    }
    setLoading(true);
    setError(null); // Remove previous error message
    setDrugData(null); // Hide drug data from old search

    try {
      const response = await fetch(
        `http://localhost:5001/api/drugs/search?query=${encodeURIComponent(searchQuery)}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch drug data');
      }

      const data = await response.json();

      if (!data.drugs || data.drugs.length === 0) {
        setError('No drugs found');
        return;
      }

      setDrugData(data.drugs[0]);
    }

    catch (err) {
      console.error('Search error: ', err);
      setError('Failed to search for drug information');
    }
    finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
