import React, { useEffect, useState, useMemo } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

// 业务模块配置
const businessModules = [
  {
    id: 'remote',
    name: '远程授权',
    icon: '📡',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔', value: 156 },
      { label: '前5分钟排队', key: 'waitTime5', unit: '分钟', value: 8.5 },
      { label: '当日累计排队', key: 'waitTimeDay', unit: '小时', value: 12.3 }
    ]
  },
  {
    id: 'payment',
    name: '支付结算',
    icon: '💳',
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔', value: 89 },
      { label: '待补录笔数', key: 'pendingCount', unit: '笔', value: 23 }
    ]
  },
  {
    id: 'domestic',
    name: '境内外汇',
    icon: '🌐',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔', value: 45 },
      { label: '待补录笔数', key: 'pendingCount', unit: '笔', value: 12 }
    ]
  },
  {
    id: 'paymentFocus',
    name: '支付结算重点',
    icon: '⭐',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔', value: 67 },
      { label: '待补录笔数', key: 'pendingCount', unit: '笔', value: 18 }
    ]
  },
  {
    id: 'other',
    name: '其他',
    icon: '📋',
    color: 'gray',
    gradient: 'from-slate-500 to-gray-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔', value: 34 },
      { label: '待补录笔数', key: 'pendingCount', unit: '笔', value: 8 }
    ]
  }
]

interface MetricDisplayProps {
  metric: any
  color: string
  isVisible: boolean
  delay: number
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({ metric, color, isVisible, delay }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const targetValue = metric.value

  useEffect(() => {
    if (!isVisible) {
      setDisplayValue(0)
      return
    }

    const duration = 1500
    const startTime = Date.now()
    const startDelay = delay + 200

    const timeout = setTimeout(() => {
      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime - startDelay
        const progress = Math.min(elapsed / duration, 1)
        
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        
        const currentValue = easeProgress * targetValue
        setDisplayValue(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, startDelay)

    return () => clearTimeout(timeout)
  }, [isVisible, targetValue, delay])

  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'text-cyan-300'
      case 'green':
        return 'text-green-300'
      case 'purple':
        return 'text-purple-300'
      case 'orange':
        return 'text-orange-300'
      default:
        return 'text-gray-300'
    }
  }

  const getDotColor = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-400'
      case 'green':
        return 'bg-green-400'
      case 'purple':
        return 'bg-purple-400'
      case 'orange':
        return 'bg-orange-400'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between py-2 px-3 rounded-lg bg-slate-800/30 group-hover:bg-slate-800/50 transition-all duration-300',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className='text-xs text-slate-400 flex items-center gap-2'>
        <span className={cn('h-1.5 w-1.5 rounded-full', getDotColor())} />
        {metric.label}
      </span>
      <div className='flex items-baseline gap-1'>
        <span className={cn('text-lg font-bold tabular-nums transition-all duration-300', getColorClass())}>
          {metric.key.includes('Time') ? displayValue.toFixed(1) : Math.floor(displayValue)}
        </span>
        <span className='text-xs text-slate-500'>{metric.unit}</span>
      </div>
    </div>
  )
}

