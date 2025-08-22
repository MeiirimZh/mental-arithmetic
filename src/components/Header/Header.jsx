import './Header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="header">
            <Link to="/" className="link">Mental Arithmetics</Link>
            <nav>
                <ul>
                    <li><Link to="/training" className="nav-link link">Тренировка</Link></li>
                    <li><Link to="/statistics" className="nav-link link">Статистика</Link></li>
                </ul>
            </nav>
        </header>
    )
}