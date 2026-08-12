import { Analytics } from '@vercel/analytics/react'
import About from './components/About'
import Contact from './components/Contact'
import DarkVeil from './components/DarkVeil'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Timeline from './components/Timeline'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#02030a] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-35">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <Analytics />
    </div>
  )
}
