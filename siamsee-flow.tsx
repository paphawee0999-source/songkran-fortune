"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface CloudData {
  id: string
  delay: number
  duration: number
  startX: number
  size: number
  topPercent: number
  yOffsets: number[]
}

interface SplashData {
  id: string
  delay: number
  startX: number
  startY: number
  xOffsets: number[]
  repeatDelay: number
}

interface FlowerData {
  id: string
  delay: number
  startX: number
  size: number
  xOffset: number
  rotateDir: number
  duration: number
}

interface ConfettiData {
  id: string
  delay: number
  startX: number
  size: number
  xOffset: number
  duration: number
}

// Seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Cloud component with fixed values
function Cloud({ data }: { data: CloudData }) {
  return (
    <motion.div
      className="absolute opacity-40 pointer-events-none"
      initial={{ x: data.startX, y: data.yOffsets[0] }}
      animate={{ 
        x: [data.startX, data.startX + 100, data.startX],
        y: data.yOffsets
      }}
      transition={{
        duration: data.duration,
        delay: data.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ 
        top: `${data.topPercent}%`,
        filter: "blur(1px)"
      }}
    >
      <svg width={data.size} height={data.size * 0.5} viewBox="0 0 120 60" fill="none">
        <ellipse cx="60" cy="40" rx="50" ry="20" fill="white" opacity="0.9"/>
        <ellipse cx="35" cy="35" rx="30" ry="18" fill="white" opacity="0.9"/>
        <ellipse cx="85" cy="35" rx="25" ry="15" fill="white" opacity="0.9"/>
        <ellipse cx="50" cy="25" rx="25" ry="15" fill="white" opacity="0.9"/>
        <ellipse cx="70" cy="28" rx="20" ry="12" fill="white" opacity="0.9"/>
      </svg>
    </motion.div>
  )
}

// Water splash particle with fixed values
function WaterSplash({ data }: { data: SplashData }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${data.startX}%`, top: `${data.startY}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        scale: [0, 1, 1.2, 0],
        y: [-20, -60, -80, -100],
        x: data.xOffsets,
      }}
      transition={{
        duration: 3,
        delay: data.delay,
        repeat: Infinity,
        repeatDelay: data.repeatDelay,
      }}
    >
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <path 
          d="M10 0C10 0 0 10 0 16C0 20.4183 4.02944 24 9 24C13.9706 24 18 20.4183 18 16C18 10 10 0 10 0Z" 
          fill="url(#waterGradient)"
          opacity="0.7"
        />
        <defs>
          <linearGradient id="waterGradient" x1="9" y1="0" x2="9" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7DD3FC" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

// Jasmine flower with fixed values
function JasmineFlower({ data }: { data: FlowerData }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${data.startX}%`, top: "-5%" }}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: ["0%", "110vh"],
        x: [0, data.xOffset],
        rotate: [0, 360 * data.rotateDir],
      }}
      transition={{
        duration: data.duration,
        delay: data.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width={data.size} height={data.size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" fill="#FEF3C7"/>
        <ellipse cx="12" cy="5" rx="3" ry="5" fill="white"/>
        <ellipse cx="12" cy="19" rx="3" ry="5" fill="white"/>
        <ellipse cx="5" cy="12" rx="5" ry="3" fill="white"/>
        <ellipse cx="19" cy="12" rx="5" ry="3" fill="white"/>
        <ellipse cx="7" cy="7" rx="3" ry="4" fill="white" transform="rotate(-45 7 7)"/>
        <ellipse cx="17" cy="7" rx="3" ry="4" fill="white" transform="rotate(45 17 7)"/>
        <ellipse cx="7" cy="17" rx="3" ry="4" fill="white" transform="rotate(45 7 17)"/>
        <ellipse cx="17" cy="17" rx="3" ry="4" fill="white" transform="rotate(-45 17 17)"/>
      </svg>
    </motion.div>
  )
}

// Pink flower with fixed values
function PinkFlower({ data }: { data: FlowerData }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${data.startX}%`, top: "-5%" }}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.9, 0.9, 0],
        y: ["0%", "110vh"],
        x: [0, data.xOffset],
        rotate: [0, 180 * data.rotateDir],
      }}
      transition={{
        duration: data.duration,
        delay: data.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width={data.size} height={data.size} viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="4" fill="#FBBF24"/>
        <ellipse cx="16" cy="7" rx="5" ry="7" fill="#F472B6"/>
        <ellipse cx="16" cy="25" rx="5" ry="7" fill="#F472B6"/>
        <ellipse cx="7" cy="16" rx="7" ry="5" fill="#F472B6"/>
        <ellipse cx="25" cy="16" rx="7" ry="5" fill="#F472B6"/>
        <ellipse cx="9" cy="9" rx="4" ry="6" fill="#F472B6" transform="rotate(-45 9 9)"/>
        <ellipse cx="23" cy="9" rx="4" ry="6" fill="#F472B6" transform="rotate(45 23 9)"/>
        <ellipse cx="9" cy="23" rx="4" ry="6" fill="#F472B6" transform="rotate(45 9 23)"/>
        <ellipse cx="23" cy="23" rx="4" ry="6" fill="#F472B6" transform="rotate(-45 23 23)"/>
      </svg>
    </motion.div>
  )
}

