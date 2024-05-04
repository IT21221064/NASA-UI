import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Innovation from "./InnovationObj";
import "./InnovationList.css";
import { motion } from "framer-motion";
import Navbar from "../../components/NavBar";
import ParticlesBg from "../../components/ParticleBg";

const InnovationList = () => {
  const [obj, setObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
  const history = useNavigate();

  useEffect(() => {
    async function fetchAPIData() {
      try {
        const response = await fetch(
          "https://api.nasa.gov/techtransfer/patent/?engine&" +
            `api_key=${NASA_KEY}`
        );
        const data = await response.json();
        console.log(data.results);
        setObj(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAPIData();
  }, []);

  const navigateToInnovationObj = (object) => {
    history(`/innovation/${object.id}`, { state: { data: object } });
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Navbar />
      <div>
        <div className="background-image"></div>
        <div className="pt-4 mt-5">
          <div className="container ">
            <h1 className="custom-h1 text-center">TechTransfer</h1>
            <br />
            <div className="text-center">
              <p className="mb-4 custom-p">
                NASA's Technology Transfer Program ensures that innovations
                developed for exploration and discovery are broadly available to
                the public. The NASA patent portfolio is available to benefit US
                citizens. Through partnerships and licensing agreements with
                industry, these patents ensure that NASA’s investments in
                pioneering research find secondary uses that benefit the
                economy, create jobs, and improve quality of life. This endpoint
                provides structured, searchable developer access to NASA’s
                patents, software, and technology spinoff descriptions that have
                been curated to support technology transfer. More information
                can be found at technology.nasa.gov and software.nasa.gov and
                spinoff.nasa.gov.
              </p>
            </div>
            <div className="row mt-4 mb-4">
              {isLoading ? (
                <p>Loading...</p>
              ) : obj && obj.length > 0 ? (
                obj.map((o) => (
                  <div className="col-md-4 mb-4" key={o.id}>
                    <div onClick={() => navigateToInnovationObj(o)}>
                      <Innovation dataAirplane={o} />
                    </div>
                  </div>
                ))
              ) : (
                <p>No Data Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InnovationList;
