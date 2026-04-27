import { motion } from 'framer-motion'
import { Cpu, ShieldCheck, Terminal } from 'lucide-react'

const highlights = [
  {
    title: 'Backend-first mindset',
    description: 'I focus on clean architecture, API correctness, authentication flows, and systems that stay maintainable as products grow.',
    icon: Cpu,
  },
  {
    title: 'Deployment-aware engineering',
    description: 'From Docker and Gunicorn to Nginx, Linux, and SSL setup, I design software with production environments in mind from the start.',
    icon: ShieldCheck,
  },
  {
    title: 'Automation and integrations',
    description: 'I build Telegram bots, payment integrations, and service-to-service flows that remove friction and make products operationally stronger.',
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
          <h2 className="section-title mt-4">Backend strength with fullstack awareness.</h2>
          <p className="section-copy mt-6">
            My core work is backend development: building APIs, handling data models, deployment flows, authentication systems, caching layers, and business logic that can scale. I work comfortably across Django, DRF, FastAPI, Aiogram, Go services, and containerized environments.
          </p>
          <p className="section-copy mt-4">
            I care about software that survives real use, not just demo conditions. That means clear interfaces, stable integrations, careful deployment, and enough frontend understanding to collaborate effectively on the complete product.
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
