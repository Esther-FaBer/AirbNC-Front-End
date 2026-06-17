import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getProperties } from "./Api.js";
import './App.css';
import PropertiesGrid from "./Components/PropertiesGrid.jsx";
import Header from "./Components/Header.jsx";
import FilterBar from "./Components/FilterBar.jsx";
import PropertyDetail from "./Components/PropertyDetail.jsx";

function App() {
  const[properties, setProperties] = useState([]); // hold properties fetched from api
  const[isLoading, setIsLoading] = useState(true); // checks if loading.. should show
  const[hasErrored, setHasErrored] = useState(null); // stores an error if request fails
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "default"
  });
  
  //fecth properties
const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      setHasErrored(err);
    } finally {
      setIsLoading(false);
    }
  };

//fetched the properties data as soon as the app starts
useEffect(() => {
  fetchProperties()
}, []);

 //re-run filters whenever properties change
  useEffect(() => {
    let result = [...properties];

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter((p) =>
        p.property_name.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
      );
    }

    if (filters.minPrice !== "") {
      result = result.filter(
        (p) => Number(p.price_per_night) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice !== "") {
      result = result.filter(
        (p) => Number(p.price_per_night) <= Number(filters.maxPrice)
      );
    }

    if (filters.sortBy === "price_asc") {
      result.sort((a, b) => Number(a.price_per_night) - Number(b.price_per_night));
    } else if (filters.sortBy === "price_desc") {
      result.sort((a, b) => Number(b.price_per_night) - Number(a.price_per_night));
    } else if (filters.sortBy === "rating_desc") {
      result.sort((a, b) => Number(b.avg_rating) - Number(a.avg_rating));
    }

    setFilteredProperties(result);
  }, [filters, properties]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({ search: "", minPrice: "", maxPrice: "", sortBy: "default" });
  };


if (isLoading) {
    return <p>Loading...</p>
  }
if (hasErrored) {
  return <p>Error: {hasErrored.message}</p>;
}

return (
  <>
  <div className="App">
    <Header />

    <header searchValue={filters.search}
        onSearchChange={(value) => handleFilterChange("search", value)}/>

    <Routes>
      <Route path="/" element = {<PropertiesGrid properties={properties}/>} />
      <Route path="/property/:id" element={<PropertyDetail />} />
    </Routes>

  </div>
  </>
);
}

export default App;
