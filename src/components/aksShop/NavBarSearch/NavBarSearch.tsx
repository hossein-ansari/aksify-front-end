import React, { useEffect, useState } from "react";
import "./navBarSearch.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavBarSearch: React.FC<any> = ({ setQuery, searchItems }: any) => {
  const [tags, setTags] = useState<any>();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/tags/getAll`)
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
        console.log(data);
      });
  }, []);
  return (
    <div className="navBarSearchBox">
      <nav className="navSearchBar">
        <div className="NavSearch-bar">
          <form>
            <input
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              type="text"
              placeholder="Search..."
            />
            <button onClick={searchItems}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="navBarSearchList">
          <ul className="navBarSearch">
            {tags &&
              tags.map((tag: Record<string, string>) => (
                <li
                  onClick={(e) => {
                    setQuery(tag.name);
                    searchItems(e);
                  }}
                >
                  <p>{tag.name}</p>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default NavBarSearch;
