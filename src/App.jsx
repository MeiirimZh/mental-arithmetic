import { useState } from 'react'

import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import TrainingPage from './pages/TrainingPage/TrainingPage'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage'
import ResultPage from './pages/ResultPage/ResultPage'

import './App.css'

function App() {
  const [minNum, setMinNum] = useState(2)
  const [maxNum, setMaxNum] = useState(2)

  function pickRandom(array) {
    return array[
      Math.floor(Math.random() * array.length)
    ]
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/training" element={
          <TrainingPage minNum={ minNum } maxNum={ maxNum } pickRandom={ pickRandom } />
          } />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </>
  )
}

export default App
