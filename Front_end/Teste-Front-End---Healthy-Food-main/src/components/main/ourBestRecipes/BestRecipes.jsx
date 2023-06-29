import './BestRecipes.css'
import './ResponsiveRecipes.css'
import { RecipePost } from './Post/RecipePost'

import PicRecipe1 from '../../../assets/cardio.jpg'
import PicRecipe2 from '../../../assets/comida_2.svg'
import PicRecipe3 from '../../../assets/comida_3.svg'
import PicRecipe4 from '../../../assets/comida_4.svg'

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
                    <RecipePost title='Broccoli Salad With Bacon' 
                    src={PicRecipe1}
                    alt='A imagem of a beauty Broccoli Salad With Bacon'/>

                    <RecipePost title='Classic Beef Burgers'
                    src={PicRecipe2}
                    alt='A imagem of a beauty Classic Beef Burgers'/>

                    <RecipePost title='Classic Potato Salad'
                    src={PicRecipe3}
                    alt='A imagem of a beauty Classic Potato Salad'/>

                    <RecipePost title='Cherry Cobbler on the Grill'
                    src={PicRecipe4}
                    alt='A imagem of a beauty Cherry Cobbler on the Grill'/>
                </div>
            </div>
        </section>
    )
}