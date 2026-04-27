import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/55 px-5 py-3 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.08)]">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10 text-sm font-semibold tracking-[0.2em] text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            JQ
          </div>
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-white">Jahongir</p>
            <p className="text-xs text-slate-400">Backend-first builder</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-cyan-300">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-200 transition hover:border-fuchsia-300 hover:bg-fuchsia-500/20 md:inline-flex"
        >
          Let&apos;s Build
        </a>

        <button
          type="button"
          className="inline-flex rounded-full border border-white/10 p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-slate-200 transition hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
