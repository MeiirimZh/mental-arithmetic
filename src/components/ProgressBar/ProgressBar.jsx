import './ProgressBar.css'

export default function ProgressBar({ bgColor, color, bgWidth, bgHeight, width, borderRadius, margin }) {
    const numericWidth = parseInt(width, 10)

    const style = {
        "--bgColor": bgColor,
        "--color": color,
        "--bgWidth": bgWidth,
        "--bgHeight": bgHeight,
        "--width": width,
        "--borderRadius": borderRadius,
        "--barBorderRadius": numericWidth > 20 ? borderRadius : "10px 0 0 10px",
        "--margin": margin
    }

    return (
        <div style={ style } className="progressBarBg">
            <div className="progressBar"></div>
        </div>
    )
}