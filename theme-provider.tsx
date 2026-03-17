"use client"

import { motion } from "framer-motion"

interface HomePageProps {
  onDonate: () => void
  onSiamsee: () => void
}

export default function HomePage({ onDonate, onSiamsee }: HomePageProps) {
  return (
    <div className="flex flex-col items-center justify-end h-full min-h-[55vh] pb-8 md:pb-12 lg:pb-16">
      {/* Main Action Buttons - positioned in lower-center */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col sm:flex-row gap-4 md:gap-6"
      >
        {/* Donate Button */}
        <motion.button
          onClick={onDonate}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl lg:text-2xl font-bold text-white rounded-xl overflow-hidden group border-2 border-white/30"
          style={{
            background: "linear-gradient(135deg, #FF9500 0%, #FF6B00 40%, #E65100 100%)",
            boxShadow: "0 8px 25px rgba(255, 107, 0, 0.6), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          {/* Shine effect on hover */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
              }}
            />
          </span>
          <span className="relative z-10 drop-shadow-lg">ร่วมบริจาคทำบุญ</span>
        </motion.button>

        {/* Siamsee Button */}
        <motion.button
          onClick={onSiamsee}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl lg:text-2xl font-bold text-white rounded-xl overflow-hidden group border-2 border-white/30"
          style={{
            background: "linear-gradient(135deg, #FF9500 0%, #FF6B00 40%, #E65100 100%)",
            boxShadow: "0 8px 25px rgba(255, 107, 0, 0.6), 0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          {/* Shine effect on hover */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)",
              }}
            />
          </span>
          <span className="relative z-10 drop-shadow-lg">เซียมซีออนไลน์</span>
        </motion.button>
      </motion.div>
    </div>
  )
}
