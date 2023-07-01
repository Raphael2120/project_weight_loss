import React, { useState } from "react";
import "./styles.css";
import "./ResponsiveHero.css";
import HeroImg from "../../../assets/Illustration.svg";
import axios from 'axios';

export const Hero = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [error, setError] = useState(null);

  const calculateBMI = () => {
    if (height !== "" && weight !== "") {
      if (height < 100 || height > 250 || weight < 20 || weight > 300) {
        setError("Please enter valid values for height (100-250cm) and weight (20-300kg)");
        setBmi(null);
        setBmiCategory("");
      } else {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(bmi);
        setError(null);

        if (bmi < 18.5) {
          setBmiCategory("Inférieur au poids normal");
        } else if (bmi < 25) {
          setBmiCategory("Poids normal");
        } else if (bmi < 30) {
          setBmiCategory("En surpoids");
        } else if (bmi < 35) {
          setBmiCategory("Obésité de classe I");
        } else if (bmi < 40) {
          setBmiCategory("Obésité de classe II");
        } else {
          setBmiCategory("Obésité de classe III");
        }

        // Envoyer la valeur de l'IMC au backend
        axios.post('/compare-imc', { imc: bmi })
          .then(response => {
            // Traitez la réponse du serveur ici
            console.log(response.data);
          })
          .catch(error => {
            // Traitez les erreurs de la requête ici
            console.error(error);
          });
      }
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
              placeholder="Your height in cm"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Your weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <button type="button" onClick={calculateBMI}><p>Calculate </p></button>
            {error && <p className="error">{error}</p>}
          </div>
          {bmi && (
            <>
              <h3>Your BMI is: {bmi}</h3>
              <h3> - - - Category: {bmiCategory}</h3>
            </>
          )}
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

export default Hero;
