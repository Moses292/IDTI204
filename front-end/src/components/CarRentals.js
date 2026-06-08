import { useState, useEffect } from "react";
import API_URL from "../api";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";

import avis from "../images/car_logos/avisvanuatu.png";
import budget from "../images/car_logos/budgetvanuatu.png";
import europcar from "../images/car_logos/europcar.jpg";
import globaldrive from "../images/car_logos/globaldrive.jpg";
import go2rent from "../images/car_logos/go2rent.png";
import hertz from "../images/car_logos/hertz.png";
import onwheels from "../images/car_logos/onwheelsvanuatu.png";
import pacificcarhire from "../images/car_logos/pacificcarhire.png";
import santocarhire from "../images/car_logos/santocarhire.png";
import santotropical from "../images/car_logos/santotropicalcar.jpg";
import wanderlust from "../images/car_logos/wanderlust.png";
import worldcar from "../images/car_logos/worldcarrentals.jpg";

function CarRentals() {
  const [rentals, setRentals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/car-rentals`)
      .then(res => res.json())
      .then(data => setRentals(data));
  }, []);

  const getLogo = (name) => {
  const n = name.toLowerCase();

  if (n.includes("world car")) return worldcar;
  if (n.includes("europcar")) return europcar;
  if (n.includes("avis")) return avis;
  if (n.includes("hertz")) return hertz;
  if (n.includes("budget")) return budget;
  if (n.includes("on wheels")) return onwheels;
  if (n.includes("go2rent")) return go2rent;
  if (n.includes("global drive")) return globaldrive;
  if (n.includes("santo tropical")) return santotropical;
  if (n.includes("pacific car")) return pacificcarhire;
  if (n.includes("santo car")) return santocarhire;
  if (n.includes("wanderlust")) return wanderlust;

  return null;
};

  const filtered = rentals.filter(r =>
    `${r.name} ${r.location} ${r.services}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="page cars-page">
      <div className="page-header">
        <h1>Car Rentals</h1>
        <p>Compare trusted rental companies.</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search rentals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filtered.map((r, i) => (
          <div key={i} className="card">

            {getLogo(r.name) && (
  <img className="logo" src={getLogo(r.name)} alt={r.name} />
)}

            <h3>{r.name}</h3>
            <p className="meta">{r.location}</p>
            <p>{r.services}</p>

            <div className="contact">
              <p><FaMapMarkerAlt /> {r.address}</p>
              <p><FaPhone /> {r.phone}</p>

              {r.email && (
                <p><FaEnvelope /> <a href={`mailto:${r.email}`}>{r.email}</a></p>
              )}

              <p><FaGlobe /> <a href={r.website} target="_blank" rel="noreferrer">Visit</a></p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default CarRentals;