import React, { useEffect, useRef, useCallback } from 'react'
import * as echarts from 'echarts'

const MapChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  const initChart = useCallback(async () => {
    if (!chartRef.current) return

    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose()
    }

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
        { coords: [[116.46, 39.92], [121.48, 31.22]] },
        { coords: [[116.46, 39.92], [113.23, 23.16]] },
        { coords: [[121.48, 31.22], [113.23, 23.16]] },
        { coords: [[121.48, 31.22], [114.07, 22.62]] },
        { coords: [[113.23, 23.16], [114.07, 22.62]] },
        { coords: [[116.46, 39.92], [108.94, 34.34]] },
        { coords: [[121.48, 31.22], [104.06, 30.67]] },
        { coords: [[113.23, 23.16], [104.06, 30.67]] },
        { coords: [[104.06, 30.67], [106.55, 29.56]] },
        { coords: [[116.46, 39.92], [120.19, 30.26]] },
        { coords: [[121.48, 31.22], [118.78, 32.04]] },
        { coords: [[114.31, 30.52], [112.94, 28.23]] },
        { coords: [[108.94, 34.34], [104.06, 30.67]] },
        { coords: [[120.19, 30.26], [118.78, 32.04]] },
        { coords: [[114.31, 30.52], [106.55, 29.56]] }
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
            fontSize: 12
          }
        },
        geo: {
          map: 'china',
          roam: false,
          zoom: 1.3,
          center: [104.5, 35],
          label: {
            show: true,
            color: '#00d4ff',
            fontSize: 9,
            fontWeight: 400,
            textBorderColor: 'rgba(0, 212, 255, 0.3)',
            textBorderWidth: 1.5
          },
          itemStyle: {
            areaColor: 'transparent',
            borderColor: 'rgba(0, 212, 255, 0.5)',
            borderWidth: 1.2,
            shadowColor: 'rgba(0, 212, 255, 0.4)',
            shadowBlur: 15
          },
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(0, 80, 120, 0.4)',
              borderColor: '#00ffff',
              borderWidth: 2
            },
            label: {
              color: '#fff',
              fontSize: 10
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
            symbolSize: [0, 6],
            effect: {
              show: true,
              period: 4,
              trailLength: 0.35,
              symbol: 'arrow',
              symbolSize: 5,
              color: '#00d4ff'
            },
            lineStyle: {
              color: 'rgba(0, 212, 255, 0.6)',
              width: 2,
              opacity: 0.7,
              curveness: 0.25
            },
            data: flyLines
          },
          {
            name: '数据点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: (value: any) => 6 + value[2] * 0.1,
            data: cityData,
            itemStyle: {
              color: '#00d4ff',
              shadowColor: '#00d4ff',
              shadowBlur: 15,
              borderWidth: 1.5,
              borderColor: '#fff'
            }
          },
          {
            name: '涟漪效果',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: (value: any) => 10 + value[2] * 0.08,
            data: [
              { name: '北京', value: [116.46, 39.92, 100] },
              { name: '上海', value: [121.48, 31.22, 90] },
              { name: '广州', value: [113.23, 23.16, 80] },
              { name: '深圳', value: [114.07, 22.62, 85] }
            ],
            itemStyle: {
              color: '#00d4ff',
              shadowColor: '#00d4ff',
              shadowBlur: 20
            },
            rippleEffect: {
              brushType: 'stroke',
              scale: 3.5,
              color: 'rgba(0, 212, 255, 0.5)',
              period: 3
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
              series: [option.series[0]]
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
  }, [])

  useEffect(() => {
    initChart()

    const handleResize = () => {
      chartInstanceRef.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstanceRef.current?.dispose()
      chartInstanceRef.current = null
    }
  }, [initChart])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
}

export default MapChart
