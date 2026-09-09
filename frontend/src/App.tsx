import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EveTitle from './components/EveTitle'
import NotFound from './pages/NotFound'
import StatusPage from './pages/StatusPage'
import './App.css'

function Landing() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere__stars" />
        <div className="atmosphere__panel atmosphere__panel--tl" />
        <div className="atmosphere__panel atmosphere__panel--br" />
        <div className="atmosphere__corner atmosphere__corner--tl" />
        <div className="atmosphere__corner atmosphere__corner--br" />
        <div className="atmosphere__scanlines" />
      </div>
      <main className="stage">
        <div className="stage__content">
          <EveTitle />
          <p className="stage__tagline" aria-hidden="true">
            New Eden · Finances · Characters
          </p>
        </div>
      </main>
    </>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/status" element={<StatusPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}