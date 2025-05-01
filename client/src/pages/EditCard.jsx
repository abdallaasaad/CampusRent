import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function EditCard() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const nav = useNavigate();
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`/cards/${id}`, { headers: { 'x-auth-token': token }})
      .then(r => r.json())
      .then(setCard);
  }, [id, token]);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/cards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
      body: JSON.stringify(card)
    }).then(() => nav('/admin'));
  };

  if (!card) return <div>Loading...</div>;
  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Card</h2>
      <input value={card.title} onChange={e=>setCard({...card, title:e.target.value})} />
      <textarea value={card.description} onChange={e=>setCard({...card, description:e.target.value})} />
      <input type="number" value={card.price} onChange={e=>setCard({...card, price: Number(e.target.value)})} />
      <input value={card.location} onChange={e=>setCard({...card, location:e.target.value})} />
      <input value={card.image.url} onChange={e=>setCard({...card, image:{...card.image, url:e.target.value}})} />
      <button type="submit">Save</button>
    </form>
  );
}