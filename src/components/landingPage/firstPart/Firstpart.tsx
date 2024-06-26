import React, { useRef } from "react";
import "./firstpart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function FirstPart() {
  const videoRef = useRef<any>(null);
  const handleVideoEnded = () => {
    videoRef.current.play();
  };
  return (
    <div className="firstPartContainer">
      <div className="rightBox">
        <div className="title">
          <h2>ساخت عکسِ </h2>
          <h1>
            <span className="productTag">محصولات</span> خود
          </h1>
        </div>
        <div className="advantagesBox">
          <ul className="advantagesBoxUl">
            <li className="advantagesItems">
              <p> کیفیت بالا با هزینه ای کم</p>
              <FontAwesomeIcon className="diamondIcon" icon={faDiamond} />
            </li>
            <li className="advantagesItems">
              {" "}
              <p> پلتفرم فارسی چاپ عکس</p>
              <FontAwesomeIcon className="diamondIcon" icon={faDiamond} />
            </li>
            <li className="advantagesItems">
              <p> عکس های حرفه ای</p>
              <FontAwesomeIcon className="diamondIcon" icon={faDiamond} />
            </li>
          </ul>
        </div>
        <div className="btnBox">
          <Link className="btn" to="/aksshop">
            شروع ساخت
          </Link>
          <Link className="btn" to="/aksshop">
            راهنمای ساخت
          </Link>
        </div>
      </div>
      <div className="leftBox">
      <video controls={false} className="video-element" autoPlay loop muted ref={videoRef} onEnded={handleVideoEnded}>
        <source src="/landingVideo.mp4" type="video/mp4" />
      </video>
      </div>
    </div>
  );
}
