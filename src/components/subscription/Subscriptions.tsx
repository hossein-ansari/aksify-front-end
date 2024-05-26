import React, { useEffect, useState } from "react";
import "./subscription.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import IuserDataCookie from "./interface";
import { useNavigate } from "react-router-dom";
const Subscriptions: React.FC = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<Array<Record<string, string | number>>>();
  const [cookies, setCookie] = useCookies(["user"]);
  const data:IuserDataCookie = cookies.user

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/subscriptions/getAll`)
      .then((response) => response.json())
      .then((data) => setSubscriptions(data));
  }, []);

  function changeUserSubscription (subId:string |number){
    const dataForSend = {
      userName:data.userName,
      subscriptionTypeId: subId
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/update`,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataForSend),
    })
      .then((response) => response.json())
      .then((data)=>{
        setCookie("user", data, {
          path: "/",
          expires: new Date(Date.now() + 604800000),
          sameSite: "lax",
          secure: true,
        });
        navigate('/profile')})
  }
  return (
    <div className="subscriptionsPage">
      {subscriptions &&
        subscriptions.map((subscription) => (
          <div className="subscriptionsBox">
            <div className="subscriptionsImgBox">
              <img
                className="subscriptionsImg"
                src={`${process.env.REACT_APP_API_BASE_URL}/${subscription.coverImage}`}
                alt=""
              />
            </div>
            <div className="subscriptionsData">
              <p className="subscriptionDataP">
                {" "}
                {subscription.name} : نوع اشتراک
                <FontAwesomeIcon className="diamondIcon" icon={faDiamond} />
              </p>
              <p className="subscriptionDataP">
              {subscription.limitExport} : تعداد خروجی در ماه
                <FontAwesomeIcon className="diamondIcon" icon={faDiamond} />
              </p>
              <p className="subscriptionDataP">
              {subscription.saveImageCount} : تعداد زخیره اخرین تعیرات 
                <FontAwesomeIcon className="diamondIcon" icon={faDiamond} />
              </p>
            </div>
            <div className="subscriptionButBtnBox">
              <button onClick={()=>{changeUserSubscription(subscription._id)}} className="subscriptionButBtn">قیمت {subscription.price} تومان</button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Subscriptions;
