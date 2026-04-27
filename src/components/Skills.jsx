import { motion } from 'framer-motion'
import { skillCategories } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="section-shell px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="eyebrow">Skills</p>
          <h2 className="section-title mt-4">Architecture-level backend skills.</h2>
          <p className="section-copy mt-5">
            The stack is moving toward system design and Go-based backend engineering, supported by strong API design, service communication patterns, database modeling, deployment discipline, and Python experience where it fits the product.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="glass-card skill-card rounded-[1.8rem] p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl text-white">{category.title}</h3>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
                  {category.skills.length} items
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-400">{category.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {category.skills.map((skill) => {
                  const Icon = skill.icon
                  return (
                    <div key={skill.name} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-300/35 hover:text-cyan-200">
                      <Icon size={16} className="text-cyan-300" />
                      <span>{skill.name}</span>
                    </div>
                  )
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
