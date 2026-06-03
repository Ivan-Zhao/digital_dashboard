import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const MapChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    const initChart = async () => {
      if (chartRef.current) {
        chartInstanceRef.current = echarts.init(chartRef.current)

        try {
          const response = await fetch('/china.json')
          const chinaJson = await response.json()
          echarts.registerMap('china', chinaJson)

          // 城市坐标数据
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
            { name: '南京', value: [118.78, 32.04, 66] }
          ]

          // 飞线数据 - 从主要城市飞向其他城市
          const flyLines = [
            [
              [116.46, 39.92],
              [121.48, 31.22]
            ],
            [
              [116.46, 39.92],
              [113.23, 23.16]
            ],
            [
              [121.48, 31.22],
              [113.23, 23.16]
            ],
            [
              [121.48, 31.22],
              [114.07, 22.62]
            ],
            [
              [113.23, 23.16],
              [114.07, 22.62]
            ],
            [
              [116.46, 39.92],
              [108.94, 34.34]
            ],
            [
              [121.48, 31.22],
              [104.06, 30.67]
            ],
            [
              [113.23, 23.16],
              [104.06, 30.67]
            ]
          ]

          const option = {
            backgroundColor: 'transparent',
            tooltip: {
              trigger: 'item',
              backgroundColor: 'rgba(0, 20, 40, 0.9)',
              borderColor: '#00d4ff',
              borderWidth: 1,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            geo: {
              map: 'china',
              roam: true,
              zoom: 1.2,
              label: {
                show: true,
                color: '#00d4ff',
                fontSize: 10
              },
              itemStyle: {
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                    { offset: 1, color: 'rgba(0, 50, 100, 0.1)' }
                  ]
                },
                borderColor: '#00d4ff',
                borderWidth: 1,
                shadowColor: 'rgba(0, 212, 255, 0.5)',
                shadowBlur: 20
              },
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(0, 212, 255, 0.4)',
                  borderColor: '#00ffff',
                  borderWidth: 2
                },
                label: {
                  color: '#fff'
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
              // 飞线动画系列
              {
                name: '飞线',
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 2,
                large: true,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                  show: true,
                  period: 4,
                  trailLength: 0.4,
                  symbol: 'arrow',
                  symbolSize: 5,
                  color: '#00ffff',
                  shadowBlur: 10,
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
                      { offset: 0, color: '#00ff88' },
                      { offset: 1, color: '#00d4ff' }
                    ]
                  },
                  width: 2,
                  opacity: 0.8,
                  curveness: 0.2
                },
                data: flyLines.map((line) => ({
                  coords: line
                }))
              },
              // 第二个飞线组 - 不同颜色
              {
                name: '飞线2',
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 2,
                large: true,
                symbol: ['none', 'arrow'],
                symbolSize: 10,
                effect: {
                  show: true,
                  period: 5,
                  trailLength: 0.5,
                  symbol: 'arrow',
                  symbolSize: 6,
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
                      { offset: 0, color: '#00d4ff' },
                      { offset: 1, color: '#ff6b6b' }
                    ]
                  },
                  width: 2,
                  opacity: 0.7,
                  curveness: 0.3
                },
                data: [
                  [
                    [116.46, 39.92],
                    [120.19, 30.26]
                  ],
                  [
                    [121.48, 31.22],
                    [118.78, 32.04]
                  ],
                  [
                    [104.06, 30.67],
                    [106.55, 29.56]
                  ],
                  [
                    [114.31, 30.52],
                    [108.94, 34.34]
                  ]
                ]
              },
              {
                name: '数据点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 12,
                data: cityData,
                itemStyle: {
                  color: '#00ff88',
                  shadowColor: '#00ff88',
                  shadowBlur: 15
                }
              },
              {
                name: '涟漪效果',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbolSize: 18,
                data: [
                  { name: '北京', value: [116.46, 39.92, 100] },
                  { name: '上海', value: [121.48, 31.22, 90] },
                  { name: '广州', value: [113.23, 23.16, 80] }
                ],
                itemStyle: {
                  color: '#00d4ff',
                  shadowColor: '#00d4ff',
                  shadowBlur: 25
                },
                rippleEffect: {
                  brushType: 'stroke',
                  scale: 5
                }
              },
              // 发光点特效
              {
                name: '发光点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbolSize: 20,
                data: [
                  { name: '北京', value: [116.46, 39.92, 100] },
                  { name: '上海', value: [121.48, 31.22, 90] }
                ],
                itemStyle: {
                  color: '#fff',
                  shadowBlur: 30,
                  shadowColor: '#00ffff'
                },
                rippleEffect: {
                  brushType: 'stroke',
                  scale: 6
                }
              }
            ]
          }

          chartInstanceRef.current.setOption(option)

          // 监听飞线动画完成，自动重新开始
          let timer: number | null = null
          const animateLines = () => {
            timer = window.setTimeout(() => {
              if (chartInstanceRef.current) {
                // 重新设置飞线数据以触发重新动画
                chartInstanceRef.current.setOption({
                  series: option.series
                })
                animateLines()
              }
            }, 8000)
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
