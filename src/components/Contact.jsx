import { motion } from 'framer-motion'
import { Github, Mail, Phone, Send } from 'lucide-react'

const contacts = [
  {
    label: 'Email',
    value: 'jahongir192006@gmail.com',
    href: 'mailto:jahongir192006@gmail.com',
    icon: Mail,
  },
  {
    label: 'Telegram',
    value: '@joxongir_18',
    href: 'https://t.me/joxongir_18',
    icon: Send,
  },
  {
    label: 'GitHub',
    value: 'github.com/Jaxongir1006',
    href: 'https://github.com/Jaxongir1006/',
    icon: Github,
  },
  {
    label: 'Phone',
    value: '+998971990980',
    href: 'tel:+998971990980',
    icon: Phone,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section-shell px-4 pb-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-[2rem] p-8"
        >
          <p className="eyebrow">Contact</p>
          <h2 className="section-title mt-4">Open for serious backend systems work.</h2>
          <p className="section-copy mt-5">
            If you need backend architecture, Go services, API design, microservice planning, modular monolith design, service integrations, realtime features, or deployment support, I&apos;m available for collaboration and client work.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.35em] text-fuchsia-200">Primary strengths</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              System design, Go, REST APIs, gRPC, GraphQL, WebSockets, microservices, modular monoliths, PostgreSQL, Redis, Dockerized deployment, and pragmatic Python backend work.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {contacts.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="glass-card group rounded-[1.8rem] p-6 transition hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition group-hover:border-cyan-300/40 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.22)]">
                  <Icon size={24} />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
                <p className="mt-3 font-display text-xl text-white break-all">{item.value}</p>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
