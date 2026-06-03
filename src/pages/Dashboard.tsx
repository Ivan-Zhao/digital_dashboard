import React, { useState, useEffect } from 'react'
import { Activity, Users, BarChart3, Globe, Zap } from 'lucide-react'
import MapChart from '../components/MapChart'
import DataCard from '../components/DataCard'
import TrendChart from '../components/TrendChart'

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
    // 页面加载动画
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950'>
      {/* 动态背景光效 */}
      <div className='fixed inset-0 opacity-30 pointer-events-none'>
        <div className='absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-500 blur-3xl animate-float' />
        <div className='absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500 blur-3xl animate-float' style={{ animationDelay: '-3s' }} />
        <div className='absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-cyan-500 blur-3xl animate-float' style={{ animationDelay: '-1.5s' }} />
      </div>

      {/* 网格背景 */}
      <div className='fixed inset-0 opacity-5 pointer-events-none'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className='relative z-10 flex h-screen flex-col p-4'>
        {/* 顶部标题栏 */}
        <header
          className={`mb-4 flex items-center justify-between rounded-lg border border-blue-500/30 bg-slate-900/70 px-6 py-4 backdrop-blur-sm transition-all duration-1000 ${
            isLoaded
              ? 'translate-y-0 opacity-100'
              : '-translate-y-20 opacity-0'
          }`}
        >
          <div className='flex items-center gap-3'>
            <div className='relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500'>
              <Globe className='h-6 w-6 text-white' />
              {/* 脉冲光环 */}
              <div className='absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 animate-ping opacity-20' />
            </div>
            <div>
              <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient'>
                数字大屏可视化系统
              </h1>
              <p className='text-xs text-slate-400'>实时数据监控平台</p>
            </div>
          </div>
          <div className='flex items-center gap-6'>
            <div className='text-right'>
              <p className='text-sm text-slate-400'>当前时间</p>
              <p className='text-lg font-mono font-semibold text-cyan-400 animate-pulse'>
                {currentTime}
              </p>
            </div>
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className='flex-1 grid grid-cols-12 gap-4 overflow-hidden'>
          {/* 左侧数据卡片区域 */}
          <div className='col-span-3 flex flex-col gap-4'>
            <DataCard
              title='总访问量'
              value={1284567}
              unit='次'
              icon={<Activity className='h-6 w-6 text-white' />}
              color='blue'
              trend={{ value: '12.5%', isUp: true }}
              delay={0}
            />
            <DataCard
              title='活跃用户'
              value={89432}
              unit='人'
              icon={<Users className='h-6 w-6 text-white' />}
              color='cyan'
              trend={{ value: '8.2%', isUp: true }}
              delay={100}
            />
            <DataCard
              title='数据量'
              value='2.8'
              unit='TB'
              icon={<BarChart3 className='h-6 w-6 text-white' />}
              color='green'
              trend={{ value: '5.1%', isUp: false }}
              delay={200}
            />
            <DataCard
              title='系统负载'
              value={67.8}
              unit='%'
              icon={<Zap className='h-6 w-6 text-white' />}
              color='purple'
              trend={{ value: '3.2%', isUp: true }}
              delay={300}
            />

            {/* 趋势图 */}
            <div
              className={`flex-1 rounded-lg border border-blue-500/30 bg-slate-900/70 p-4 backdrop-blur-sm transition-all duration-1000 ${
                isLoaded
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h3 className='mb-2 text-sm font-medium text-slate-300'>访问趋势</h3>
              <div className='h-[calc(100%-2rem)]'>
                <TrendChart type='line' color='#00d4ff' />
              </div>
            </div>
          </div>

          {/* 中间地图区域 */}
          <div className='col-span-6 flex flex-col gap-4'>
            <div
              className={`flex-1 rounded-lg border border-blue-500/30 bg-slate-900/70 p-4 backdrop-blur-sm transition-all duration-1000 ${
                isLoaded
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className='mb-2 flex items-center justify-between'>
                <h3 className='text-sm font-medium text-slate-300'>全国数据分布</h3>
                <div className='flex gap-4 text-xs text-slate-400'>
                  <span className='flex items-center gap-1'>
                    <span className='h-2 w-2 rounded-full bg-cyan-400 animate-pulse' />
                    热点城市
                  </span>
                  <span className='flex items-center gap-1'>
                    <span className='h-2 w-2 rounded-full bg-green-400 animate-pulse' style={{ animationDelay: '0.5s' }} />
                    飞线数据
                  </span>
                </div>
              </div>
              <div className='h-[calc(100%-2rem)]'>
                <MapChart />
              </div>
            </div>
          </div>

          {/* 右侧区域 */}
          <div className='col-span-3 flex flex-col gap-4'>
            {/* 柱状图 */}
            <div
              className={`flex-1 rounded-lg border border-blue-500/30 bg-slate-900/70 p-4 backdrop-blur-sm transition-all duration-1000 ${
                isLoaded
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <h3 className='mb-2 text-sm font-medium text-slate-300'>数据统计</h3>
              <div className='h-[calc(100%-2rem)]'>
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

            {/* 信息列表 */}
            <div
              className={`rounded-lg border border-blue-500/30 bg-slate-900/70 p-4 backdrop-blur-sm transition-all duration-1000 ${
                isLoaded
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <h3 className='mb-3 text-sm font-medium text-slate-300'>实时动态</h3>
              <div className='space-y-2'>
                {[
                  { time: '10:23:45', content: '北京地区访问量激增' },
                  { time: '10:22:18', content: '系统完成数据同步' },
                  { time: '10:20:05', content: '新用户注册成功' },
                  { time: '10:18:32', content: '服务器负载正常' },
                  { time: '10:15:40', content: '数据备份完成' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 text-xs transition-all duration-500 ${
                      isLoaded
                        ? 'translate-x-0 opacity-100'
                        : 'translate-x-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${500 + index * 100}ms` }}
                  >
                    <span className='mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse' />
                    <span className='text-slate-500'>{item.time}</span>
                    <span className='text-slate-300'>{item.content}</span>
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
