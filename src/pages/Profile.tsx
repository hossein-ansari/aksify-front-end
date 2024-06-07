import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ProfileHeader from "../components/profile/profileHeader/profileHeader";
import LastChanges from "../components/profile/lastChanges/LastChanges";
import { useCookies } from "react-cookie";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState<any>();
  const [lastChangesData, setLastChangesData] = useState();
  async function getUserData() {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/user-data`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setDataUser(data.user);
        const userId = data.user.id;
        fetch(
          `${process.env.REACT_APP_API_BASE_URL}/lastChanges/getOne/${userId}`
        )
        .then((response) => response.json())
        .then((data) => {
          setLastChangesData(data);
        })
        .catch((error) => { console.log(error)});
      })
      .catch((error) => {
        navigate("/login");
      });
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="profilePage">
      <Header />
      <div className="profileContainer">
        {dataUser && lastChangesData &&(
          <>
            <ProfileHeader userData={dataUser} />
            <LastChanges lastChangesData={lastChangesData} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
