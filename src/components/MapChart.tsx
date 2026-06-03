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
              {
                name: '数据点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 10,
                data: [
                  { name: '北京', value: [116.46, 39.92, 100] },
                  { name: '上海', value: [121.48, 31.22, 90] },
                  { name: '广州', value: [113.23, 23.16, 80] },
                  { name: '深圳', value: [114.07, 22.62, 85] },
                  { name: '杭州', value: [120.19, 30.26, 75] }
                ],
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
                symbolSize: 15,
                data: [
                  { name: '北京', value: [116.46, 39.92, 100] },
                  { name: '上海', value: [121.48, 31.22, 90] }
                ],
                itemStyle: {
                  color: '#00d4ff',
                  shadowColor: '#00d4ff',
                  shadowBlur: 20
                },
                rippleEffect: {
                  brushType: 'stroke',
                  scale: 4
                }
              }
            ]
          }

          chartInstanceRef.current.setOption(option)
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
