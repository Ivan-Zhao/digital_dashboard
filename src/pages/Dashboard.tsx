import React, { useState, useEffect, useMemo } from 'react'
import { Clock, Users, Building2 } from 'lucide-react'
import MapChart from '../components/MapChart'

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
      setCurrentTime(timeStr)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const businessData = useMemo(() => [
    { name: '远程授权', value: 120223, trend: '+12.5%' },
    { name: '支付结算', value: 77787, trend: '+8.3%' },
    { name: '单位账户', value: 8753, trend: '+5.2%' },
    { name: '境内外汇', value: 1489, trend: '+3.8%' }
  ], [])

  const leftModules = useMemo(() => [
    { name: '支付结算重点', queue: 4, pending: 5 },
    { name: '境内外汇', queue: 5, pending: 6 },
    { name: '支付结算重点', queue: 4, pending: 5 },
    { name: '其他', queue: 5, pending: 6 },
    { name: '远程授权', queue: 4, pending: 6 }
  ], [])

  const personnelData = useMemo(() => [
    { department: '业务运营一部', online: 23, rate: '100%' },
    { department: '业务运营二部', online: 2, rate: '100%' },
    { department: '业务运营三部', online: 14, rate: '100%' },
    { department: '业务运营一部', online: 18, rate: '100%' }
  ], [])

  const officeData = useMemo(() => [
    { name: '市商路办公区', online: 25, rate: '01.%' },
    { name: '科技路办公区', online: 32, rate: '099%' }
  ], [])

  const pieData = useMemo(() => [
    { name: '远程授权', value: 57.74, color: '#00d4ff' },
    { name: '支付结算', value: 37.35, color: '#00ff88' },
    { name: '单位账户', value: 4.20, color: '#ff6b6b' }
  ], [])

  return (
    <div className='min-h-screen w-full overflow-hidden bg-slate-950'>
      <div className='fixed inset-0 opacity-10 pointer-events-none'>
        <div className='absolute inset-0' style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className='relative z-10 h-screen flex flex-col'>
        {/* 顶部标题栏 */}
        <header className='flex items-center justify-between px-6 py-3 border-b border-cyan-500/20 bg-slate-900/80'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>A</span>
              </div>
              <div>
                <h1 className='text-lg font-bold text-white tracking-wider'>AABS-GXNC</h1>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2 text-cyan-400 text-sm'>
            <Clock className='h-4 w-4' />
            <span className='font-mono'>{currentTime}</span>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className='flex-1 flex overflow-hidden'>
          {/* 左侧业务模块 */}
          <div className='w-64 border-r border-cyan-500/20 bg-slate-900/60 p-4'>
            <div className='mb-4'>
              <h3 className='text-xs text-cyan-400 mb-3 font-medium tracking-wider'>当前时段排队情况</h3>
              <div className='space-y-3'>
                {leftModules.map((module, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg bg-slate-800/40 border border-slate-700/30 transition-all duration-500 ${
                      isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${100 + index * 80}ms` }}
                  >
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse' />
                      <span className='text-xs text-white font-medium'>{module.name}</span>
                    </div>
                    <div className='flex items-center justify-between text-xs'>
                      <div className='flex items-center gap-3'>
                        <span className='text-slate-400'>排队</span>
                        <span className='text-cyan-400 font-bold'>{module.queue}笔</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='text-slate-400'>待补录</span>
                        <span className='text-orange-400 font-bold'>{module.pending}笔</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-4 p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 transition-all duration-500 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`} style={{ transitionDelay: '500ms' }}>
              <h3 className='text-xs text-cyan-400 mb-3 font-medium'>排队平均时长</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-xs text-slate-400 mb-1'>前5分钟</p>
                  <p className='text-lg font-bold text-cyan-300'>0.51秒</p>
                </div>
                <div>
                  <p className='text-xs text-slate-400 mb-1'>当日累计</p>
                  <p className='text-lg font-bold text-cyan-300'>6.41秒</p>
                </div>
              </div>
            </div>
          </div>

          {/* 中间地图区域 */}
          <div className='flex-1 flex flex-col'>
            {/* 顶部业务数据卡片 */}
            <div className='flex gap-4 px-6 py-4 border-b border-cyan-500/20 bg-slate-900/40'>
              {businessData.map((item, index) => (
                <div
                  key={item.name}
                  className={`flex-1 p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-cyan-500/20 transition-all duration-500 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${100 + index * 100}ms` }}
                >
                  <p className='text-xs text-slate-400 mb-2'>{item.name}</p>
                  <div className='flex items-baseline justify-between'>
                    <span className='text-2xl font-bold text-cyan-300 tabular-nums'>
                      {item.value.toLocaleString()}
                    </span>
                    <span className='text-xs text-green-400'>{item.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 地图区域 */}
            <div className='flex-1 relative p-6'>
              <div className='absolute inset-6 rounded-xl border border-cyan-500/30 bg-slate-900/60 overflow-hidden'>
                <MapChart />
              </div>
              
              {/* 业务总量中心标识 */}
              <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center'>
                <div className='w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex flex-col items-center justify-center'>
                  <span className='text-xs text-cyan-400 mb-1'>业务总量</span>
                  <span className='text-xl font-bold text-cyan-300 tabular-nums'>208,252</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧区域 */}
          <div className='w-72 border-l border-cyan-500/20 bg-slate-900/60 flex flex-col'>
            {/* 人员在线情况 */}
            <div className='p-4 border-b border-cyan-500/20'>
              <div className='flex items-center gap-2 mb-4'>
                <Users className='h-4 w-4 text-cyan-400' />
                <h3 className='text-xs text-cyan-400 font-medium'>人员在线情况</h3>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                {personnelData.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg bg-slate-800/40 border border-slate-700/30 transition-all duration-500 ${
                      isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${200 + index * 80}ms` }}
                  >
                    <p className='text-xs text-slate-400 mb-2 truncate'>{item.department}</p>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-bold text-white'>{item.online}</span>
                      <span className='text-xs text-green-400'>{item.rate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 办公区 */}
            <div className='p-4 border-b border-cyan-500/20'>
              <div className='flex items-center gap-2 mb-4'>
                <Building2 className='h-4 w-4 text-cyan-400' />
                <h3 className='text-xs text-cyan-400 font-medium'>办公区</h3>
              </div>
              <div className='space-y-3'>
                {officeData.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg bg-slate-800/40 border border-slate-700/30 transition-all duration-500 ${
                      isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${500 + index * 80}ms` }}
                  >
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse' />
                      <span className='text-xs text-white'>{item.name}</span>
                    </div>
                    <div className='flex items-center justify-between text-xs'>
                      <span className='text-slate-400'>在线人数</span>
                      <span className='text-cyan-400 font-bold'>{item.online}</span>
                    </div>
                    <div className='flex items-center justify-between text-xs mt-1'>
                      <span className='text-slate-400'>在线率</span>
                      <span className='text-green-400 font-bold'>{item.rate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 业务量占比 */}
            <div className='flex-1 p-4 flex flex-col'>
              <h3 className='text-xs text-cyan-400 font-medium mb-4'>各板块业务量占比</h3>
              <div className='flex-1 flex flex-col items-center justify-center'>
                <div className='relative w-32 h-32'>
                  <svg viewBox='0 0 100 100' className='w-full h-full transform -rotate-90'>
                    {(() => {
                      let cumulativeOffset = 0
                      return pieData.map((item, index) => {
                        const startAngle = cumulativeOffset * 3.6 * (Math.PI / 180)
                        const endAngle = (cumulativeOffset + item.value) * 3.6 * (Math.PI / 180)
                        const largeArcFlag = item.value > 50 ? 1 : 0
                        const x1 = 50 + 40 * Math.cos(startAngle)
                        const y1 = 50 + 40 * Math.sin(startAngle)
                        const x2 = 50 + 40 * Math.cos(endAngle)
                        const y2 = 50 + 40 * Math.sin(endAngle)
                        cumulativeOffset += item.value
                        return (
                          <path
                            key={index}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                            fill={item.color}
                            opacity='0.8'
                            className='transition-all duration-500'
                            style={{
                              transitionDelay: `${600 + index * 100}ms`,
                              opacity: isLoaded ? 0.8 : 0
                            }}
                          />
                        )
                      })
                    })()}
                    <circle cx='50' cy='50' r='25' fill='#0f172a' />
                  </svg>
                  <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <span className='text-lg font-bold text-cyan-300'>4.20</span>
                    <span className='text-[10px] text-slate-400'>总笔数</span>
                  </div>
                </div>
                <div className='mt-4 space-y-2 w-full'>
                  {pieData.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between text-xs transition-all duration-500 ${
                        isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${700 + index * 80}ms` }}
                    >
                      <div className='flex items-center gap-2'>
                        <span className='w-2 h-2 rounded-full' style={{ backgroundColor: item.color }} />
                        <span className='text-slate-300'>{item.name}</span>
                      </div>
                      <span className='text-cyan-400 font-bold'>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
