import React from "react";
import { Link } from "react-router-dom";
import styles from "./PropertiesGrid.module.css";

export default function PropertiesGrid({ properties }) {
    return (
        <div className={styles.grid}>
            {properties.map((property) => (
                <div key={property.property_id} className={styles.card}>
                    <div className={styles.imageContainer}>
                        <img 
                            src={property.image_url || "/placeholder.jpg"} 
                            alt={property.alt_tag}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.content}>
                        <h3 className={styles.title}>{property.property_name}</h3>
                        <p className={styles.location}>{property.location}</p>
                        <p className={styles.price}>£<span>{property.price_per_night}</span>/night</p>
                        <Link to={`/property/${property.property_id}`} className={styles.link}>
                            <button className={styles.button}>View Details</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};