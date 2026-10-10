/**
 * 导航高亮：根据滚动位置计算当前所处的区块
 * ---------------------------------------------------------------
 * 比 IntersectionObserver 更可控：以 Header 下方一条基线为准，
 * 最后一个越过基线的区块即为当前区块。
 */
import {onBeforeUnmount, onMounted, ref, type Ref} from 'vue'
import {HEADER_HEIGHT} from './useSectionScroll'

/** 基线与 Header 底部的距离 */
const BASE_LINE_OFFSET = 96

export function useActiveSection(ids: string[]): Ref<string> {
  const activeSection = ref(ids[0] ?? '')
  let rafId = 0

  const compute = () => {
    rafId = 0

    const baseLine = HEADER_HEIGHT + BASE_LINE_OFFSET
    let current = ids[0] ?? ''

    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= baseLine) current = id
    }

    // 已经滚到底部时，强制高亮最后一个区块
    const reachedBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
    if (reachedBottom) current = ids[ids.length - 1] ?? current

    activeSection.value = current
  }

  const schedule = () => {
    if (rafId) return
    rafId = requestAnimationFrame(compute)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, {passive: true})
    window.addEventListener('resize', schedule, {passive: true})
    compute()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return activeSection
}
