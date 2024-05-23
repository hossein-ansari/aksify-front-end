import React from "react";
import "./profileHeader.css";
const profileHeader: React.FC<any> = (props: any) => {
  const data = props.userData.user

  return (
    <div className="profileHeaderBox">
      <div className="userDataBox">
        <p>{data.userName}: نام کاربری</p>
        <p><span>{data.subscriptionType}</span> : نوع اشتراک </p>
      </div>
      <div className="profileImageBox">
        <img className="profileImage" src="/aksifyLogo.png" alt="" />
      </div>
    </div>
  );
}
export default profileHeader