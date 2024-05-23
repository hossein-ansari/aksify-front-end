import React from "react";
import "./lastchanges.css";
const LastChanges: React.FC<any> = (props: any) => {
  return (
    <div className="lastChangesBox">
      <div className="lastChangesTitle">
        <p>اخرین تغییرات</p>
      </div>
      <div className="lastChangesImages">

      <div className="lastChangesImgBox">
        <img
          className="lastChangesImgImage"
          src='/aksifyLogo.png'
          alt='adsf'
        />
        <p className="lastChangesImgTitle">adsf</p>
      </div>
      <div className="lastChangesImgBox">
        <img
          className="lastChangesImgImage"
          src='/aksifyLogo.png'
          alt='adsf'
        />
        <p className="lastChangesImgTitle">adsf</p>
      </div>
      <div className="lastChangesImgBox">
        <img
          className="lastChangesImgImage"
          src='/aksifyLogo.png'
          alt='adsf'
        />
        <p className="lastChangesImgTitle">adsf</p>
      </div>
      <div className="lastChangesImgBox">
        <img
          className="lastChangesImgImage"
          src='/aksifyLogo.png'
          alt='adsf'
        />
        <p className="lastChangesImgTitle">adsf</p>
      </div>
      </div>
    </div>
  );
}
export default LastChanges 