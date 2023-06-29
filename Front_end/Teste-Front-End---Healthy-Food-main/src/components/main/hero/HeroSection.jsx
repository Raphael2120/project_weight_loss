import React, { useState } from "react";
import "./styles.css";
import "./ResponsiveHero.css";

import HeroImg from "../../../assets/Illustration.svg";

export const Hero = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (height !== "" && weight !== "") {
      const heightInMeters = height / 100;
      const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmi);
    }
  };

  return (
    <section className="HeroSec">
      <div className="contentWrapper">
        <div className="leftContent">
          <h2>Calculate Your BMI</h2>
          <div className="handle">
            <input
              type="number"
              placeholder="Enter your height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter your weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <button type="button" onClick={calculateBMI}><p>Calculate </p></button>
            {bmi && <p>Your BMI is: {bmi}</p>}
          </div>
        </div>

        <div className="rigthContent">
          <div className="heroImg">
            <img src={HeroImg} alt="draw with healthy calcule" />
          </div>
        </div>
      </div>
    </section>
  );
};