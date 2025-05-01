import '../styles/Form.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AddApartment() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ title:'', description:'', price:'', location:'', image:{url:'',alt:''} });
  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const handleSubmit = async e => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_BASE_URL||'http://localhost:3001'}/cards`, {
      method:'POST', headers:{'Content-Type':'application/json','x-auth-token':token},
      body: JSON.stringify(form)
    });
    navigate('/my-apartments');
  };
  return (
    <div className="form-page"><form onSubmit={handleSubmit} className="form-grid">
      <h2>Add Apartment</h2>
      <label>Title</label><input name="title" onChange={handleChange} required/>
      <label>Description</label><textarea name="description" onChange={handleChange}/>
      <label>Price</label><input name="price" type="number" onChange={handleChange} required/>
      <label>Location</label><input name="location" onChange={handleChange}/>
      <label>Image URL</label><input name="url" onChange={e=>setForm({...form,image:{...form.image,url:e.target.value}})} />
      <label>Image Alt</label><input name="alt" onChange={e=>setForm({...form,image:{...form.image,alt:e.target.value}})} />
      <button type="submit">Save</button>
    </form></div>
  );
}