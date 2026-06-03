import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const MapChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    const initChart = async () => {
      if (chartRef.current) {
        chartInstanceRef.current = echarts.init(chartRef.current, 'dark')

        try {
          const response = await fetch('/china.json')
          const chinaJson = await response.json()
          echarts.registerMap('china', chinaJson)

          const cityData = [
            { name: '北京', value: [116.46, 39.92, 100] },
            { name: '上海', value: [121.48, 31.22, 90] },
            { name: '广州', value: [113.23, 23.16, 80] },
            { name: '深圳', value: [114.07, 22.62, 85] },
            { name: '杭州', value: [120.19, 30.26, 75] },
            { name: '成都', value: [104.06, 30.67, 70] },
            { name: '西安', value: [108.94, 34.34, 65] },
            { name: '武汉', value: [114.31, 30.52, 72] },
            { name: '重庆', value: [106.55, 29.56, 68] },
            { name: '南京', value: [118.78, 32.04, 66] },
            { name: '天津', value: [117.2, 39.13, 58] },
            { name: '苏州', value: [120.62, 31.32, 55] },
            { name: '郑州', value: [113.65, 34.76, 52] },
            { name: '长沙', value: [112.94, 28.23, 50] },
            { name: '青岛', value: [120.33, 36.07, 48] }
          ]

          const flyLines = [
            [[116.46, 39.92], [121.48, 31.22]],
            [[116.46, 39.92], [113.23, 23.16]],
            [[121.48, 31.22], [113.23, 23.16]],
            [[121.48, 31.22], [114.07, 22.62]],
            [[113.23, 23.16], [114.07, 22.62]],
            [[116.46, 39.92], [108.94, 34.34]],
            [[121.48, 31.22], [104.06, 30.67]],
            [[113.23, 23.16], [104.06, 30.67]],
            [[104.06, 30.67], [106.55, 29.56]],
            [[116.46, 39.92], [120.19, 30.26]],
            [[121.48, 31.22], [118.78, 32.04]],
            [[114.31, 30.52], [112.94, 28.23]]
          ]

          const option: echarts.EChartsOption = {
            backgroundColor: 'transparent',
            tooltip: {
              trigger: 'item',
              backgroundColor: 'rgba(0, 30, 60, 0.95)',
              borderColor: 'rgba(0, 212, 255, 0.5)',
              borderWidth: 1,
              textStyle: {
                color: '#fff',
                fontSize: 13
              },
              formatter: (params: any) => {
                if (params.seriesName === '数据点' || params.seriesName === '涟漪效果') {
                  return `<div style="padding: 8px;">
                    <div style="font-weight: bold; color: #00d4ff; margin-bottom: 4px;">${params.name}</div>
                    <div style="color: #94a3b8;">数据值: ${params.value[2]}</div>
                  </div>`
                }
                return params.name
              }
            },
            geo: {
              map: 'china',
              roam: false,
              zoom: 1.25,
              center: [104.5, 35],
              label: {
                show: true,
                color: '#00d4ff',
                fontSize: 10,
                fontWeight: 400,
                textBorderColor: 'rgba(0, 212, 255, 0.3)',
                textBorderWidth: 2
              },
              itemStyle: {
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    { offset: 0, color: 'rgba(0, 80, 120, 0.4)' },
                    { offset: 1, color: 'rgba(0, 30, 60, 0.1)' }
                  ]
                },
                borderColor: 'rgba(0, 212, 255, 0.6)',
                borderWidth: 1.5,
                shadowColor: 'rgba(0, 212, 255, 0.8)',
                shadowBlur: 30,
                shadowOffsetY: 10
              },
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(0, 120, 180, 0.5)',
                  borderColor: '#00ffff',
                  borderWidth: 2,
                  shadowColor: 'rgba(0, 255, 255, 1)',
                  shadowBlur: 40
                },
                label: {
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 600
                }
              },
              regions: [
                {
                  name: '南海诸岛',
                  itemStyle: {
                    opacity: 0
                  }
                }
              ]
            },
            series: [
              {
                name: '飞线',
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 2,
                large: true,
                symbol: ['none', 'arrow'],
                symbolSize: [0, 8],
                effect: {
                  show: true,
                  period: 3.5,
                  trailLength: 0.35,
                  symbol: 'arrow',
                  symbolSize: 6,
                  color: '#00ffff',
                  shadowBlur: 15,
                  shadowColor: '#00ffff'
                },
                lineStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: 'rgba(0, 255, 136, 0.8)' },
                      { offset: 1, color: 'rgba(0, 212, 255, 0.8)' }
                    ]
                  },
                  width: 2.5,
                  opacity: 0.7,
                  curveness: 0.25
                },
                data: flyLines.map((line) => ({ coords: line }))
              },
              {
                name: '飞线2',
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 2,
                large: true,
                symbol: ['none', 'arrow'],
                symbolSize: [0, 7],
                effect: {
                  show: true,
                  period: 4.5,
                  trailLength: 0.45,
                  symbol: 'arrow',
                  symbolSize: 5,
                  color: '#ff6b6b',
                  shadowBlur: 12,
                  shadowColor: '#ff6b6b'
                },
                lineStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: 'rgba(0, 212, 255, 0.7)' },
                      { offset: 1, color: 'rgba(255, 107, 107, 0.7)' }
                    ]
                  },
                  width: 2,
                  opacity: 0.6,
                  curveness: 0.35
                },
                data: [
                  [[116.46, 39.92], [120.19, 30.26]],
                  [[121.48, 31.22], [118.78, 32.04]],
                  [[104.06, 30.67], [106.55, 29.56]],
                  [[114.31, 30.52], [108.94, 34.34]],
                  [[120.19, 30.26], [114.07, 22.62]]
                ]
              },
              {
                name: '数据点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: (value: any) => 8 + value[2] * 0.15,
                data: cityData,
                itemStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 0.5,
                    colorStops: [
                      { offset: 0, color: '#ffffff' },
                      { offset: 0.5, color: '#00ff88' },
                      { offset: 1, color: '#00d4ff' }
                    ]
                  },
                  shadowColor: '#00ff88',
                  shadowBlur: 20,
                  borderWidth: 2,
                  borderColor: 'rgba(0, 255, 136, 0.8)'
                }
              },
              {
                name: '涟漪效果',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbolSize: (value: any) => 12 + value[2] * 0.12,
                data: [
                  { name: '北京', value: [116.46, 39.92, 100] },
                  { name: '上海', value: [121.48, 31.22, 90] },
                  { name: '广州', value: [113.23, 23.16, 80] },
                  { name: '深圳', value: [114.07, 22.62, 85] }
                ],
                itemStyle: {
                  color: '#00d4ff',
                  shadowColor: '#00d4ff',
                  shadowBlur: 30,
                  borderWidth: 2,
                  borderColor: '#ffffff'
                },
                rippleEffect: {
                  brushType: 'stroke',
                  scale: 4,
                  color: 'rgba(0, 212, 255, 0.6)',
                  period: 3
                }
              },
              {
                name: '发光点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbolSize: (value: any) => 15 + value[2] * 0.1,
                data: [
                  { name: '北京', value: [116.46, 39.92, 100] },
                  { name: '上海', value: [121.48, 31.22, 90] }
                ],
                itemStyle: {
                  color: '#ffffff',
                  shadowBlur: 40,
                  shadowColor: 'rgba(0, 255, 255, 0.9)',
                  borderWidth: 3,
                  borderColor: 'rgba(0, 255, 255, 0.9)'
                },
                rippleEffect: {
                  brushType: 'fill',
                  scale: 5,
                  color: 'rgba(0, 255, 255, 0.4)',
                  period: 2.5
                }
              },
              {
                name: '区域边界',
                type: 'map',
                map: 'china',
                coordinateSystem: 'geo',
                zlevel: 1,
                label: {
                  show: false
                },
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: 'rgba(0, 212, 255, 0.3)',
                  borderWidth: 1
                }
              }
            ]
          }

          chartInstanceRef.current.setOption(option)

          let timer: number | null = null
          const animateLines = () => {
            timer = window.setTimeout(() => {
              if (chartInstanceRef.current) {
                chartInstanceRef.current.setOption({
                  series: option.series
                })
                animateLines()
              }
            }, 7000)
          }
          animateLines()

          return () => {
            if (timer) {
              clearTimeout(timer)
            }
          }
        } catch (error) {
          console.error('加载地图数据失败:', error)
        }
      }
    }

    initChart()

    const handleResize = () => {
      chartInstanceRef.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstanceRef.current?.dispose()
    }
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
}

export default MapChart
