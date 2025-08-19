import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import TrainingPage from './pages/TrainingPage/TrainingPage'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage'
import ResultPage from './pages/ResultPage/ResultPage'

import './App.css'

function App() {
  const [minTermCount, setMinTermCount] = useState(2)
  const [maxTermCount, setMaxTermCount] = useState(3)
  const [minNum, setMinNum] = useState(1)
  const [maxNum, setMaxNum] = useState(10)

  function pickRandom(array) {
    return array[
      Math.floor(Math.random() * array.length)
    ]
  }

  function rangeRandom(min, max) {
    return Math.floor(
      Math.random() * (max - min + 1)
    ) + min
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/training" element={
          <TrainingPage minTermCount={ minTermCount } maxTermCount={ maxTermCount }
          minNum={ minNum } maxNum={ maxNum }
          pickRandom={ pickRandom } rangeRandom={ rangeRandom } />
          } />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </>
  )
}

export default App
