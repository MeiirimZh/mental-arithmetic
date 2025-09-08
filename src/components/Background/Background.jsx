import './Background.css'

export default function Background({ children, bgColor, width, height, padding, borderRadius, centerH, centerV, shadow }) {
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
        "borderRadius": borderRadius,
        "--centerH": centerH ? "center" : "flex-start",
        "--centerV": centerV ? "center" : "stretch",
        "--shadow": shadow
    }

    return (
        <div style={ style } className="bg">
            { children }
        </div>
    )
}