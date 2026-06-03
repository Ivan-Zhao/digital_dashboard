import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useCountUp } from '../hooks/useCountUp'

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
      { label: '排队笔数', key: 'queueCount', unit: '笔' },
      { label: '前5分钟排队', key: 'waitTime5', unit: '分钟' },
      { label: '当日累计排队', key: 'waitTimeDay', unit: '小时' }
    ],
    mockData: {
      queueCount: 156,
      waitTime5: 8.5,
      waitTimeDay: 12.3
    }
  },
  {
    id: 'payment',
    name: '支付结算',
    icon: '💳',
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔' },
      { label: '待补录笔数', key: 'pendingCount', unit: '笔' }
    ],
    mockData: {
      queueCount: 89,
      pendingCount: 23
    }
  },
  {
    id: 'domestic',
    name: '境内外汇',
    icon: '🌐',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔' },
      { label: '待补录笔数', key: 'pendingCount', unit: '笔' }
    ],
    mockData: {
      queueCount: 45,
      pendingCount: 12
    }
  },
  {
    id: 'paymentFocus',
    name: '支付结算重点',
    icon: '⭐',
    color: 'orange',
    gradient: 'from-orange-500 to-amber-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔' },
      { label: '待补录笔数', key: 'pendingCount', unit: '笔' }
    ],
    mockData: {
      queueCount: 67,
      pendingCount: 18
    }
  },
  {
    id: 'other',
    name: '其他',
    icon: '📋',
    color: 'gray',
    gradient: 'from-slate-500 to-gray-500',
    metrics: [
      { label: '排队笔数', key: 'queueCount', unit: '笔' },
      { label: '待补录笔数', key: 'pendingCount', unit: '笔' }
    ],
    mockData: {
      queueCount: 34,
      pendingCount: 8
    }
  }
]

interface ModuleCardProps {
  module: any
  delay: number
  isVisible: boolean
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, delay, isVisible }) => {
  const [animatedMetrics, setAnimatedMetrics] = useState<Record<string, number>>({})

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedMetrics(module.mockData)
      }, delay + 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible, delay, module.mockData])

  const getMetricValue = (metric: any) => {
    if (!isVisible) return 0
    const value = module.mockData[metric.key]
    if (metric.key.includes('Time')) {
      return useCountUp(Math.floor(value * 10), 1500, isVisible) / 10
    }
    return useCountUp(value, 1500, isVisible)
  }

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
        <div
          className={cn(
            'absolute top-0 left-1 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30'
          )}
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${module.color === 'blue' ? '#00d4ff' : module.color === 'green' ? '#00ff88' : module.color === 'purple' ? '#ff6bff' : module.color === 'orange' ? '#ff9800' : '#64748b'}, transparent)`
          }}
        />

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
              <div
                className={cn(
                  'h-1 w-1 rounded-full animate-pulse',
                  module.color === 'blue'
                    ? 'bg-cyan-400'
                    : module.color === 'green'
                    ? 'bg-green-400'
                    : module.color === 'purple'
                    ? 'bg-purple-400'
                    : module.color === 'orange'
                    ? 'bg-orange-400'
                    : 'bg-gray-400'
                )}
              />
              <span className='text-xs text-slate-500'>实时监控中</span>
            </div>
          </div>
        </div>

        {/* 指标数据 */}
        <div className='space-y-2'>
          {module.metrics.map((metric: any, index: number) => (
            <div
              key={metric.key}
              className={cn(
                'flex items-center justify-between py-2 px-3 rounded-lg bg-slate-800/30 group-hover:bg-slate-800/50 transition-all duration-300',
                isVisible ? 'translate-x-0' : 'translate-x-4'
              )}
              style={{ transitionDelay: `${delay + 100 + index * 50}ms` }}
            >
              <span className='text-xs text-slate-400 flex items-center gap-2'>
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    module.color === 'blue'
                      ? 'bg-blue-400'
                      : module.color === 'green'
                      ? 'bg-green-400'
                      : module.color === 'purple'
                      ? 'bg-purple-400'
                      : module.color === 'orange'
                      ? 'bg-orange-400'
                      : 'bg-gray-400'
                  )}
                />
                {metric.label}
              </span>
              <div className='flex items-baseline gap-1'>
                <span
                  className={cn(
                    'text-lg font-bold tabular-nums transition-all duration-300',
                    module.color === 'blue'
                      ? 'text-cyan-300'
                      : module.color === 'green'
                      ? 'text-green-300'
                      : module.color === 'purple'
                      ? 'text-purple-300'
                      : module.color === 'orange'
                      ? 'text-orange-300'
                      : 'text-gray-300'
                  )}
                >
                  {getMetricValue(metric).toFixed(
                    metric.key.includes('Time') ? 1 : 0
                  )}
                </span>
                <span className='text-xs text-slate-500'>{metric.unit}</span>
              </div>
            </div>
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
                width: isVisible
                  ? `${Math.min((module.mockData.queueCount / 200) * 100, 100)}%`
                  : '0%',
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
              <p className='text-lg font-bold text-cyan-300'>391</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <div className='text-right'>
              <p className='text-xs text-slate-500'>待补录</p>
              <p className='text-sm font-semibold text-orange-400'>61</p>
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
