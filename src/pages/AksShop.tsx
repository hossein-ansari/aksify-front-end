import React, { useState } from "react";
import Header from "../components/Header/Header";
import NavBarSearch from "../components/aksShop/NavBarSearch/NavBarSearch";
import AksLists from "../components/aksShop/AksList/AksLists";
import "./app.css";
export default function AksShop() {
  const [search, setSearch] = useState<string>("");
  const [itemsSearched, setItemsSearched] = useState();
  async function searchItems(e: Event) {
    e.preventDefault();
    await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/products/searchItems?word=${search}`
    )
      .then((response) => response.json())
      .then(data => setItemsSearched(data));
  }
  return (
    <div>
      <Header></Header>
      <div className="aksShopTemplate">
        <AksLists itemsSearched={itemsSearched} />
        <NavBarSearch setQuery={setSearch} searchItems={searchItems} />
      </div>
    </div>
  );
}
