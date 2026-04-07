import { Calendar, Download, Film, Image as ImageIcon, Images, Layers } from 'lucide-react'
import { Card, CardContent } from '../../../components/ui/card'
import { cn } from '../../../lib/utils'

interface Props {
  stats: {
    totalMedia: number
    imageCount: number
    videoCount: number
    groupsCount: number
    thisMonth: number
    totalSize: string
  }
}

export function GalleryStats({ stats }: Props) {
  const items = [
    {
      icon: <Images className="size-5 text-violet-400" />,
      value: stats.totalMedia,
      label: 'Total Media',
      accent: 'bg-violet-500/10',
    },
    {
      icon: <ImageIcon className="size-5 text-sky-400" />,
      value: stats.imageCount,
      label: 'Pictures',
      accent: 'bg-sky-500/10',
    },
    {
      icon: <Film className="size-5 text-rose-400" />,
      value: stats.videoCount,
      label: 'Videos',
      accent: 'bg-rose-500/10',
    },
    {
      icon: <Layers className="size-5 text-amber-400" />,
      value: stats.groupsCount,
      label: 'Groups',
      accent: 'bg-amber-500/10',
    },
    {
      icon: <Calendar className="size-5 text-emerald-400" />,
      value: stats.thisMonth,
      label: 'This Month',
      accent: 'bg-emerald-500/10',
    },
    {
      icon: <Download className="size-5 text-zinc-400" />,
      value: stats.totalSize,
      label: 'Total Size',
      accent: 'bg-zinc-500/10',
    },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <Card key={item.label} className="border-white/8 bg-[#141418]">
          <CardContent className="flex items-center gap-3 p-4">
            <div className={cn('rounded-lg p-2', item.accent)}>{item.icon}</div>
            <div>
              <p className="text-xl font-bold text-white">{item.value}</p>
              <p className="text-xs text-white/40">{item.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}