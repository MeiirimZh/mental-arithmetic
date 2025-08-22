import './Background.css'

export default function Background({ children, bgColor, padding }) {
    let paddingStyle = padding.map(x => `${x}px`).join(" ")

    const style = {
        "--bgColor": bgColor,
        "padding": paddingStyle
    }

    return (
        <div style={ style } className="bg">
            { children }
        </div>
    )
}