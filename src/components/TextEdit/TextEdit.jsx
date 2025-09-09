import './TextEdit.css'

export default function TextEdit({ width, height, fontSize, fontFamily, bgColor, color, shadow, borderRadius, centerH, textIndent }) {
    const style = {
        "--width": width,
        "--height": height,
        "--fontSize": fontSize,
        "--fontFamily": fontFamily,
        "--bgColor": bgColor,
        "--color": color,
        "--shadow": shadow,
        "--borderRadius": borderRadius,
        "--margin": centerH ? "0 auto" : "none",
        "--textIndent": textIndent
    }

    return (
        <input type="text" style={ style } className="textEdit"/>
    )
}