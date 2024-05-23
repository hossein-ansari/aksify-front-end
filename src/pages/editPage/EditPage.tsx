import React, { useEffect, useState } from "react";
import Palets from "../../components/editImages/palets/Palets";
import Header from "../../components/editImages/header/Header";
import "./editPage.css";
import { useParams } from "react-router-dom";

const EditPage: React.FC<any> = (props: any) => {
  const [productImages, setProductImages] = useState<Array<string>>([]);
  const [coverImage, setCoverImage] = useState<string>("");
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/getOne/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProductImages(data.images);
        setCoverImage(data.coverImage);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  function changeCover(image: string):void{
    setCoverImage(image);
  }
  return (
    <div className="editPage">
      <div className="EditBarPalet">
        <Palets coverImage={coverImage} />
        <Header />
      </div>
      <div className="EditImageBar">
        <h3 className="chooseImg">انتخاب عکس</h3>
        <div className="editImageNavBar">
          {productImages.map((image) => (
            <div
              key={image}
              className="editImageNavBox"
              onClick={(e)=>changeCover(image)}
            >
              <img
                className="editImageNavImage"
                src={`${process.env.REACT_APP_API_BASE_URL}/${image}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditPage;
