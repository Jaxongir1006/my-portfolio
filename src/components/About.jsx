import { motion } from 'framer-motion'
import { Cpu, ShieldCheck, Terminal } from 'lucide-react'

const highlights = [
  {
    title: 'System design mindset',
    description: 'I think in service boundaries, data flow, failure modes, API contracts, and systems that can evolve without turning into fragile code.',
    icon: Cpu,
  },
  {
    title: 'Go and service architecture',
    description: 'I am actively sharpening Go for backend systems where concurrency, explicit design, performance, and deeper programming discipline matter.',
    icon: ShieldCheck,
  },
  {
    title: 'Modern backend communication',
    description: 'I work with REST, gRPC, GraphQL, WebSockets, microservices, modular monoliths, integrations, queues, and production delivery workflows.',
    icon: Terminal,
  },
]

export default function About() {
  return (
    <section id="about" className="section-shell px-4 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-[2rem] p-8"
        >
          <p className="eyebrow">About</p>
          <h2 className="section-title mt-4">Backend engineering beyond CRUD.</h2>
          <p className="section-copy mt-6">
            My focus is backend architecture and system design: choosing the right service boundaries, designing reliable APIs, modeling data correctly, and building systems that are understandable under real product pressure. I use Python where it is practical, but I am currently pushing deeper into Go because it demands stronger fundamentals around concurrency, memory, interfaces, and explicit engineering decisions.
          </p>
          <p className="section-copy mt-4">
            I care about backend work that goes beyond CRUD and demo-level systems: modular monoliths before premature distribution, microservices when boundaries justify them, gRPC for efficient service-to-service communication, GraphQL where clients need flexible querying, and WebSockets where realtime behavior matters.
          </p>
        </motion.div>

        <div className="grid gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="glass-card rounded-[1.75rem] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
