import React, { useState } from "react";
import "./styles.css";
import "./ResponsiveHero.css";
import HeroImg from "../../../assets/Illustration.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Hero = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");
  const [error, setError] = useState(null);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const calculateBMI = () => {
    if (height !== "" && weight !== "") {
      if (height < 100 || height > 250 || weight < 20 || weight > 300) {
        setError("Please enter valid values for height (100-250cm) and weight (20-300kg)");
        setBmi(null);
        setBmiCategory("");
      } else {
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

        // Envoyer la valeur de l'IMC au backend
        axios.post('http://127.0.0.1:5000/get-imc-values', { imc: bmi })
          .then(response => {
            console.log('Informations successfully sent to the backend');

        // Récupérer le type d'alerte, le message et l'URL de redirection depuis la réponse JSON
        const alertType = response.data.alert;
        const message = response.data.message;
        const redirectURL = response.data.redirectURL;

            // Mettre à jour l'état avec le type d'alerte et le message
            setAlertType(alertType);
            setAlertMessage(message);

            // Mettre à jour l'état avec les résultats de l'IMC
            setBmi(bmi);

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

        // Effectuer la redirection vers la page spécifiée
        navigate(redirectURL);
          })
          .catch(error => {
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
            {alertMessage && (
              <p className={`alert ${alertType}`}>{alertMessage}</p>
            )}
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
            <img src={HeroImg} alt="Illustration" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
