import React, { useState, useEffect } from 'react';
import './BestRecipes.css';
import './ResponsiveRecipes.css';
import { RecipePost } from './Post/RecipePost';
import PicRecipe1 from '../../../assets/comida_1.jpg';

export const BestRecipes = ({ setImcValueParent }) => {
   const [recipes, setRecipes] = useState([]);
  const [imcValue, setImcValue] = useState(null);
  const [error, setError] = useState(null);

useEffect(() => {
    fetch('http://127.0.0.1:5000/get-imc-values', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imc: imcValue || 0 }),  // Ajouter imc dans le corps de la requête
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data && data.imc_values) {
          setRecipes(data.imc_values);
          setImcValue(data.imc_input);  // Change data.imc_value to data.imc_input
        } else {
          setError('No recipes found');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Error fetching recipes');
      });
  }, []);


  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="bRecipes">
      <div className="recipes">
        <div className="infos">
          <h2>Our Best Workouts</h2>
          <p>
            To help your body burn fat, it is important to use it in different ways.
            Cardio and strength training are complementary.
          </p>
          <p>IMC Value: {imcValue}</p>
        </div>

        <div className="recipe-posts">
          {recipes.map((recipe) => (
            <RecipePost
              key={recipe.id_program}
              title={recipe.name_program}
              src={PicRecipe1}
              alt={recipe.desc_program}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
