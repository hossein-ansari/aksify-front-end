import React from "react";
import "./lastchanges.css";
import { useNavigate } from "react-router-dom";
const LastChanges: React.FC<any> = (props: any) => {
  const lastChangesData = props.lastChangesData;
  const navigate = useNavigate()
  function navigator(img:string,itemId:string) {
    navigate(`/editImage/${img}/${itemId}`)
  }
  return (
    <div className="lastChangesBox">
      <div className="lastChangesTitle">
        <p>اخرین تغییرات</p>
      </div>
      <div className="lastChangesImages">
        {lastChangesData &&
          lastChangesData.map((items: any) => (
            <div
              onClick={(e) => {
                navigator(items.backGroundImage.id,items._id);
              }}
              className="lastChangesImgBox"
            >
              <img
                className="lastChangesImgImage"
                src={`${process.env.REACT_APP_API_BASE_URL}/${items.backGroundImage.coverImg}`}
                alt={items.backGroundImage.coverImg}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
export default LastChanges;
