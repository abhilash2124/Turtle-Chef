import turtleChefLogo from "../images/turtle-chef-logo.png"

export default function Header() {
    return (
        <header>
            <img src={turtleChefLogo}/>
            <h1>Turtle Chef</h1>
        </header>
    )
}