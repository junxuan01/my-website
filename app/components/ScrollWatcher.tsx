'use client'

import { useScroll } from 'ahooks'
import { useEffect } from 'react'

/**
 * 监听滚动位置，为 body 添加类名
 * 使用 ahooks 的 useScroll 优化性能
 */
export default function ScrollWatcher() {
  const scroll = useScroll()

  useEffect(() => {
    if (!scroll) return

    const scrollTop = scroll.top
    if (scrollTop > 20) {
      document.body.classList.remove('at-top')
    } else {
      document.body.classList.add('at-top')
    }
  }, [scroll])

  return null
}