interface ModuleCardProps {
  module: any
  delay: number
  isVisible: boolean
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, delay, isVisible }) => {
  const getColorClass = () => {
    switch (module.color) {
      case 'blue':
        return 'text-cyan-300'
      case 'green':
        return 'text-green-300'
      case 'purple':
        return 'text-purple-300'
      case 'orange':
        return 'text-orange-300'
      default:
        return 'text-gray-300'
    }
  }

  const getDotColor = () => {
    switch (module.color) {
      case 'blue':
        return 'bg-cyan-400'
      case 'green':
        return 'bg-green-400'
      case 'purple':
        return 'bg-purple-400'
      case 'orange':
        return 'bg-orange-400'
      default:
        return 'bg-gray-400'
    }
  }

  const loadRate = Math.min((module.metrics[0].value / 200) * 100, 100)

  return (
    <div
      className={cn(
        'relative group transition-all duration-700',
        isVisible
          ? 'translate-x-0 opacity-100'
          : '-translate-x-12 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* 背景光效 */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500',
          module.gradient
        )}
      />

      {/* 主卡片 */}
      <div className='relative rounded-lg border bg-gradient-to-br from-slate-900/90 to-slate-800/60 backdrop-blur-xl p-4 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg overflow-hidden'>
        {/* 左侧渐变条 */}
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-1 rounded-l-lg bg-gradient-to-b',
            module.gradient
          )}
        />

        {/* 顶部装饰线 */}
        <div className='absolute top-0 left-1 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent' />

        {/* 扫描线效果 */}
        <div
          className='absolute inset-0 overflow-hidden pointer-events-none'
          style={{
            background: 'linear-gradient(transparent 50%, rgba(0, 212, 255, 0.02) 50%)',
            backgroundSize: '100% 4px'
          }}
        />

        {/* 头部 */}
        <div className='flex items-center gap-3 mb-3'>
          <div
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-lg text-xl bg-gradient-to-br',
              module.gradient,
              'shadow-lg'
            )}
          >
            {module.icon}
            {/* 脉冲光环 */}
            <div
              className={cn(
                'absolute inset-0 rounded-lg animate-ping opacity-20 bg-gradient-to-br',
                module.gradient
              )}
            />
          </div>
          <div className='flex-1'>
            <h3 className='text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300'>
              {module.name}
            </h3>
            <div className='flex items-center gap-2 mt-0.5'>
              <div className={cn('h-1 w-1 rounded-full animate-pulse', getDotColor())} />
              <span className='text-xs text-slate-500'>实时监控中</span>
            </div>
          </div>
        </div>

        {/* 指标数据 */}
        <div className='space-y-2'>
          {module.metrics.map((metric: any, index: number) => (
            <MetricDisplay
              key={metric.key}
              metric={metric}
              color={module.color}
              isVisible={isVisible}
              delay={100 + index * 50}
            />
          ))}
        </div>

        {/* 底部进度条 */}
        <div className='mt-3 relative'>
          <div className='h-1 bg-slate-800/50 rounded-full overflow-hidden'>
            <div
              className={cn(
                'h-full rounded-full transition-all duration-1000 ease-out',
                module.gradient
              )}
              style={{
                width: isVisible ? `${loadRate}%` : '0%',
                transitionDelay: `${delay + 500}ms`
              }}
            />
          </div>
          <div className='absolute -top-3 right-0 text-[10px] text-slate-500'>
            负载率
          </div>
        </div>

        {/* 右下角装饰 */}
        <div
          className={cn(
            'absolute bottom-2 right-2 w-8 h-8 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500',
            module.gradient,
            'blur-sm'
          )}
        />
      </div>
    </div>
  )
}

const BusinessModules: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const totalQueue = useMemo(() => 
    businessModules.reduce((sum, m) => sum + m.metrics[0].value, 0),
    []
  )

  const totalPending = useMemo(() =>
    businessModules.reduce((sum, m) => {
      const pendingMetric = m.metrics.find((metric: any) => metric.key === 'pendingCount')
      return sum + (pendingMetric ? pendingMetric.value : 0)
    }, 0),
    []
  )

  return (
    <div className='h-full flex flex-col'>
      {/* 标题 */}
      <div
        className={cn(
          'mb-4 transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        )}
      >
        <div className='flex items-center gap-2 mb-2'>
          <div className='h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent' />
          <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-cyan-500/20'>
            <div className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse' />
            <span className='text-xs font-medium text-cyan-300'>
              业务板块监控
            </span>
          </div>
          <div className='h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent' />
        </div>
      </div>

      {/* 模块列表 */}
      <div className='flex-1 overflow-y-auto space-y-3 custom-scrollbar'>
        {businessModules.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            delay={index * 100}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* 底部统计 */}
      <div
        className={cn(
          'mt-4 p-3 rounded-lg bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-cyan-500/20 transition-all duration-700',
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        )}
        style={{ transitionDelay: '600ms' }}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold'>
              ∑
            </div>
            <div>
              <p className='text-xs text-slate-400'>总排队笔数</p>
              <p className='text-lg font-bold text-cyan-300'>{totalQueue}</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='text-right'>
              <p className='text-xs text-slate-500'>待补录</p>
              <p className='text-sm font-semibold text-orange-400'>{totalPending}</p>
            </div>
            <div className='w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg'>
              <span className='text-white text-lg'>✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessModules
