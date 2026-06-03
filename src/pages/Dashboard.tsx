import React, { useState, useEffect, useMemo } from 'react'
import { Globe, Users, Activity, TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import MapChart from '../components/MapChart'
import TrendChart from '../components/TrendChart'
import BusinessModules from '../components/BusinessModules'

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

  const statsData = useMemo(() => [
    { label: '在线用户', value: 2847, icon: Users, color: 'cyan' },
    { label: '今日处理', value: 12580, icon: Activity, color: 'green' },
    { label: '系统响应', value: '23ms', icon: Clock, color: 'purple' },
    { label: '异常预警', value: 3, icon: AlertTriangle, color: 'orange' }
  ], [])

  const realtimeData = useMemo(() => [
    { time: '10:23:45', type: 'success', content: '北京地区数据同步完成' },
    { time: '10:22:18', type: 'warning', content: '上海节点负载偏高' },
    { time: '10:20:05', type: 'success', content: '新用户注册成功' },
    { time: '10:18:32', type: 'info', content: '服务器健康检查通过' },
    { time: '10:15:40', type: 'success', content: '数据备份完成' }
  ], [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400 bg-green-400/10'
      case 'warning': return 'text-yellow-400 bg-yellow-400/10'
      case 'info': return 'text-cyan-400 bg-cyan-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <div className='min-h-screen w-full overflow-hidden bg-slate-950'>
      {/* 动态背景光效 */}
      <div className='fixed inset-0 opacity-20 pointer-events-none'>
        <div className='absolute left-1/3 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-600 blur-3xl animate-float' />
        <div className='absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-cyan-600 blur-3xl animate-float' style={{ animationDelay: '-3s' }} />
        <div className='absolute left-1/2 top-1/2 h-[300px] w-[300px] rounded-full bg-blue-500 blur-3xl animate-float' style={{ animationDelay: '-1.5s' }} />
      </div>

      {/* 网格背景 */}
      <div className='fixed inset-0 opacity-3 pointer-events-none'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* 扫描线效果 */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none opacity-5'>
        <div 
          className='absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent'
          style={{
            animation: 'scanline 8s linear infinite',
            top: '0%'
          }}
        />
      </div>

      <div className='relative z-10 flex h-screen flex-col p-3'>
        {/* 顶部标题栏 */}
        <header
          className={`mb-3 flex items-center justify-between rounded-xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/90 p-4 backdrop-blur-xl transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : '-translate-y-20 opacity-0'
          }`}
        >
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'>
                <Globe className='h-7 w-7 text-white' />
              </div>
              <div className='absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 opacity-30 blur-lg' />
            </div>
            <div>
              <h1 className='text-xl font-bold text-white tracking-wider'>
                <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
                  数字大屏可视化系统
                </span>
              </h1>
              <p className='text-xs text-slate-400'>Real-time Data Monitoring Platform</p>
            </div>
          </div>

          {/* 顶部统计卡片 */}
          <div className='flex items-center gap-3'>
            {statsData.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex items-center gap-3 rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-2 transition-all duration-500 hover:border-cyan-500/50 hover:bg-slate-800/70 ${
                  isLoaded
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <stat.icon className={`h-5 w-5 ${
                  stat.color === 'cyan' ? 'text-cyan-400' :
                  stat.color === 'green' ? 'text-green-400' :
                  stat.color === 'purple' ? 'text-purple-400' :
                  'text-orange-400'
                }`} />
                <div>
                  <p className='text-xs text-slate-400'>{stat.label}</p>
                  <p className={`text-lg font-bold ${
                    stat.color === 'cyan' ? 'text-cyan-300' :
                    stat.color === 'green' ? 'text-green-300' :
                    stat.color === 'purple' ? 'text-purple-300' :
                    'text-orange-300'
                  }`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 当前时间 */}
          <div className='flex items-center gap-3 rounded-lg bg-slate-800/50 border border-slate-700/50 px-4 py-3'>
            <Clock className='h-5 w-5 text-cyan-400' />
            <div className='text-right'>
              <p className='text-xs text-slate-400'>当前时间</p>
              <p className='text-lg font-mono font-bold text-cyan-300 tracking-wider'>
                {currentTime}
              </p>
            </div>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className='flex-1 grid grid-cols-12 gap-3 overflow-hidden'>
          {/* 左侧业务模块 */}
          <div
            className={`col-span-3 rounded-xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-3 backdrop-blur-xl transition-all duration-1000 ${
              isLoaded
                ? 'translate-x-0 opacity-100'
                : '-translate-x-20 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <BusinessModules />
          </div>

          {/* 中间地图区域 */}
          <div className='col-span-6 flex flex-col gap-3'>
            {/* 地图 */}
            <div
              className={`flex-1 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-4 backdrop-blur-xl transition-all duration-1000 ${
                isLoaded
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className='mb-3 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='h-6 w-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center'>
                    <Globe className='h-4 w-4 text-white' />
                  </div>
                  <h3 className='text-sm font-semibold text-white'>全国数据分布</h3>
                </div>
                <div className='flex gap-4 text-xs'>
                  <span className='flex items-center gap-1.5'>
                    <span className='h-2 w-2 rounded-full bg-cyan-400 animate-pulse' />
                    <span className='text-slate-400'>热点城市</span>
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <span className='h-2 w-2 rounded-full bg-green-400 animate-pulse' style={{ animationDelay: '0.5s' }} />
                    <span className='text-slate-400'>飞线数据</span>
                  </span>
                  <span className='flex items-center gap-1.5'>
                    <span className='h-2 w-2 rounded-full bg-purple-400 animate-pulse' style={{ animationDelay: '1s' }} />
                    <span className='text-slate-400'>数据节点</span>
                  </span>
                </div>
              </div>
              <div className='h-[calc(100%-2.5rem)]'>
                <MapChart />
              </div>
            </div>

            {/* 底部统计 */}
            <div
              className={`rounded-xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70 p-3 backdrop-blur-xl transition-all duration-1000 ${
                isLoaded
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-6'>
                  <div className='flex items-center gap-2'>
                    <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center'>
                      <TrendingUp className='h-4 w-4 text-white' />
                    </div>
                    <div>
                      <p className='text-xs text-slate-400'>业务总量</p>
                      <p className='text-lg font-bold text-cyan-300'>431,580</p>
                    </div>
                  </div>
                  <div className='h-8 w-px bg-slate-700' />
                  <div className='flex items-center gap-2'>
                    <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center'>
                      <CheckCircle className='h-4 w-4 text-white' />
                    </div>
                    <div>
                      <p className='text-xs text-slate-400'>成功率</p>
                      <p className='text-lg font-bold text-green-300'>99.8%</p>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div className='text-right'>
                    <p className='text-xs text-slate-400'>平均响应</p>
                    <p className='text-lg font-bold text-purple-300'>18ms</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-xs text-slate-400'>峰值处理</p>
                    <p className='text-lg font-bold text-orange-300'>1,850/s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧区域 */}
          <div className='col-span-3 flex flex-col gap-3'>
            {/* 柱状图 */}
            <div
              className={`flex-[1.2] rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-4 backdrop-blur-xl transition-all duration-1000 ${
                isLoaded
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className='mb-3 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div className='h-6 w-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center'>
                    <Activity className='h-4 w-4 text-white' />
                  </div>
                  <h3 className='text-sm font-semibold text-white'>业务统计</h3>
                </div>
                <span className='text-xs text-slate-400'>今日数据</span>
              </div>
              <div className='h-[calc(100%-2.5rem)]'>
                <TrendChart
                  type='bar'
                  color='#00ff88'
                  data={[
                    { name: '北京', value: 2300 },
                    { name: '上海', value: 1800 },
                    { name: '广州', value: 1500 },
                    { name: '深圳', value: 1700 },
                    { name: '杭州', value: 1200 }
                  ]}
                />
              </div>
            </div>

            {/* 实时动态 */}
            <div
              className={`flex-1 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-4 backdrop-blur-xl transition-all duration-1000 ${
                isLoaded
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className='mb-3 flex items-center gap-2'>
                <div className='h-6 w-6 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center'>
                  <Clock className='h-4 w-4 text-white' />
                </div>
                <h3 className='text-sm font-semibold text-white'>实时动态</h3>
                <span className='ml-auto flex items-center gap-1'>
                  <span className='h-2 w-2 rounded-full bg-green-400 animate-pulse' />
                  <span className='text-xs text-slate-400'>在线</span>
                </span>
              </div>
              <div className='space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar'>
                {realtimeData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 rounded-lg bg-slate-800/30 border border-slate-700/30 px-3 py-2 transition-all duration-300 hover:bg-slate-800/50 ${
                      isLoaded
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <span className={`mt-1 h-1.5 w-1.5 rounded-full ${
                      item.type === 'success' ? 'bg-green-400' :
                      item.type === 'warning' ? 'bg-yellow-400' :
                      'bg-cyan-400'
                    } animate-pulse`} />
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-slate-500 font-mono'>{item.time}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${getTypeColor(item.type)}`}>
                          {item.type === 'success' ? '成功' : item.type === 'warning' ? '警告' : '信息'}
                        </span>
                      </div>
                      <p className='text-xs text-slate-300 mt-1 truncate'>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
