import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useCountUp } from '../hooks/useCountUp'

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
  delay?: number
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  unit,
  icon,
  color = 'blue',
  trend,
  className,
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0
  const isNumeric = typeof value === 'number'
  const count = useCountUp(numericValue, 2000, isVisible)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

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

  const displayValue = isNumeric ? count : value

  // 数字格式化
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return num.toLocaleString()
    }
    return num.toString()
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border bg-gradient-to-br from-slate-900/80 to-slate-800/60 backdrop-blur-sm p-4 shadow-lg transition-all duration-500 hover:scale-[1.02]',
        borderColorMap[color],
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-10 opacity-0',
        className
      )}
    >
      {/* 顶部渐变条 */}
      <div
        className={cn(
          'absolute left-0 top-0 h-1 w-full bg-gradient-to-r transition-all duration-1000',
          colorMap[color],
          isVisible ? 'scale-x-100' : 'scale-x-0'
        )}
      />

      {/* 脉冲光环 */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg transition-opacity duration-1000',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className={cn(
            'absolute -left-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br opacity-10 blur-2xl animate-pulse',
            colorMap[color]
          )}
        />
      </div>

      <div className='relative z-10 flex items-start justify-between'>
        <div>
          <p className='text-sm font-medium text-slate-400'>{title}</p>
          <div className='mt-2 flex items-baseline gap-1'>
            <span
              className={cn(
                'text-3xl font-bold tracking-tight transition-all duration-300',
                textColorMap[color],
                isVisible ? 'scale-100' : 'scale-0'
              )}
              style={{
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transitionDelay: `${delay + 200}ms`
              }}
            >
              {isNumeric ? formatNumber(displayValue as number) : displayValue}
            </span>
            {unit && <span className='text-sm text-slate-400'>{unit}</span>}
          </div>
          {trend && (
            <div
              className={cn(
                'mt-2 flex items-center gap-1 transition-all duration-500',
                isVisible
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-4 opacity-0'
              )}
              style={{ transitionDelay: `${delay + 400}ms` }}
            >
              <span
                className={cn(
                  'text-xs font-medium transition-colors duration-300',
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
              'flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br transition-all duration-500',
              colorMap[color],
              'opacity-20',
              isVisible
                ? 'translate-x-0 rotate-0 opacity-20'
                : 'translate-x-4 -rotate-12 opacity-0'
            )}
            style={{ transitionDelay: `${delay + 300}ms` }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* 底部扫描线动画 */}
      <div
        className={cn(
          'absolute bottom-0 left-0 h-px w-full overflow-hidden',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ transitionDelay: `${delay + 500}ms` }}
      >
        <div
          className={cn(
            'h-full w-20 bg-gradient-to-r from-transparent via-current to-transparent',
            colorMap[color].split(' ')[0]
          )}
          style={{
            animation: isVisible
              ? 'scanline 2s ease-in-out infinite'
              : 'none'
          }}
        />
      </div>
    </div>
  )
}

export default DataCard
