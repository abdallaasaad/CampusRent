import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchBar.css';
import { AuthContext } from '../context/AuthContext';

export default function SearchBar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [field, setField] = useState(params.get('field') || 'title');
  const [text, setText] = useState(params.get('q') || '');
  const [from, setFrom] = useState(params.get('from') || '');
  const [to, setTo] = useState(params.get('to') || '');

  // only show for student or business
  if (!user || user.isAdmin) return null;

  const handleSearch = () => {
    const p = new URLSearchParams();
    p.set('field', field);
    if (field === 'date') {
      if (from) p.set('from', from);
      if (to) p.set('to', to);
    } else {
      if (text) p.set('q', text);
    }
    navigate({ pathname: '/', search: p.toString() });
  };

  return (
    <div className="search-bar">
      <label>Search Apartments:</label>
      <select value={field} onChange={e => setField(e.target.value)}>
        <option value="title">Title</option>
        <option value="location">Location</option>
        <option value="date">Date</option>
      </select>
      {field === 'date' ? (
        <>
          <input type="date" value={from} max={new Date().toISOString().split('T')[0]} onChange={e=>setFrom(e.target.value)} />
          <span>to</span>
          <input type="date" value={to} max={new Date().toISOString().split('T')[0]} onChange={e=>setTo(e.target.value)} />
        </>
      ) : (
        <input type="text" placeholder="Enter search" value={text} onChange={e=>setText(e.target.value)} />
      )}
      <button onClick={handleSearch}>Search</button>
    </div>
  )}