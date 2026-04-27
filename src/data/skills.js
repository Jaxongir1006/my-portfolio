import {
  Bot,
  Box,
  Braces,
  Database,
  GitBranch,
  Globe,
  HardDrive,
  Layers3,
  Lock,
  Rabbit,
  Rocket,
  Server,
  Settings2,
  Shield,
  TerminalSquare,
  Waypoints,
  Wrench,
} from 'lucide-react'

export const skillCategories = [
  {
    title: 'Python',
    description: 'Production-grade API work, bots, integrations, and backend architecture.',
    skills: [
      { name: 'Django', icon: Layers3 },
      { name: 'Django REST Framework', icon: Braces },
      { name: 'FastAPI', icon: Rocket },
      { name: 'Aiogram', icon: Bot },
    ],
  },
  {
    title: 'Go',
    description: 'High-performance services with and without frameworks.',
    skills: [
      { name: 'Fiber', icon: Waypoints },
      { name: 'Gin', icon: Globe },
      { name: 'Frameworkless Services', icon: TerminalSquare },
    ],
  },
  {
    title: 'Databases',
    description: 'Relational and document databases for transactional and analytics-heavy systems.',
    skills: [
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: HardDrive },
      { name: 'MongoDB', icon: Box },
      { name: 'Microsoft SQL Server', icon: Server },
    ],
  },
  {
    title: 'DevOps',
    description: 'Deployment pipelines, runtime hardening, and reliable backend delivery.',
    skills: [
      { name: 'Docker', icon: Box },
      { name: 'Docker Compose', icon: Wrench },
      { name: 'Nginx', icon: Shield },
      { name: 'Gunicorn', icon: Settings2 },
      { name: 'Linux', icon: TerminalSquare },
      { name: 'SSL Certificates', icon: Lock },
    ],
  },
  {
    title: 'Tools',
    description: 'Daily engineering tools for collaboration, delivery, and maintenance.',
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'Redis Caching', icon: Database },
      { name: 'Server Deployment', icon: Server },
      { name: 'REST API Design', icon: Globe },
    ],
  },
  {
    title: 'Other',
    description: 'Supporting strengths used in real product delivery and academic growth.',
    skills: [
      { name: 'Authentication Systems', icon: Lock },
      { name: 'Payment Integrations', icon: Wrench },
      { name: 'Telegram Bot Development', icon: Bot },
      { name: 'RabbitMQ Basics', icon: Rabbit },
      { name: 'C# / .NET (Academic)', icon: Braces },
    ],
  },
]
