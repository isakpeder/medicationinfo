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

      console.log('Drug data structure:', JSON.stringify(data.drugs[0], null, 2));

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
    <div className="app">
      <h1>MedInfo</h1>

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a drug..."
          onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
        ></input>
        <button onClick={searchHandler} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>

    {/* RESULTS CONTAINER */}
    <div className="results-container">
      
      {/* ERROR MESSAGE */}
      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {/* LOADING INDICATOR */}
      {loading && (
        <div className="loading">
          Searching for drug information...
        </div>
      )}

      {/* DRUG INFORMATION DISPLAY */}
      {drugData && (
        <div className="drug-info">
          
          <h2>
            {drugData.brandName || 
             drugData.genericName || 
             'Unknown Drug'}
          </h2>

          {/* Brand Name */}
          <div className="info-section">
            <h3>Name</h3>
            <p>{drugData.brandName || 'Not available'}</p>
          </div>

          {/* Generic Name */}
          <div className="info-section">
            <h3>Generic Name</h3>
            <p>{drugData.genericName || 'Not available'}</p>
          </div>

          {/* Manufacturer */}
          <div className="info-section">
            <h3>Manufacturer</h3>
            <p>{drugData.manufacturer || 'Not available'}</p>
          </div>

          {/* Purpose */}
          <div className="info-section">
            <h3>Purpose</h3>
            <p>{drugData.purpose || 'Not available'}</p>
          </div>

          {/* Warnings */}
          <div className="info-section warning">
            <h3>Warnings</h3>
            <div className="warning-text">
              {drugData.warnings || 'Not available'}
            </div>
          </div>

          {/* Side Effects (Adverse Reactions) */}
          <div className="info-section">
            <h3>Side Effects (Adverse Reactions)</h3>
            <p>{drugData.sideEffects || 'Not available'}</p>
          </div>

          {/* Dosage */}
          <div className="info-section">
            <h3>Dosage and Administration</h3>
            <p>{drugData.dosage || 'Not available'}</p>
          </div>

          {/* Contraindications */}
          <div className="info-section">
            <h3>Contraindications</h3>
            <p>{drugData.contraindications || 'Not available'}</p>
          </div>

        </div>
      )}

      {/* NO RESULTS MESSAGE */}
      {!loading && !error && !drugData && searchQuery && (
        <div className="no-results">
          <p>No results found for "{searchQuery}"</p>
          <p>Try searching for a different drug name.</p>
        </div>
      )}

      </div>
    </div>
  );
}

export default App;