// Gold confetti with fixed values
function GoldConfetti({ data }: { data: ConfettiData }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ 
        left: `${data.startX}%`, 
        top: "-2%",
        width: data.size,
        height: data.size * 2,
        background: "linear-gradient(135deg, #F5D76E 0%, #D4AF37 50%, #B8941F 100%)",
        borderRadius: 1,
      }}
      initial={{ opacity: 0, rotateX: 0, rotateY: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: ["0%", "110vh"],
        x: [0, data.xOffset],
        rotateX: [0, 360 * 3],
        rotateY: [0, 360 * 2],
      }}
      transition={{
        duration: data.duration,
        delay: data.delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false)
  const [elements, setElements] = useState<{
    clouds: CloudData[]
    splashes: SplashData[]
    jasmines: FlowerData[]
    pinkFlowers: FlowerData[]
    confetti: ConfettiData[]
  } | null>(null)

  useEffect(() => {
    // Generate random values only on client side
    const clouds: CloudData[] = Array.from({ length: 4 }, (_, i) => ({
      id: `cloud-${i}`,
      delay: i * 2,
      duration: 15 + seededRandom(i * 100) * 10,
      startX: -100 + (i * 300),
      size: 100 + seededRandom(i * 101) * 60,
      topPercent: seededRandom(i * 102) * 25,
      yOffsets: [
        seededRandom(i * 103) * 30,
        seededRandom(i * 104) * 50,
        seededRandom(i * 105) * 30
      ],
    }))

    const splashes: SplashData[] = Array.from({ length: 8 }, (_, i) => ({
      id: `splash-${i}`,
      delay: i * 0.5,
      startX: seededRandom(i * 200) * 100,
      startY: 60 + seededRandom(i * 201) * 30,
      xOffsets: [
        0,
        (seededRandom(i * 202) - 0.5) * 30,
        (seededRandom(i * 203) - 0.5) * 50
      ],
      repeatDelay: seededRandom(i * 204) * 2,
    }))

    const jasmines: FlowerData[] = Array.from({ length: 6 }, (_, i) => ({
      id: `jasmine-${i}`,
      delay: i * 1.5,
      startX: seededRandom(i * 300) * 100,
      size: 16 + seededRandom(i * 301) * 12,
      xOffset: (seededRandom(i * 302) - 0.5) * 100,
      rotateDir: seededRandom(i * 303) > 0.5 ? 1 : -1,
      duration: 8 + seededRandom(i * 304) * 4,
    }))

    const pinkFlowers: FlowerData[] = Array.from({ length: 4 }, (_, i) => ({
      id: `pink-${i}`,
      delay: i * 2 + 0.5,
      startX: seededRandom(i * 400) * 100,
      size: 20 + seededRandom(i * 401) * 15,
      xOffset: (seededRandom(i * 402) - 0.5) * 80,
      rotateDir: seededRandom(i * 403) > 0.5 ? 1 : -1,
      duration: 10 + seededRandom(i * 404) * 5,
    }))

    const confetti: ConfettiData[] = Array.from({ length: 10 }, (_, i) => ({
      id: `confetti-${i}`,
      delay: i * 0.8,
      startX: seededRandom(i * 500) * 100,
      size: 4 + seededRandom(i * 501) * 4,
      xOffset: (seededRandom(i * 502) - 0.5) * 60,
      duration: 6 + seededRandom(i * 503) * 3,
    }))

    setElements({ clouds, splashes, jasmines, pinkFlowers, confetti })
    setMounted(true)
  }, [])

  // Don't render anything until client-side mount to avoid hydration mismatch
  if (!mounted || !elements) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
      {/* Floating Clouds */}
      {elements.clouds.map((cloud) => (
        <Cloud key={cloud.id} data={cloud} />
      ))}
      
      {/* Water Splashes */}
      {elements.splashes.map((splash) => (
        <WaterSplash key={splash.id} data={splash} />
      ))}
      
      {/* Falling Jasmine Flowers */}
      {elements.jasmines.map((jasmine) => (
        <JasmineFlower key={jasmine.id} data={jasmine} />
      ))}
      
      {/* Pink Flowers */}
      {elements.pinkFlowers.map((flower) => (
        <PinkFlower key={flower.id} data={flower} />
      ))}
      
      {/* Gold Confetti */}
      {elements.confetti.map((piece) => (
        <GoldConfetti key={piece.id} data={piece} />
      ))}
    </div>
  )
}
