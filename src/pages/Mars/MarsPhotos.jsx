import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/NavBar";

const MarsPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [choise, setChoise] = useState(getTodayDate());
  const [selectedCamera, setSelectedCamera] = useState("");

  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
  const CAMERA_TYPES = {
    FHAZ: "Front Hazard Avoidance Camera",
    RHAZ: "Rear Hazard Avoidance Camera",
    MAST: "Mast Camera",
    CHEMCAM: "Chemistry and Camera Complex",
    MAHLI: "Mars Hand Lens Image",
    MARDI: "Mars Descent Image",
    NAVCAM: "Navigation Camera",
  };
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  useEffect(() => {
    const fetchMarsPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${choise}&camera=${selectedCamera}&api_key=${NASA_KEY}`
        );
        const data = await response.json();
        console.log(data);
        setPhotos(data.photos);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (choise && selectedCamera) {
      fetchMarsPhotos();
    }
  }, [choise, selectedCamera, NASA_KEY]);

  const handleDateChange = (event) => {
    setChoise(event.target.value);
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Navbar />
      <div className="background-image"></div>
      <div className="container pt-4 mt-5 " style={{ paddingBottom: "100px" }}>
        <h2 className="custom-h1 text-center ">Mars Rover Photos</h2>
        <br />
        <div className="text-center">
          <p className="mb-4 custom-p">
            This API is designed to collect image data gathered by NASA's
            Curiosity, Opportunity, and Spirit rovers on Mars and make it more
            easily available to other developers, educators, and citizen
            scientists. This API is maintained by Chris Cerami.Each rover has
            its own set of photos stored in the database, which can be queried
            separately. There are several possible queries that can be made
            against the API. Photos are organized by the sol (Martian rotation
            or day) on which they were taken, counting up from the rover's
            landing date. A photo taken on Curiosity's 1000th Martian sol
            exploring Mars, for example, will have a sol attribute of 1000. If
            instead you prefer to search by the Earth date on which a photo was
            taken, you can do that, too.
          </p>
        </div>
        <div className="card my-4 ">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="text-center">
              <div className="row">
                <div>
                  <img
                    src="../../public/images/rover.png"
                    className="img-fluid mb-4"
                  />
                </div>
                <div
                  className="col-md-6 mb-3 mx-auto"
                  style={{ maxWidth: "350px" }}
                >
                  <label className="form-label">Choose a date:</label>
                  <input
                    id="datePicker"
                    type="date"
                    className="form-control input-custom"
                    value={choise}
                    onChange={handleDateChange}
                  />
                </div>
                <div
                  className="col-md-6 mb-3 mx-auto"
                  style={{ maxWidth: "350px" }}
                >
                  <label className="form-label">Choose a camera:</label>
                  <select
                    id="datePicker"
                    className="form-control input-custom"
                    value={selectedCamera}
                    onChange={handleCameraChange}
                  >
                    <option value="">Select a camera</option>
                    {Object.entries(CAMERA_TYPES).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : photos.length === 0 ? (
            <div className="text-center">No photos available.</div>
          ) : (
            photos.map((photo) => (
              <div key={photo.id} className="col ">
                <div className="card h-100 card-img-custom">
                  <img
                    src={photo.img_src}
                    alt={`Mars Photo ${photo.id}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Earth Date:</strong> {photo.earth_date}
                    </p>
                    <p className="card-text">
                      <strong>Sol:</strong> {photo.sol}
                    </p>
                    <p className="card-text">
                      <strong>Camera:</strong> {CAMERA_TYPES[photo.camera.name]}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MarsPhotos;
