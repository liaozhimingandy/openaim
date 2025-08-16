<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'

interface Coords {
  lat: number
  lon: number
}

interface Phase {
  key: string
  label: string
}

const coords = ref<Coords | null>(null)
const error = ref<string | null>(null)
const now = ref(new Date())
const altitudeDeg = ref(0)
const phase = ref<Phase>({key: 'day', label: '日间'})
const gradient = ref('')

function calculateSunAltitude(lat: number, lon: number, date: Date): number {
  // 转换为弧度
  const toRad = (deg: number) => deg * Math.PI / 180
  const toDeg = (rad: number) => rad * 180 / Math.PI

  // 1. 计算儒略日 (Julian Day)
  const JD = date.getTime() / 86400000 + 2440587.5
  const D = JD - 2451545.0

  // 2. 太阳平均黄经 (deg)
  const g = 357.529 + 0.98560028 * D
  const q = 280.459 + 0.98564736 * D
  const L = q + 1.915 * Math.sin(toRad(g)) + 0.020 * Math.sin(toRad(2 * g))

  // 3. 太阳赤纬 δ
  const e = 23.439 - 0.00000036 * D
  const delta = Math.asin(Math.sin(toRad(e)) * Math.sin(toRad(L)))

  // 4. 时角 H
  const utcHours = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600
  const LST = (utcHours + lon / 15) * 15 // 简化地方时
  const H = toRad(LST - L)

  // 5. 太阳高度角 α
  const latRad = toRad(lat)
  const altitude = Math.asin(Math.sin(latRad) * Math.sin(delta) + Math.cos(latRad) * Math.cos(delta) * Math.cos(H))
  return toDeg(altitude)
}

function getGradientByAltitude(altitude: number): string[] {
  if (altitude < 0) return ['#070B34', '#0B1E3D', '#161A42'] // 夜晚
  if (altitude < 6) return ['#3A1C71', '#D76D77', '#FFAF7B'] // 金色时刻
  return ['#60A5FA', '#93C5FD', '#E0F2FE'] // 日间
}

function updateSky(): void {
  if (!coords.value) return
  now.value = new Date()
  altitudeDeg.value = calculateSunAltitude(coords.value.lat, coords.value.lon, now.value)

  const colors = getGradientByAltitude(altitudeDeg.value)
  gradient.value = `linear-gradient(180deg, ${colors[0]} 0%, ${colors[1]} 45%, ${colors[2]} 100%)`

  if (altitudeDeg.value < 0) phase.value = {key: 'night', label: '夜间'}
  else if (altitudeDeg.value < 6) phase.value = {key: 'golden', label: '金色时刻'}
  else phase.value = {key: 'day', label: '日间'}
}

const finalBackground = computed(() => gradient.value)

onMounted(() => {
  if (!('geolocation' in navigator)) {
    error.value = '浏览器不支持定位'
    return
  }

  navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        coords.value = {lat: pos.coords.latitude, lon: pos.coords.longitude}
        updateSky()
        setInterval(updateSky, 60000) // 每分钟更新一次
      },
      (err: GeolocationPositionError) => {
        error.value = err.code === err.PERMISSION_DENIED ? '已拒绝定位权限' : '无法获取位置'
      }
  )
})
</script>

<template>
  <div :style="{ background: finalBackground }">
    <slot name="content">
      <div style="min-height: 100vh; min-width: 100vw">
        <div class="flex items-center gap-3">
          <span v-if="altitudeDeg >= 0">☀️</span>
          <span v-else>🌙</span>
          <h1 class="text-2xl sm:text-3xl font-semibold drop-shadow">
            当前天空渐变 — {{ phase.label }}
          </h1>
        </div>
        <div class="mt-6">
          <p v-if="coords">纬度 {{ coords.lat.toFixed(4) }}, 经度 {{ coords.lon.toFixed(4) }} · {{
              now.toLocaleString()
            }}</p>
          <p v-else>尚未获得定位 {{ error ? '— ' + error : '(正在尝试获取…)' }} </p>
        </div>
      </div>
    </slot>
  </div>
</template>

<style scoped>

</style>