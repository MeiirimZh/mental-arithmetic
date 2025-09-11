import './Button.css'

export default function Button({ children, onClick, width, height, fontSize, 
    fontFamily, fontWeight, bgColor, color, shadow, borderRadius, centerH }) {
    const style = {
        "--width": width,
        "--height": height,
        "--fontSize": fontSize,
        "--fontFamily": fontFamily,
        "--fontWeight": fontWeight,
        "--bgColor": bgColor,
        "--color": color,
        "--shadow": shadow,
        "--borderRadius": borderRadius,
        "--margin": centerH ? "0 auto" : "none"
    }
    
    return (
        <button style={ style } className="button" onClick={ onClick }>
            { children }
        </button>
    )
}