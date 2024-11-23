import React, { Fragment, useRef } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    const searchRef = useRef();
    const navigate = useNavigate();

    function handleSearch(event) {
        event.preventDefault();
        const keyword = searchRef.current.value;

        if (keyword.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(keyword)}`);
        }
        else {
            alert("fuck you");
        }
    }

    return (
        <Fragment>
            <header className="website-nav">
                <div className="website-name">W3BANIMEL1ST</div>
                <div className="page-link">
                    <Link to="/">Home</Link>
                    <Link to="/upcoming">Upcoming</Link>
                    <Link to="/currently-airing">Airing</Link>
                </div>
                <form className="search-place" id="search-place" name="search-placeholder">
                    <input type="search" placeholder="search anime name..." required ref={searchRef} 
                    name="search-anime"/>
                    <button type="submit" onClick={handleSearch}>Search</button>
                </form>
            </header>
        </Fragment>
    )
}