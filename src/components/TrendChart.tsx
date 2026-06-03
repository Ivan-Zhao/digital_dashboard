import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface TrendChartProps {
  title?: string
  data?: Array<{ name: string; value: number }>
  type?: 'line' | 'bar'
  color?: string
}

const TrendChart: React.FC<TrendChartProps> = ({
  title,
  data = [],
  type = 'line',
  color = '#00d4ff'
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current)

      const defaultData = [
        { name: '1月', value: 820 },
        { name: '2月', value: 932 },
        { name: '3月', value: 901 },
        { name: '4月', value: 934 },
        { name: '5月', value: 1290 },
        { name: '6月', value: 1330 }
      ]

      const chartData = data.length > 0 ? data : defaultData

      const option = {
        backgroundColor: 'transparent',
        title: title
          ? {
              text: title,
              textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'normal'
              },
              left: 'center'
            }
          : undefined,
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 20, 40, 0.9)',
          borderColor: '#00d4ff',
          borderWidth: 1,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: title ? '15%' : '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: type === 'bar',
          data: chartData.map((item) => item.name),
          axisLine: {
            lineStyle: {
              color: 'rgba(0, 212, 255, 0.3)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 12
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0, 212, 255, 0.1)',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '数据',
            type,
            data: chartData.map((item) => item.value),
            smooth: true,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color },
                  { offset: 1, color: 'rgba(0, 212, 255, 0.2)' }
                ]
              }
            },
            areaStyle:
              type === 'line'
                ? {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
                        { offset: 1, color: 'rgba(0, 212, 255, 0)' }
                      ]
                    }
                  }
                : undefined,
            lineStyle:
              type === 'line'
                ? {
                    width: 2,
                    color,
                    shadowColor: color,
                    shadowBlur: 10
                  }
                : undefined
          }
        ]
      }

      chartInstanceRef.current.setOption(option)
    }

    const handleResize = () => {
      chartInstanceRef.current?.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chartInstanceRef.current?.dispose()
    }
  }, [data, type, color, title])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />
}

export default TrendChart
