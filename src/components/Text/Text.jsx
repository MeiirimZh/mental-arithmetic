import './Text.css'

export default function Text({ children, fontSize }) {
    const style = {
        "fontSize": fontSize
    }

    return (
        <p style={ style } className="text">
            { children }
        </p>
    )
}