import { useState, useEffect } from "react";
import API_URL from "../api";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";

// ✅ IMPORT IMAGES (FROM YOUR SCREENSHOT)
import breakas from "../images/acclogo/breakers.jpg";
import erakor from "../images/acclogo/erakor.jpg";
import grandhotel from "../images/acclogo/grand_hotel.jpg";
import holidayinn from "../images/acclogo/holiday_inn.jpg";
import melanesian from "../images/acclogo/melanesian.jpg";
import nasama from "../images/acclogo/nasama.jpg";
import ramada from "../images/acclogo/ramada.png";
import tamanu from "../images/acclogo/tamanu.jpg";
import warwick from "../images/acclogo/warwick.png";


function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/accommodations`)
      .then(res => res.json())
      .then(data => {
        setAccommodations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = accommodations.filter(place =>
    `${place.name} ${place.location} ${place.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ✅ FLEXIBLE MATCH (KEY FIX)
  const getLogo = (name) => {
    const n = name.toLowerCase();

    if (n.includes("breakas")) return breakas;
    if (n.includes("erakor")) return erakor;
    if (n.includes("grand")) return grandhotel;
    if (n.includes("holiday")) return holidayinn;
    if (n.includes("melanesian")) return melanesian;
    if (n.includes("nasama")) return nasama;
    if (n.includes("ramada")) return ramada;
    if (n.includes("tamanu")) return tamanu;
    if (n.includes("warwick")) return warwick;

    return null;
  };

  if (loading) return <p className="loading">Loading accommodations...</p>;

  return (
    <div className="page accommodations-page">
      <div className="page-header">
        <h1>Accommodations</h1>
        <p>Explore hotels, resorts, and guesthouses across Vanuatu.</p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search accommodations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 && <p className="empty">No results found.</p>}

      <div className="card-grid">
        {filtered.map((place, index) => (
          <div key={index} className="card">

            {getLogo(place.name) && (
              <img className="logo" src={getLogo(place.name)} alt={place.name} />
            )}

            <h3>{place.name}</h3>
            <p className="meta">{place.location} • {place.type}</p>

            {place.description && <p>{place.description}</p>}

            <div className="contact">
              <p><FaMapMarkerAlt /> {place.address}</p>
              <p><FaPhone /> {place.phone}</p>

              {place.email && (
                <p><FaEnvelope /> 
                  <a href={`mailto:${place.email}`}>{place.email}</a>
                </p>
              )}

              {place.website && (
                <p><FaGlobe /> 
                  <a href={place.website} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </p>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodations;
