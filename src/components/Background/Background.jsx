import './Background.css'

export default function Background({ children, bgColor, padding }) {
    let paddingLeft;
    let paddingTop;
    let paddingRight;
    let paddingBottom;

    if (padding.length === 2) {
        paddingLeft = `${padding[0]}px`
        paddingRight = `${padding[0]}px`

        paddingTop = `${padding[1]}px`
        paddingBottom = `${padding[1]}px`
    }
    else if (padding.length === 4) {
        paddingLeft = `${padding[0]}px`
        paddingTop = `${padding[1]}px`
        paddingRight = `${padding[2]}px`
        paddingBottom = `${padding[3]}px`
    }

    const style = {
        "--bgColor": bgColor,
        "--paddingLeft": paddingLeft,
        "--paddingTop": paddingTop,
        "--paddingRight": paddingRight,
        "--paddingBottom": paddingBottom
    }

    return (
        <div style={ style } className="bg">
            { children }
        </div>
    )
}