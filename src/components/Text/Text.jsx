import './Text.css'

export default function Text({ children, fontSize, fontFamily, color }) {
    const style = {
        "--fontSize": fontSize,
        "--fontFamily": fontFamily,
        "--color": color
    }

    return (
        <p style={ style } className="text">
            { children }
        </p>
    )
}