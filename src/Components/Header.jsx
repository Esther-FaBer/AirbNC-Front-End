import React, { userState } from 'react';
import './Header.css';

const Header = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    return (
    <header className="header">
      <div className="logo">AirbNC logo</div>
      <div className="search-bar">
        <div className="input-group">
          <label htmlFor="check-in">Check-in</label>
          <input
            type="date"
            id="check-in"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="check-out">Check-out</label>
          <input
            type="date"
            id="check-out"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
    <div className="input-group">
          <label htmlFor="guests">Guests</label>
          <input
            type="number"
            id="guests"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        <button className="search-button">Search</button>
      </div>
    </header>
  );
};
