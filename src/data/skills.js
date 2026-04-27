import {
  Bot,
  Box,
  Braces,
  Cable,
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
    title: 'System Design',
    description: 'Architecture decisions for service boundaries, communication, scalability, and maintainability.',
    skills: [
      { name: 'Microservices', icon: Waypoints },
      { name: 'Modular Monoliths', icon: Layers3 },
      { name: 'Service Boundaries', icon: GitBranch },
      { name: 'Scalable API Design', icon: Globe },
    ],
  },
  {
    title: 'Go',
    description: 'Current focus for deeper backend programming, concurrency, and explicit service design.',
    skills: [
      { name: 'Go Services', icon: Rocket },
      { name: 'Fiber', icon: Waypoints },
      { name: 'Gin', icon: Globe },
      { name: 'Frameworkless Services', icon: TerminalSquare },
    ],
  },
  {
    title: 'API Communication',
    description: 'Transport and API patterns for internal services, client-facing APIs, and realtime products.',
    skills: [
      { name: 'REST APIs', icon: Globe },
      { name: 'gRPC', icon: Cable },
      { name: 'GraphQL', icon: Braces },
      { name: 'WebSockets', icon: Waypoints },
    ],
  },
  {
    title: 'Python Backend',
    description: 'Practical backend delivery with mature Python frameworks and automation tooling.',
    skills: [
      { name: 'Django', icon: Layers3 },
      { name: 'Django REST Framework', icon: Braces },
      { name: 'FastAPI', icon: Rocket },
      { name: 'Aiogram', icon: Bot },
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
    description: 'Daily engineering tools for collaboration, delivery, caching, and reliable service operation.',
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'Redis Caching', icon: Database },
      { name: 'Server Deployment', icon: Server },
      { name: 'RabbitMQ Basics', icon: Rabbit },
    ],
  },
  {
    title: 'Other',
    description: 'Supporting strengths used in real backend products, integrations, and academic growth.',
    skills: [
      { name: 'Authentication Systems', icon: Lock },
      { name: 'Payment Integrations', icon: Wrench },
      { name: 'Telegram Bot Development', icon: Bot },
      { name: 'C# / .NET (Academic)', icon: Braces },
    ],
  },
]
