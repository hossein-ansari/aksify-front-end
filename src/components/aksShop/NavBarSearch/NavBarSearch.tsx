import React from "react";
import "./navBarSearch.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function NavBarSearch() {
  return (
    <div className="navBarSearchBox">
      <nav className="navSearchBar">
        <div className="NavSearch-bar">
          <form action="/search" method="GET">
            <input type="text" placeholder="Search..." name="q" />
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="navBarSearchList">
          {" "}
          <ul className="navBarSearch">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
