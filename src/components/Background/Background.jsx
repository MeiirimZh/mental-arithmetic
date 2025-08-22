import './Background.css'

export default function Background({ children, bgColor, width, height, padding, borderRadius }) {
    let paddingStyle

    if (padding) {
        paddingStyle = padding.map(x => `${x}px`).join(" ")
    }
    else {
        paddingStyle = 0
    }

    const style = {
        "--bgColor": bgColor,
        "width": width,
        "height": height,
        "padding": paddingStyle,
        "borderRadius": borderRadius
    }

    return (
        <div style={ style } className="bg">
            { children }
        </div>
    )
}