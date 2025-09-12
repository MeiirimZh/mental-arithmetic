export default function Modal({ isOpen, children, gap }) {
    if (!isOpen) return null;

    const style = {
        "--gap": gap
    }

    return (
        <div style={ style } className="overlay">
            <div className="modal">
                { children }
            </div>
        </div>
    )
}