import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import TrainingPage from './pages/TrainingPage/TrainingPage'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage'
import ResultPage from './pages/ResultPage/ResultPage'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </>
  )
}

export default App
