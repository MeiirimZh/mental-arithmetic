import './TextEdit.css'

export default function TextEdit({ width, height, fontSize, fontFamily, bgColor, color, shadow }) {
    const style = {
        "--width": width,
        "--height": height
    }

    return (
        <input type="text" className="textEdit"/>
    )
}