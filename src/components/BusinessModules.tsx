import React, { useEffect, useState, useMemo } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

const businessModules = [
  {
    id: 'remote',
    name: '远程授权',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔', value: 156 },
      { label: '前5分钟排队', key: 'waitTime5', unit: '分钟', value: 8.5 },
      { label: '当日累计排队', key: 'waitTimeDay', unit: '小时', value: 12.3 }
    ]
  },
  {
    id: 'payment',
    name: '支付结算',
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

    const duration = 1200
    const startTime = Date.now()
    const startDelay = delay + 100

    const timeout = setTimeout(() => {
      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime - startDelay
        const progress = Math.min(elapsed / duration, 1)
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
      case 'blue': return 'text-cyan-400'
      case 'green': return 'text-green-400'
      case 'purple': return 'text-purple-400'
      case 'orange': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between py-2',
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: '500ms' }}
    >
      <span className='text-xs text-slate-400'>{metric.label}</span>
      <div className='flex items-baseline gap-1'>
        <span className={cn('text-base font-bold tabular-nums', getColorClass())}>
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
  const getGradientClass = () => {
    switch (module.color) {
      case 'blue': return 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30'
      case 'green': return 'from-green-500/20 to-emerald-500/10 border-green-500/30'
      case 'purple': return 'from-purple-500/20 to-pink-500/10 border-purple-500/30'
      case 'orange': return 'from-orange-500/20 to-amber-500/10 border-orange-500/30'
      default: return 'from-slate-500/20 to-gray-500/10 border-slate-500/30'
    }
  }

  const getGlowClass = () => {
    switch (module.color) {
      case 'blue': return 'shadow-cyan-500/10'
      case 'green': return 'shadow-green-500/10'
      case 'purple': return 'shadow-purple-500/10'
      case 'orange': return 'shadow-orange-500/10'
      default: return 'shadow-slate-500/10'
    }
  }

  const getBarColor = () => {
    switch (module.color) {
      case 'blue': return 'bg-gradient-to-r from-cyan-500 to-blue-500'
      case 'green': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'purple': return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'orange': return 'bg-gradient-to-r from-orange-500 to-amber-500'
      default: return 'bg-gradient-to-r from-slate-500 to-gray-500'
    }
  }

  const loadRate = Math.min((module.metrics[0].value / 200) * 100, 100)

  return (
    <div
      className={cn(
        'relative transition-all duration-700',
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={cn(
        'rounded-xl border bg-gradient-to-br p-3 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg',
        getGradientClass(),
        getGlowClass()
      )}>
        {/* 头部 */}
        <div className='flex items-center justify-between mb-3'>
          <div>
            <h3 className='text-sm font-semibold text-white'>{module.name}</h3>
            <div className='flex items-center gap-1.5 mt-0.5'>
              <span className='h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse' />
              <span className='text-xs text-slate-500'>实时监控</span>
            </div>
          </div>
          <div className={cn(
            'h-8 w-8 rounded-lg flex items-center justify-center bg-gradient-to-br',
            module.gradient
          )}>
            <span className='text-xs font-bold text-white'>{module.metrics[0].value}</span>
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
              delay={100 + index * 80}
            />
          ))}
        </div>

        {/* 底部进度条 */}
        <div className='mt-3'>
          <div className='flex items-center justify-between mb-1'>
            <span className='text-[10px] text-slate-500'>负载率</span>
            <span className='text-[10px] text-slate-400 font-mono'>{loadRate.toFixed(0)}%</span>
          </div>
          <div className='h-1 bg-slate-800/50 rounded-full overflow-hidden'>
            <div
              className={cn('h-full rounded-full transition-all duration-1000 ease-out', getBarColor())}
              style={{
                width: isVisible ? `${loadRate}%` : '0%',
                transitionDelay: `${delay + 400}ms`
              }}
            />
          </div>
        </div>

        {/* 底部装饰线 */}
        <div className={cn(
          'absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r',
          module.gradient,
          'opacity-30'
        )} />
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
          'mb-3 transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        )}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='h-px w-6 bg-gradient-to-r from-transparent to-cyan-500/50' />
            <span className='text-sm font-semibold text-cyan-300'>业务板块监控</span>
            <div className='h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent' />
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='h-2 w-2 rounded-full bg-green-400 animate-pulse' />
            <span className='text-xs text-slate-500'>5个模块在线</span>
          </div>
        </div>
      </div>

      {/* 模块列表 */}
      <div className='flex-1 overflow-y-auto space-y-3 custom-scrollbar'>
        {businessModules.map((module, index) => (
          <ModuleCard
            key={module.id}
            module={module}
            delay={index * 120}
            isVisible={isVisible}
          />
        ))}
      </div>

      {/* 底部统计 */}
      <div
        className={cn(
          'mt-3 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-800/50 to-blue-500/10 p-3 transition-all duration-700',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        )}
        style={{ transitionDelay: '700ms' }}
      >
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30'>
              <span className='text-white text-lg font-bold'>∑</span>
            </div>
            <div>
              <p className='text-xs text-slate-400'>总排队笔数</p>
              <p className='text-xl font-bold text-cyan-300'>{totalQueue}</p>
            </div>
          </div>
          <div className='text-right'>
            <p className='text-xs text-slate-500'>待补录笔数</p>
            <p className='text-lg font-semibold text-orange-400'>{totalPending}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessModules
