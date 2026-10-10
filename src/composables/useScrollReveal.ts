/**
 * 滚动进场动画
 * ---------------------------------------------------------------
 * 用法：在 HomePage 根节点挂载后调用一次，页面内所有带 data-reveal 的元素
 * 会在进入视口时淡入上移。同一容器内的元素按顺序错开一点点，避免集体闪现。
 */
import {onBeforeUnmount, onMounted} from 'vue'

export function useScrollReveal(): void {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('reveal-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('reveal-visible')
          observer?.unobserve(entry.target)
        })
      },
      {threshold: 0.08, rootMargin: '0px 0px -48px 0px'},
    )

    targets.forEach((el) => {
      // 同一父容器内的兄弟元素按顺序错开，最多错 5 档
      const index = targets.filter((t) => t.parentElement === el.parentElement).indexOf(el)
      const step = Math.max(0, Math.min(index, 5))
      el.style.transitionDelay = `${step * 70}ms`
      observer?.observe(el)
    })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
