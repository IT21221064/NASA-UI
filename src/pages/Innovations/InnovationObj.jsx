import React from "react";
import "./InnovationList.css";

const InnovationObj = ({ dataAirplane }) => {
  return (
    <div className="card card-img-custom">
      <img src={dataAirplane[10]} className="card-img-top " alt="Innovation" />
      <div
        className="card-body-scroll"
        style={{ overflowY: "scroll", maxHeight: "200px" }}
      >
        <h5 className="card-title custom2-h1">{dataAirplane[2]}</h5>
        <h6 className="card-subtitle mb-2  custom2-h2">{dataAirplane[3]}</h6>
      </div>
    </div>
  );
};

export default InnovationObj;
