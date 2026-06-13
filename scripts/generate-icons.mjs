// Pure-JS PNG icon generator — no native deps.
// Produces brand icons (forest-green disc with gold "river" waves).
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')
mkdirSync(PUBLIC, { recursive: true })

const GREEN = [27, 67, 50]
const GOLD = [212, 160, 23]
const SAND = [248, 242, 228]

// CRC32 (PNG chunks)
const crcTable = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const body = Buffer.concat([typeBuf, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([len, body, crc])
}

function drawIcon(N, padFactor) {
  const px = Buffer.alloc(N * N * 4)
  const set = (x, y, [r, g, b], a = 255) => {
    const i = (y * N + x) * 4
    px[i] = r
    px[i + 1] = g
    px[i + 2] = b
    px[i + 3] = a
  }
  const cx = N / 2
  const cy = N / 2
  const discR = N * padFactor
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      set(x, y, GREEN) // background
      const dx = x - cx
      const dy = y - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist <= discR) {
        // gold disc with subtle radial shading
        const shade = 1 - (dist / discR) * 0.18
        set(x, y, [GOLD[0] * shade, GOLD[1] * shade, GOLD[2] * shade])
        // river waves carved into the disc
        const stripes = [0.4, 0.52, 0.64]
        for (const s of stripes) {
          const yc = N * s
          const wave = N * 0.035 * Math.sin((x / N) * Math.PI * 3.2)
          if (Math.abs(y - (yc + wave)) < N * 0.02) set(x, y, GREEN)
        }
      }
    }
  }
  // raw scanlines with filter byte 0
  const raw = Buffer.alloc(N * (N * 4 + 1))
  for (let y = 0; y < N; y++) {
    raw[y * (N * 4 + 1)] = 0
    px.copy(raw, y * (N * 4 + 1) + 1, y * N * 4, (y + 1) * N * 4)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(N, 0)
  ihdr.writeUInt32BE(N, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // color type RGBA
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ])
}

const targets = [
  { name: 'icon-192.png', size: 192, pad: 0.42 },
  { name: 'icon-512.png', size: 512, pad: 0.42 },
  { name: 'icon-512-maskable.png', size: 512, pad: 0.34 },
  { name: 'apple-touch-icon.png', size: 180, pad: 0.42 },
  { name: 'og-fallback.png', size: 512, pad: 0.42 }
]
for (const t of targets) {
  writeFileSync(join(PUBLIC, t.name), drawIcon(t.size, t.pad))
  console.log('wrote', t.name)
}
void SAND
