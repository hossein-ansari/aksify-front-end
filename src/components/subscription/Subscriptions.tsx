import React, { useEffect, useState } from "react";
import "./subscription.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] =
    useState<Array<Record<string, string | number>>>();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/subscriptions/getAll`)
      .then((response) => response.json())
      .then((data) => setSubscriptions(data));
  }, []);

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
              <button className="subscriptionButBtn">قیمت {subscription.price} تومان</button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default Subscriptions;
