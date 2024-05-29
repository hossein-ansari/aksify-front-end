import React from "react";
import Header from "../components/Header/Header";
import ProfileHeader from "../components/profile/profileHeader/profileHeader";
import LastChanges from "../components/profile/lastChanges/LastChanges";
import { useCookies } from "react-cookie";
import Footer from "../components/footer/Footer";

export default function Profile() {
  const [cookies] = useCookies(["user"]);
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
