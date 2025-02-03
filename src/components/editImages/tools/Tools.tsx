import React, { useContext, useState } from "react";
import { contextBox } from "../../../_context/context";
import Categories from "./categories/Categories";
import Items from "./items/Items";

import "./style.css";
export default function Tools() {
  return (
    <div className="toolBar">
      <Categories></Categories>
      <Items></Items>
    </div>
  );
}
