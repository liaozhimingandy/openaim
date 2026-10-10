/**
 * 区块滚动相关工具
 * ---------------------------------------------------------------
 * 顶部导航是吸顶的，直接用浏览器默认的锚点跳转会被 Header 遮住，
 * 这里统一减去 Header 高度再做平滑滚动。
 */

/**
 * 顶部 Header 高度（px）
 * 值取自 style.css 的 --spacing-header，避免两处硬编码不同步；
 * 取不到时回退到 64。
 */
export const HEADER_HEIGHT = (() => {
  if (typeof document === 'undefined') return 64

  const raw = getComputedStyle(document.documentElement).getPropertyValue('--spacing-header')
  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) ? parsed : 64
})()

/** 滚动到目标区块时额外留出的呼吸空间 */
const SCROLL_MARGIN = 12

function toId(anchor: string): string {
  return anchor.startsWith('#') ? anchor.slice(1) : anchor
}

/** 平滑滚动到指定区块 */
export function scrollToAnchor(anchor: string): void {
  if (typeof document === 'undefined') return

  const id = toId(anchor)
  if (!id || id === 'home') {
    window.scrollTo({top: 0, behavior: 'smooth'})
    return
  }

  const el = document.getElementById(id)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - SCROLL_MARGIN
  window.scrollTo({top: Math.max(top, 0), behavior: 'smooth'})
}
