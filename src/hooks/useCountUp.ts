import { useState, useEffect, useRef } from 'react'

export function useCountUp(
  endValue: number,
  duration: number = 2000,
  startOnMount: boolean = true
) {
  const [count, setCount] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!startOnMount) return

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // 使用 easeOutExpo 缓动函数，使动画更平滑
      const easeOutExpo =
        percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage)

      setCount(Math.floor(easeOutExpo * endValue))

      if (percentage < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [endValue, duration, startOnMount])

  return count
}
