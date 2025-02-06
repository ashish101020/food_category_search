import { useEffect, useState } from "react";

const Foods_API = () => {
  const [mealData, setMealData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Indian"); 
  const [inputData, setInputData] = useState("");
  const countryName = ["Indian", "Canadian", "Italian", "Chinese", "American", "Russian", "Thai", "Japanese", "Australian"];

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const api = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`
        );
        const data = await api.json();
        setMealData(data.meals || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataFromAPI();
  }, [selectedCountry]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const api = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputData}`
        );
        const data = await api.json();
        // console.log(data)
        setMealData(data.meals || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

  }

  return (
    <>
      <div className="button-container">
        {countryName.map((name) => (
          <button
            key={name}
            className={`country-button ${selectedCountry === name ? "active" : ""}`}
            onClick={() => setSelectedCountry(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <form className="search-bar" onSubmit={submitHandler}>
        <input type="text" onChange={(e) => setInputData(e.target.value)} />
      </form>

      <div className="meal-container">
        {mealData.map((meal) => (
          <div key={meal.idMeal} className="meal-item">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
            <h3>{meal.strMeal}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Foods_API;
