import React from "react";

function ImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            src="../../public/images/Homebg.jpg"
            alt="Rover 1"
            style={{
              maxHeight: "450px",
              marginLeft: "50px",
            }}
          />
        </div>
        <div>
          <img
            src="../../public/images/EPIC.jpg"
            alt="Rover 2"
            style={{ maxHeight: "450px", margin: "50px" }}
          />
        </div>
      </Slider>
    </div>
  );
}

export default ImageSlider;
