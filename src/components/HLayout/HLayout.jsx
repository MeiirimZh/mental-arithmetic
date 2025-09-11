import './HLayout.css'

export default function HLayout({ children, justifyContent, gap }) {
    const style = {
        "--justifyContent": justifyContent,
        "--gap": gap
    }

    return (
        <div style={ style } className="hlayout">
            { children }
        </div>
    )
}