import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { getPropertyById } from "./Api.jsx";
import PropertyById from "../Components/PropertyById";

import './App.css';

function PropertyById() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyData = await getPropertyById(id);
        const reviewsData = await getReviewsByPropertyId(id);
        setProperty(propertyData);
        setReviews(reviewsData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);
}
