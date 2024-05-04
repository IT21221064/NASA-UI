import React from "react";
import "./Welcome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons";
import Fullpage, {
  FullPageSections,
  FullpageSection,
  FullpageNavigation,
} from "@ap.cx/react-fullpage";
import Navbar from "../../components/NavBar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const handleExploreClick = () => {
    navigate("/login");
  };
  const inputString1 = "Welcome to Astronaut Web";
  const inputString2 = "Embark on a journey through the galaxy with us!";
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.25 },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  // Split input string into individual letters
  const letters1 = inputString1.split("");
  const letters2 = inputString2.split("");
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
    >
      <Fullpage autoplay interval={1}>
        <FullpageNavigation />
        <FullPageSections>
          <FullpageSection>
            <div className="welcome-container">
              <div className="background-image2"></div>
              <motion.div
                className="content1"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="content">
                  <FontAwesomeIcon
                    icon={faUserAstronaut}
                    className="astronaut-icon"
                  />

                  {letters1.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="welcome-text"
                      variants={letterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <br />
                  {letters2.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="subtext"
                      variants={letterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <br />
                  <motion.button
                    className="explore-button"
                    variants={letterVariants}
                    onClick={handleExploreClick}
                    id="explore"
                  >
                    Explore Now
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </FullpageSection>
          <FullpageSection>
            <div className="welcome-container">
              <div className="background-image1"></div>
              <motion.div
                className="content1"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="content">
                  <FontAwesomeIcon
                    icon={faUserAstronaut}
                    className="astronaut-icon"
                  />

                  {letters1.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="welcome-text"
                      variants={letterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <br />
                  {letters2.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="subtext"
                      variants={letterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <br />
                  <motion.button
                    className="explore-button"
                    variants={letterVariants}
                    onClick={handleExploreClick}
                    id="explore"
                  >
                    Explore Now
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </FullpageSection>
          <FullpageSection>
            <div className="welcome-container">
              <div className="background-image3"></div>
              <motion.div
                className="content1"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="content">
                  <FontAwesomeIcon
                    icon={faUserAstronaut}
                    className="astronaut-icon"
                  />

                  {letters1.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="welcome-text"
                      variants={letterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <br />
                  {letters2.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="subtext"
                      variants={letterVariants}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <br />
                  <motion.button
                    className="explore-button"
                    variants={letterVariants}
                    onClick={handleExploreClick}
                    id="explore"
                  >
                    Explore Now
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </FullpageSection>
        </FullPageSections>
      </Fullpage>
    </motion.div>
  );
};

export default Welcome;
