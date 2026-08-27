import EveTitle from './components/EveTitle'
import './App.css'

export default function App() {
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
