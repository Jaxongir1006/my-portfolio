import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Sparkles } from 'lucide-react'

const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-4 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.15),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(217,70,239,0.12),_transparent_24%),linear-gradient(180deg,_#020617_0%,_#050816_40%,_#02030a_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))] opacity-20" />
      <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
            <Sparkles size={14} />
            System design focused backend engineer
          </div>

          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Designing backend systems that stay <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">clear under real load</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            I&apos;m Jahongir Qosimjonov, a backend engineer focused on system design, Go services, API architecture, microservices, modular monoliths, gRPC, GraphQL, WebSockets, and production-minded service boundaries.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#projects" className="neon-button cyan inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-slate-950">
              View Projects
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="neon-button dark inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white">
              Contact Me
              <Download size={16} />
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['2+', 'Years building backend foundations'],
              ['Go', 'Current focus for systems programming'],
              ['S2S', 'Microservices, gRPC, GraphQL, WebSockets'],
            ].map(([value, label]) => (
              <div key={label} className="glass-card rounded-3xl p-4">
                <p className="font-display text-2xl text-white">{value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-fuchsia-500/15 blur-2xl" />
          <div className="glass-panel relative h-[384px] rounded-[2rem] p-3 md:h-[560px] md:p-5">
            <Suspense
              fallback={
                <div className="flex h-[360px] w-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/60 md:h-[520px]">
                  <div className="h-24 w-24 rounded-full border border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_50px_rgba(34,211,238,0.2)] animate-pulse" />
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
