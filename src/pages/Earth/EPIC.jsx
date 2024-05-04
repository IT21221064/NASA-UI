import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/NavBar";
import ParticleBg from "../../components/ParticleBg";
import "./EPIC.css"; // Import the provided CSS file

const EPIC = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [choise, setChoise] = useState(getTodayDate()); // Set default state to today's date
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index

  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;

  // Function to get today's date in the format YYYY-MM-DD
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const fetchAPIData = async () => {
    if (!choise) return;
    const url = `https://api.nasa.gov/EPIC/api/natural/date/${choise}?api_key=${NASA_KEY}`;

    try {
      setIsLoading(true);
      const res = await fetch(url);
      const apiData = await res.json();

      setIsLoading(false);
      setData(apiData);
      console.log("fetch from API today");
      console.log(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAPIData(); // Call fetchAPIData when component mounts
  }, [choise]); // Add choise as a dependency for useEffect

  const handleDateChange = (e) => {
    setChoise(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAPIData();
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Navbar />

      <div className="background-image"></div>
      <section>
        <div className="container pt-4 mt-5">
          <h1 className="custom-h1 text-center">
            EPIC - Earth Polychromatic Imaging Camera
          </h1>
          <br />
          <div className="text-center">
            <p className="mb-4 custom-p">
              Landsat imagery is provided to the public as a joint project
              between NASA and USGS. A recent industry report on landsat
              satellite imagery data estimates that total annual value to the
              economy of $2.19 billion, far exceeding the multi-year total cost
              of building, launching, and managing Landsat satellites and
              sensors. The value is derived from consumers use of the data. The
              objective of this endpoint is to give you an easy to use taste of
              what Landsat imagery data can provide. There are more complicated
              APIs available if you want to build models on top of satellite
              imagery, apply machine-learning, or minimize clouds in your image.
              NASA's Earth Science Devision has a variety of Earth imagery APIs
              for developers, which you can find out about in the Earthdata
              Developer Portal. Specifically, the GIBS (Global Imagery Browse
              Services) API may be of interest. The Google Earth Engine API is
              another powerful option. This API is powered by Google Earth
              Engine API, and currently only supports pan-sharpened Landsat 8
              imagery.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="row row-cols-lg-auto align-items-center"
          >
            <div className="col-sm-3">
              <label className="custom-label">Choose a date : </label>
              <input
                type="date"
                className=" input-custom"
                value={choise}
                onChange={handleDateChange}
              />
            </div>
          </form>

          {isLoading ? (
            <p className="mt-3">Loading...</p>
          ) : data.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
              {currentIndex >= 0 && currentIndex < data.length ? (
                data.map((item, index) => (
                  <div key={index} className="col">
                    <div
                      className="card card-img-custom"
                      style={{ background: "rgba(255, 255, 255, 0.25)" }}
                    >
                      <img
                        className="card-img-top"
                        src={`https://epic.gsfc.nasa.gov/archive/natural/${choise.replace(
                          /-/g,
                          "/"
                        )}/png/${item.image}.png`}
                        alt={item.caption}
                      />
                      <div
                        className="card-body-scroll"
                        style={{
                          maxHeight: "200px",
                          marginLeft: "4px",
                        }}
                      >
                        <p className="card-text">
                          Identifier: {item.identifier}
                        </p>
                        <p className="card-text">Caption: {item.caption}</p>
                        <p className="card-text">Date: {item.date}</p>
                        <p className="card-text">
                          Coordinates: Lat: {item.centroid_coordinates.lat},
                          Lon: {item.centroid_coordinates.lon}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-3">No more data available.</p>
              )}
            </div>
          ) : (
            <p className="mt-3">No data available.</p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default EPIC;
