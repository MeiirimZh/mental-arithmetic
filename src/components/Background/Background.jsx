import './Background.css'

export default function Background({ children, bgColor }) {
    const style = {
        "--bgColor": {bgColor}
    }

    return (
        <div style={ style } className="bg">
            { children }
        </div>
    )
}