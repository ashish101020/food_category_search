import { useState, useEffect } from "react";
import axios from "axios";
import "./Frame.css";

const Frame = () => {
    const [countries, setCountries] = useState([]);

    const fetchCountries = async() => {
        try {
            const response = await axios.get("https://xcountries-backend.azurewebsites.net/all");
            setCountries(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    useEffect(() => {
      fetchCountries();
    }, [])
    
    return (
        <>
        <div className="flag-container">
        {countries.map((country) => (
          <div key={country.name} className="country-box">
            <img src={country.flag} alt={country.abbr} className="flag-image" />
            <h3>{country.name}</h3>
          </div>
        ))}
      </div>
        </>
    )
}

export default Frame;