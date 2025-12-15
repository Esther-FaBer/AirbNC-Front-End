import React from "react";
import { Link } from "react-router";

export const Navbar = () => {
    return (
    <nav>
        <Link to="/">Website</Link>
        <ul>
            <Link to="/about"><li>About</li></Link>
            <Link to="/properties"><li>Properties</li></Link>
            <Link to="/reviews"><li>Reviews</li></Link>
        </ul>

    </nav>
    )
}