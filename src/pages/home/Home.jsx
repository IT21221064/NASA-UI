import React, { useEffect, useState, useMemo } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import "./Home.css";
import { motion } from "framer-motion";
import Navbar from "../../components/NavBar";

const Home = () => {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [choise, setChoise] = useState(getTodayDate());
  const [error, setError] = useState(null);

  // Function to get today's date in the format YYYY-MM-DD
  function getTodayDate() {
    const today = new Date().toISOString().split("T")[0];
    return today;
  }

  useEffect(() => {
    async function fetchAPIData() {
      const url =
        "https://api.nasa.gov/planetary/apod" +
        `?date=${choise}&api_key=${NASA_KEY}`;

      try {
        setIsLoading(true);
        const res = await fetch(url);
        const apiData = await res.json();
        setData(apiData);
        setIsLoading(false);
        setError(null);
        console.log("fetch from API", choise);
        console.log(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      }
    }

    fetchAPIData();
  }, [choise, NASA_KEY]);

  // Memoize the date so that it doesn't re-render unnecessarily
  const memoizedDate = useMemo(() => choise, [choise]);

  const handleDateChange = (e) => {
    setChoise(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Navbar />
      <div className="background-image"></div>
      <Container className="pt-4 mt-5 mb-10" style={{ paddingBottom: "100px" }}>
        <div className="text-center">
          <h1 className="custom-h1">Astronomy Picture of the Day</h1>
          <p className="mb-4 custom-p">
            Each day a different image or photograph of our fascinating universe
            is featured, along with a brief explanation written by a
            professional astronomer.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="text-center">
          <div className="form-group mx-auto" style={{ maxWidth: "300px" }}>
            <label htmlFor="datePicker" className="custom-label">
              Choose a date:
            </label>
            <input
              id="datePicker"
              type="date"
              className="form-control input-custom"
              value={choise}
              onChange={handleDateChange}
            />
          </div>
        </form>
        {isLoading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center mt-5">
            {error}
          </Alert>
        ) : data ? (
          <>
            <div className="row">
              <div className="col-6 mb-4">
                <Card
                  className="mt-4 mx-auto card-img-custom"
                  style={{ maxWidth: "800px" }}
                >
                  <Card.Img variant="top" src={data.url} alt="APOD" />
                </Card>
              </div>
              <div className="col-6 mb-4">
                <Card.Body className="mt-4 mx-auto">
                  <Card.Title className="custom-h1">{data.title}</Card.Title>
                  <Card.Subtitle className="mb-2 custom-h2">
                    Date: {data.date}
                  </Card.Subtitle>
                  <motion.Card
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {data.explanation.split(" ").map((word, wordIndex) => (
                      <span key={wordIndex}>
                        {[...word].map((char, charIndex) => (
                          <motion.span
                            key={charIndex}
                            style={{
                              display: "inline-block",
                            }}
                            className="custome-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: wordIndex * 0.1 + charIndex * 0.025,
                            }}
                          >
                            {char}
                          </motion.span>
                        ))}{" "}
                      </span>
                    ))}
                  </motion.Card>
                </Card.Body>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center mt-2 custom-p">
            No data available for the selected date.
          </p>
        )}
      </Container>
    </motion.div>
  );
};

export default Home;
