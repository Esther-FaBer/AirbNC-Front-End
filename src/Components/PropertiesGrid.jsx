import React from "react";
import { Link } from "react-router-dom";
import styles from "./PropertiesGrid.module.css";

export default function PropertiesGrid({ properties }) {
    return (
        <div className={styles.grid}>
            {properties.map((property) => (
                <div key={property.id} className={styles.card}>
                    <div className={styles.imageContainer}>
                        <img 
                            src={property.image || "/placeholder.jpg"} 
                            alt={property.property_name}
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.content}>
                        <h3 className={styles.title}>{property.name}</h3>
                        <p className={styles.location}>{property.location.city}</p>
                        <p className={styles.price}>${property.price_per_night}/night</p>
                        <Link to={`/Property/${property.property_id}`} className={styles.link}>
                            <button className={styles.button}>View Details</button>
                        </Link>
                    </div>
                </div>
            ))}
            </div>
    );
};