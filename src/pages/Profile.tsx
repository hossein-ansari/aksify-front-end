import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ProfileHeader from "../components/profile/profileHeader/profileHeader";
import LastChanges from "../components/profile/lastChanges/LastChanges";
import { useCookies } from "react-cookie";
import Footer from "../components/footer/Footer";

export default function Profile() {
  const [userData,setUserData] = useState()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/user-data`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/user-data`)
          .then((response) => response.json())
          .then((data) => {
            setUserData(data)
          });
      })
      .catch((error) => {});
  }, []);
  return (
    <div className="profilePage">
      <Header />
      <div className="profileContainer">
        <ProfileHeader userData={cookies} />
        <LastChanges userData={cookies} />
      </div>
      <Footer />
    </div>
  );
}
