import { QuickAccessCard } from './QuickAccessCard'

const GRID_ITEMS = [
  {
    icon: 'Layers',
    label: 'Projects',
    sublabel: 'Selected works',
    path: '/coming-soon',
    delay: 0.1
  },
  {
    icon: 'Cpu',
    label: 'Stack',
    sublabel: 'Tools & technologies',
    path: '/coming-soon',
    delay: 0.16
  },
  {
    icon: 'Briefcase',
    label: 'Experience',
    sublabel: 'Work history',
    path: '/coming-soon',
    delay: 0.22
  },
  {
    icon: 'BadgeCheck',
    label: 'Certifications',
    sublabel: 'Credentials',
    path: '/coming-soon',
    delay: 0.28
  }
]

export const QuickAccessGrid = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
      {GRID_ITEMS.map((item) => (
        <QuickAccessCard key={item.label} {...item} />
      ))}
    </div>
  )
}
