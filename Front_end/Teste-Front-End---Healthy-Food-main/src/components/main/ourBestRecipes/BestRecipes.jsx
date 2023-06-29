import './BestRecipes.css'
import './ResponsiveRecipes.css'
import { RecipePost } from './Post/RecipePost'

import PicRecipe1 from '../../../assets/comida_1.jpg'
import PicRecipe2 from '../../../assets/comida_2.jpg'
import PicRecipe3 from '../../../assets/comida_3.jpg'
import PicRecipe4 from '../../../assets/comida_4.jpg'

export const BestRecipes = () => {
    return (
        <section className="bRecipes">
            <div className="recipes">
                <div className="infos">
                    <h2>Our Best Workouts</h2>
                    <p>To help your body burn fat, it is important to use it in different ways.
                     Cardio and strength training are complementary. </p>
                </div>
                
                <div className="recipe-posts">
                    <RecipePost title='Fasted Cardio'
                    src={PicRecipe1}
                    alt='A image of a running man'/>

                    <RecipePost title='Shoulders & upper back'
                    src={PicRecipe2}
                    alt='A image of a woman lifting weights'/>

                    <RecipePost title='Tone your legs'
                    src={PicRecipe3}
                    alt='A image of a woman on leg press'/>

                    <RecipePost title='Strengthen abs and back'
                    src={PicRecipe4}
                    alt='A image of a man lifting weights'/>
                </div>
            </div>
        </section>
    )
}