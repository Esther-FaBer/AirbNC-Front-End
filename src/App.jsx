import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getProperties } from "./Api.js";
import './App.css';
import PropertiesGrid from "./Components/PropertiesGrid.jsx";
import Header from "./Components/Header.jsx";
import FilterBar from "./Components/FilterBar.jsx";

function App() {
  const[properties, setProperties] = useState([]); // hold properties fetched from api
  const [filteredProperties, setFilteredProperties] = useState([]);
  const[isLoading, setIsLoading] = useState(true); // checks if loading.. should show
  const[hasErrored, setHasErrored] = useState(null); // stores an error if request fails
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "default"
  });
  
  //fecth Properties from API
  const fetchProperties = async () => {
    try {
      const properties = await getProperties();
      setProperties(properties);
    } catch (err){
      setHasErrored(err);
    } finally {
      setIsLoading(false);
    };
  };
console.log(properties[0])

//fetched the properties data as soon as the app starts
useEffect(() => {
  fetchProperties()
}, []);

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

    <header className="Title">
      <h1>Properties</h1>
    </header>

    <Routes>
      <Route path="/" element = {<PropertiesGrid properties={properties}/>} />
    </Routes>

  </div>
  </>
);
}

export default App;
