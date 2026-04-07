import type { ReactNode } from 'react'

export const formatContent = (content: string): ReactNode[] => {
  return content.split('\n').map((line, index) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <h3
          key={index}
          className="mt-6 mb-2 text-lg font-semibold text-foreground"
        >
          {line.replace(/\*\*/g, '')}
        </h3>
      )
    }

    if (line.startsWith('- **')) {
      const match = line.match(/- \*\*(.+?)\*\*(.*)/)

      if (match) {
        return (
          <p key={index} className="my-1 ml-4 text-muted-foreground">
            <span className="font-medium text-foreground">{match[1]}</span>
            {match[2]}
          </p>
        )
      }
    }

    if (line.startsWith('- ')) {
      return (
        <p
          key={index}
          className="my-1 ml-4 flex items-start gap-2 text-muted-foreground"
        >
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          {line.substring(2)}
        </p>
      )
    }

    if (/^\d+\./.test(line)) {
      return (
        <p key={index} className="my-1 ml-4 text-muted-foreground">
          {line}
        </p>
      )
    }

    if (line.trim() === '') {
      return <br key={index} />
    }

    return (
      <p key={index} className="my-1 text-muted-foreground">
        {line}
      </p>
    )
  })
}