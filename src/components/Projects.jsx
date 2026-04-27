import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="section-shell px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="eyebrow">Projects</p>
            <h2 className="section-title mt-4">Selected work shaped around real backend problems.</h2>
            <p className="section-copy mt-5">
              These portfolio concepts reflect the type of systems I build: service APIs, bots, deployment pipelines, internal tools, and admin-focused products.
            </p>
          </div>
          <a href="https://github.com/Jaxongir1006/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-300/35 hover:text-cyan-200">
            Explore GitHub
          </a>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_20px_80px_rgba(3,7,18,0.65)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-80 transition duration-500 group-hover:scale-110`} />
              <div className="absolute inset-[1px] rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(8,15,33,0.9),rgba(2,6,23,0.95))]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-fuchsia-400/25 bg-fuchsia-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-fuchsia-200">
                    Case Study
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-500">0{index + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-white">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex gap-3">
                  <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/5">
                    <Github size={16} />
                    GitHub
                  </a>
                  <a href={project.demo} className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2.5 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/15">
                    <ArrowUpRight size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
