import React, { useState } from "react";
import "./profileHeader.css";
import { useNavigate } from 'react-router-dom';

const ProfileHeader: React.FC<any> = (props: any) => {
  const data = props.userData;
  const navigate = useNavigate();
  async function logout() {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/logout`, {
      method: 'POST',
      credentials: 'include'
    })
    .then((response) => {
      if (response.ok) {
        // Successfully logged out
        // Redirect to login page or home page
        navigate('/login');
      } else {
        // Handle errors
        console.error('Logout failed');
      }
    })
    .catch((error) => {
      console.error('Error logging out:', error);
    });
  }
  return (
    <div className="profileHeaderBox">
      <div className="userDataBox">
        <p>
          <span
            style={{
              color: (data.subscriptionType.limitExport <= 0 ? 'red' : ''),
            }}
          >
            {data.subscriptionType.limitExport}
          </span>{" "}
          : تعداد خروجی باقی مانده
        </p>
        <p>
          <span>{data.subscriptionType.saveImageCount}</span> : تعداد اخرین
          تغیرات قابل ذخیره
        </p>
      </div>
      <div className="userDataBox">
        <p>{data.userName}: نام کاربری</p>
        <p>
          <span>{data.subscriptionType.name}</span> : نوع اشتراک
        </p>
      </div>

      <div className="profileImageBox">
        <img className="profileImage" src="/aksifyLogo.png" alt="" />
        <button onClick={logout} className="logOutBtn">خروج</button>
      </div>
    </div>
  );
};
export default ProfileHeader;
