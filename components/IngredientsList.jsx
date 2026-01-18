export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>
            <span>{ingredient}</span>
            {props.removeIngredient && (
                <button 
                    className="remove-btn"
                    onClick={() => props.removeIngredient(ingredient)}
                    aria-label={`Remove ${ingredient}`}
                    type="button"
                >
                    ×
                </button>
            )}
        </li>
    ))
    
    return (
        <section>
            <div className="ingredients-header">
                <h2>Ingredients on hand:</h2>
                {props.clearAllIngredients && props.ingredients.length > 0 && (
                    <button 
                        className="clear-all-btn"
                        onClick={props.clearAllIngredients}
                        type="button"
                    >
                        Clear all
                    </button>
                )}
            </div>
            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 3 && (
                <div className="get-recipe-container">
                    <div ref={props.recipeRef}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button 
                        onClick={props.getRecipe} 
                        disabled={props.loading}
                        className={props.loading ? "loading" : ""}
                        type="button"
                    >
                        {props.loading ? "Generating..." : "Get a recipe"}
                    </button>
                </div>
            )}
        </section>
    )
}


// export default function IngredientsList(props) {
//     const ingredientsListItems = props.ingredients.map(ingredient => (
//         <li key={ingredient}>{ingredient}</li>
//     ))
    
//     return (
//         <section>
//             <h2>Ingredients on hand:</h2>
//             <ul className="ingredients-list" aria-live="polite">
//                 {ingredientsListItems}
//             </ul>
//             {props.ingredients.length > 3 && (
//                 <div className="get-recipe-container">
//                     <div ref={props.recipeRef}>
//                         <h3>Ready for a recipe?</h3>
//                         <p>Generate a recipe from your list of ingredients.</p>
//                     </div>
//                     <button onClick={props.getRecipe} disabled={props.loading}>
//                         {props.loading ? "Generating..." : "Get a recipe"}
//                     </button>
//                 </div>
//             )}
//         </section>
//     )
// }