import { useState, useEffect } from "react";
import API_URL from "../api";
import { FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";

import atmosphere from "../images/logos/atmosphere.jpg";
import bountiful from "../images/logos/bountifultours.jpg";
import evergreen from "../images/logos/evergreen.png";
import lelepa from "../images/logos/lelepaislandtour.png";
import mystery from "../images/logos/mysteryislandtours.webp";
import nature from "../images/logos/naturetours.webp";
import offroad from "../images/logos/offroadadventures.jpg";
import paradise from "../images/logos/paradisetours.jpg";
import rarurentapao from "../images/logos/rarrurentapaorivercascadetour.jpg";
import santoheritage from "../images/logos/santoheritagetours.jpg";
import southpacific from "../images/logos/southpacifictours.jpg";
import ecolodge from "../images/logos/vanuatuecotours.png";
import vilahope from "../images/logos/vilahope.png";

function ForeignerTours() {
  const [tours, setTours] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/tours`)
      .then(res => res.json())
      .then(data => setTours(data));
  }, []);

  const getLogo = (name) => {
  const n = name.toLowerCase();

  if (n.includes("atmosphere")) return atmosphere;
  if (n.includes("bountiful")) return bountiful;
  if (n.includes("evergreen")) return evergreen;
  if (n.includes("lelepa")) return lelepa;
  if (n.includes("mystery")) return mystery;
  if (n.includes("nature")) return nature;
  if (n.includes("offroad")) return offroad;
  if (n.includes("paradise")) return paradise;
  if (n.includes("raru")) return rarurentapao;
  if (n.includes("santo")) return santoheritage;
  if (n.includes("south pacific")) return southpacific;
  if (n.includes("eco")) return ecolodge;
  if (n.includes("hope")) return vilahope;

  return null;
};

  const filtered = tours.filter(t =>
    `${t.name} ${t.location} ${t.services}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page foreigner-page">
      <div className="page-header">
        <h1>Tour Operators</h1>
        <p>Discover cultural and adventure experiences.</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search tours..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filtered.map((t, i) => (
          <div key={i} className="card">

            {/* ✅ EXACT SAME METHOD AS CAR RENTALS */}
            {getLogo(t.name) && (
              <img className="logo" src={getLogo(t.name)} alt={t.name} />
            )}

            <h3>{t.name}</h3>
            <p className="meta">{t.location}</p>
            <p>{t.services}</p>

            <div className="contact">
              <p><FaPhone /> {t.phone}</p>

              {t.email && (
                <p><FaEnvelope /> <a href={`mailto:${t.email}`}>{t.email}</a></p>
              )}

              {t.website && (
                <p><FaGlobe /> 
                  <a href={t.website} target="_blank" rel="noreferrer">Visit</a>
                </p>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ForeignerTours;