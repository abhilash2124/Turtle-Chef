import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromAI } from "../ai"


export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
    )
    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const recipeSection = React.useRef(null)
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [recipe])

    async function getRecipe() {
        setLoading(true)
        const recipeMarkdown = await getRecipeFromAI(ingredients)
        setRecipe(recipeMarkdown)
        setLoading(false)
    }

    function generateContent(formData) {
        const newIngredient = formData.get("ingredient")
        
        if (newIngredient && newIngredient.trim() !== "") {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()])
        }
    }
    
    return (
        <main>
            <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                generateContent(formData)
                e.target.reset()
            }} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    recipeRef={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    loading={loading}
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}