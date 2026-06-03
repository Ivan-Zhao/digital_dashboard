import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

interface DataCardProps {
  title: string
  value: string | number
  unit?: string
  icon?: React.ReactNode
  color?: 'blue' | 'cyan' | 'green' | 'purple'
  trend?: {
    value: string
    isUp: boolean
  }
  className?: string
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  unit,
  icon,
  color = 'blue',
  trend,
  className
}) => {
  const colorMap = {
    blue: 'from-blue-500 to-cyan-500',
    cyan: 'from-cyan-400 to-teal-400',
    green: 'from-green-400 to-emerald-500',
    purple: 'from-purple-500 to-pink-500'
  }

  const borderColorMap = {
    blue: 'border-blue-500/50',
    cyan: 'border-cyan-500/50',
    green: 'border-green-500/50',
    purple: 'border-purple-500/50'
  }

  const textColorMap = {
    blue: 'text-blue-400',
    cyan: 'text-cyan-400',
    green: 'text-green-400',
    purple: 'text-purple-400'
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm p-4 shadow-lg transition-all duration-300 hover:scale-[1.02]',
        borderColorMap[color],
        className
      )}
    >
      <div
        className={cn(
          'absolute left-0 top-0 h-1 w-full bg-gradient-to-r',
          colorMap[color]
        )}
      />

      <div className='flex items-start justify-between'>
        <div>
          <p className='text-sm font-medium text-slate-400'>{title}</p>
          <div className='mt-2 flex items-baseline gap-1'>
            <span
              className={cn(
                'text-3xl font-bold tracking-tight',
                textColorMap[color]
              )}
            >
              {value}
            </span>
            {unit && <span className='text-sm text-slate-400'>{unit}</span>}
          </div>
          {trend && (
            <div className='mt-2 flex items-center gap-1'>
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.isUp ? 'text-green-400' : 'text-red-400'
                )}
              >
                {trend.isUp ? '↑' : '↓'} {trend.value}
              </span>
              <span className='text-xs text-slate-500'>较上期</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br',
              colorMap[color],
              'opacity-20'
            )}
          >
            {icon}
          </div>
        )}
      </div>

      <div
        className={cn(
          'absolute -left-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br opacity-10 blur-2xl',
          colorMap[color]
        )}
      />
    </div>
  )
}

export default DataCard
