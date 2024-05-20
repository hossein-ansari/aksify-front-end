import React from "react";
import Header from '../components/Header/Header'
import NavBarSearch from "../components/aksShop/NavBarSearch/NavBarSearch";
import AksLists from "../components/aksShop/AksList/AksLists";
import './app.css'
export default function AksShop() {

  return (
    <div>
      <Header></Header>
      <div className="aksShopTemplate">
        <AksLists />
        <NavBarSearch /> 
      </div>
    </div>
  );
}
