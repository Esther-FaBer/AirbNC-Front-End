import React from "react";
import { Link } from "react-router";

export default function PropertiesGrid({ properties }) {
    return (
        <div className="PropertiesGrid">
            {properties.map((property) => {
                <Link to={`/Property/${property.id}`}>
                        <button>View Details</button>
                    </Link>
            })}
        </div>
    );
};