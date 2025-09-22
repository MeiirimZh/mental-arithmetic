import './ProgressBar.css'

export default function ProgressBar({ bgColor, color, bgWidth, bgHeight, width, borderRadius, margin }) {
    const style = {
        "--bgColor": bgColor,
        "--color": color,
        "--bgWidth": bgWidth,
        "--bgHeight": bgHeight,
        "--width": width,
        "--borderRadius": borderRadius,
        "--margin": margin
    }

    return (
        <div style={ style } className="progressBarBg">
            <div className="progressBar"></div>
        </div>
    )
}