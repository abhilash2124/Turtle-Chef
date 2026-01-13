import React, { useEffect } from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromAI } from "./ai.js"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])

    const [recipe, setRecipeShown] = React.useState("")
    const recipeSection = React.useRef(null)

    React.useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [recipe])

    // ab
    async function getRecipe() {
        console.log("Fetching recipe..."); // Tells you the button worked
        try {
            const recipeMarkdown = await getRecipeFromAI(ingredients); 
            setRecipeShown(recipeMarkdown);
        } catch (err) {
            console.error("AI Error:", err);
        }
    }
    
    // useEffect(() => {
    //     getRecipe();
    // }, []);
    // getRecipe();
    // ab end


    // function toggleRecipeShown() {
    //     setRecipeShown(prevShown => !prevShown)
    // }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}