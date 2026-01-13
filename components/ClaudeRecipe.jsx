import ReactMarkdown from "react-markdown"


export default function ClaudeRecipe(props) {
    return (
        // <section className="suggested-recipe-container">
        //     <h2>Chef Claude Recommends:</h2>
        //     <article>
        //         {/* This displays the text you saw in the console */}
        //         {props.recipe}
        //         {/* // || "Chef Claude is thinking..." */}
        //     </article>
        // </section>
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Chef Claude Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
} 