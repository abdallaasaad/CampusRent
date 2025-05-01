import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ApartmentCard from '../components/ApartmentCard';
import '../styles/App.css';

export default function MyApartments() {
  const { token } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_BASE_URL||'http://localhost:3001'}/cards/my-cards`,{headers:{'x-auth-token':token}})
      .then(r=>r.json())
      .then(data=>{
        const mapped = data.map(c=>({
          title: c.title,
          location: c.location,
          price: c.price,
          date: new Date(c.createdAt).toISOString().split('T')[0],
          image: c.image.url
        }));
        setCards(mapped);
      });
  },[token]);
  return (
    <div className="apartment-list">
      {cards.map((apt,idx)=>(
        <ApartmentCard key={idx} {...apt}/>
      ))}
    </div>
  );
}
