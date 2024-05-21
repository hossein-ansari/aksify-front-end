import React from "react";
import Palets from "../components/editImages/palets/Palets";
import Header from "../components/editImages/header/Header";

export default function EditPage() {
  return (
    <div className="editPage">
      <div className="EditBarPalet">
        <Palets></Palets>
        <Header></Header>
      </div>
      <div className="EditImageBar">
        <div className="editImageNavBar">
          <div className="editImageNavBox">
            <img className="editImageNavImage" src="/test.jpg" alt="" />
            <p className="editImageNavTitle">پاکت</p>
          </div>
          <div className="editImageNavBox">
            <img className="editImageNavImage" src="/test.jpg" alt="" />
            <p className="editImageNavTitle">پاکت</p>
          </div>
          <div className="editImageNavBox">
            <img className="editImageNavImage" src="/test.jpg" alt="" />
            <p className="editImageNavTitle">پاکت</p>
          </div>
          <div className="editImageNavBox">
            <img className="editImageNavImage" src="/test.jpg" alt="" />
            <p className="editImageNavTitle">پاکت</p>
          </div>
          <div className="editImageNavBox">
            <img className="editImageNavImage" src="/test.jpg" alt="" />
            <p className="editImageNavTitle">پاکت</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
