import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TheStart from './components/TheStart'
import Work from './components/Work'
import Gallery from './components/Gallery'
import DragBoard from './components/DragBoard'
import Contact from './components/Contact'
import ProjectPage from './components/ProjectPage'
import Screensaver from './components/Screensaver'
import BentoLayout from './components/BentoLayout'

const moodColors: Record<number, string> = {
  1: '#ddd8d3',
  2: '#0c0c0c',
  3: '#000000',
  4: '#050505',
}

function App() {
  const [mood, setMood] = useState(1)

  useEffect(() => {
    const bgColor = moodColors[mood]
    document.documentElement.style.backgroundColor = bgColor
    document.body.style.backgroundColor = bgColor
  }, [mood])

  const cycleMood = () => {
    setMood(prev => (prev >= 4 ? 1 : prev + 1))
  }

  return (
    <Router>
      <Screensaver />
      <div className={`mood-${mood} transition-colors duration-500`}>
        <Routes>
          <Route
            path="/"
            element={
              <BentoLayout currentMood={mood} onCycleMood={cycleMood}>
                <TheStart />
                <Work />
                <DragBoard />
                <Gallery />
                <Contact />
              </BentoLayout>
            }
          />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
