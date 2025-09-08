import './Text.css'

export default function Text({ children, fontSize, color }) {
    const style = {
        "--fontSize": fontSize,
        "--color": color
    }

    return (
        <p style={ style } className="text">
            { children }
        </p>
    )
}