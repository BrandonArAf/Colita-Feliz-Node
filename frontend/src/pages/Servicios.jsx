import { useEffect, useState } from 'react';
import { getServicios } from '../lib/api.js';
import ServicioCard from '../components/ServicioCard.jsx';

export default function Servicios(){
  const [items, setItems] = useState([]);
  useEffect(()=>{ (async()=> setItems(await getServicios()))(); }, []);
  return (
    <div>
      <h1 className="mb-3">Servicios</h1>
      <div className="row g-3">
        {items.map(s => (
          <div key={s.id} className="col-12 col-sm-6 col-lg-4">
            <ServicioCard s={s} />
          </div>
        ))}
      </div>
    </div>
  );
}
