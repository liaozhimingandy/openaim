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

/**
 * 把当前区块同步进地址栏，方便复制/分享锚点链接，刷新后也还在原位。
 * 用 replaceState 而不是 hash 赋值，避免在浏览器历史里堆一串记录。
 */
function syncHash(id: string): void {
  if (typeof history === 'undefined' || typeof location === 'undefined') return

  history.replaceState(null, '', id ? `#${id}` : `${location.pathname}${location.search}`)
}

/** 平滑滚动到指定区块 */
export function scrollToAnchor(anchor: string): void {
  if (typeof document === 'undefined') return

  const id = toId(anchor)
  if (!id || id === 'home') {
    window.scrollTo({top: 0, behavior: 'smooth'})
    syncHash('')
    return
  }

  const el = document.getElementById(id)
  if (!el) return

  syncHash(id)

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - SCROLL_MARGIN
  window.scrollTo({top: Math.max(top, 0), behavior: 'smooth'})
}

/**
 * 带锚点直接打开页面时（分享链接、刷新），再校正一次位置。
 * 浏览器原生的锚点跳转只认 CSS 的 scroll-padding-top，这里统一按
 * HEADER_HEIGHT 计算，和点击导航的效果保持一致。
 */
export function scrollToHashOnLoad(): void {
  if (typeof document === 'undefined' || typeof location === 'undefined') return

  const hash = decodeURIComponent(location.hash.replace('#', ''))
  if (!hash || hash === 'home' || !document.getElementById(hash)) return

  // 等一帧，确保区块已经完成首次布局
  requestAnimationFrame(() => scrollToAnchor(hash))
}
