import { motion } from 'framer-motion'

const milestones = [
  {
    year: '2024',
    title: 'Backend foundations sharpened',
    description: 'Built stronger confidence with Django, DRF, API architecture, authentication flows, and production-minded backend patterns.',
  },
  {
    year: '2025',
    title: 'Deployment and systems thinking',
    description: 'Expanded into Dockerized services, Nginx, Gunicorn, Linux-based deployment, Redis caching, and more disciplined delivery workflows.',
  },
  {
    year: '2026',
    title: 'Broader service design',
    description: 'Added more FastAPI, Aiogram, Go APIs, integrations, and internal tooling experience with a stronger fullstack-leaning delivery style.',
  },
  {
    year: 'Academic',
    title: 'University track',
    description: 'Studying C# and .NET at university as academic knowledge while keeping professional focus on Python, APIs, infrastructure, and product delivery.',
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="section-shell px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="eyebrow">Experience</p>
          <h2 className="section-title mt-4">Growth centered on backend execution and deployment readiness.</h2>
          <p className="section-copy mt-5">
            The trajectory is consistent: deeper API design, stronger operational thinking, more confidence across services and integrations, and broader technical range without diluting the backend core.
          </p>
        </motion.div>

        <div className="relative mt-12 space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-cyan-400 before:via-fuchsia-400 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2">
          {milestones.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`relative md:grid md:grid-cols-2 ${index % 2 === 0 ? '' : 'md:[&>div:first-child]:order-2'}`}
            >
              <div className="hidden md:block" />
              <div className="relative ml-12 md:ml-0 md:px-10">
                <div className="absolute -left-[2.45rem] top-7 h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.95)] md:left-auto md:right-[calc(100%+1.6rem)] md:top-8 md:translate-x-1/2" />
                <div className="glass-card rounded-[1.8rem] p-6">
                  <span className="text-xs uppercase tracking-[0.35em] text-cyan-300">{item.year}</span>
                  <h3 className="mt-4 font-display text-2xl text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{item.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
