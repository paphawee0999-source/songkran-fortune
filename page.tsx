"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import HomePage from "@/components/songkran/home-page"
import DonationFlow from "@/components/songkran/donation-flow"
import SiamseeFlow from "@/components/songkran/siamsee-flow"
import FloatingElements from "@/components/songkran/floating-elements"

export type FormData = {
  company: string
  employeeId: string
  fullName: string
  amount: string
  slipFile?: File | null
}

export type FlowType = "home" | "donation" | "siamsee"

export default function SongkranApp() {
  const [currentFlow, setCurrentFlow] = useState<FlowType>("home")
  const [formData, setFormData] = useState<FormData>({
    company: "",
    employeeId: "",
    fullName: "",
    amount: "",
    slipFile: null,
  })
  const [siamseeNumber, setSiamseeNumber] = useState<number | null>(null)
  const [skipRegistration, setSkipRegistration] = useState(false)

  const handleGoHome = () => {
    setCurrentFlow("home")
    setFormData({
      company: "",
      employeeId: "",
      fullName: "",
      amount: "",
      slipFile: null,
    })
    setSiamseeNumber(null)
    setSkipRegistration(false)
  }

  const handleGoToSiamsee = () => {
    // Coming from donation flow - skip registration
    setSkipRegistration(true)
    setCurrentFlow("siamsee")
  }

  const handleGoToSiamseeDirect = () => {
    // Direct access - show registration
    setSkipRegistration(false)
    setCurrentFlow("siamsee")
  }

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* Full-Screen Background Image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/images/songkran-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Floating Elements - Clouds, Water, Jasmine */}
      <FloatingElements />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Metallic Gold Header */}
        <header className="pt-6 md:pt-10 lg:pt-12 flex-shrink-0">
          <h1 
            className="metallic-gold-text text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-center cursor-pointer select-none px-4"
            data-text="COM7 สงกรานต์ชื่นบุญ"
          >
            COM7 สงกรานต์ชื่นบุญ
          </h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-4 md:py-8 h-full">
            <AnimatePresence mode="wait">
              {currentFlow === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <HomePage
                    onDonate={() => setCurrentFlow("donation")}
                    onSiamsee={handleGoToSiamseeDirect}
                  />
                </motion.div>
              )}

              {currentFlow === "donation" && (
                <motion.div
                  key="donation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <DonationFlow
                    formData={formData}
                    setFormData={setFormData}
                    onGoHome={handleGoHome}
                    onGoToSiamsee={handleGoToSiamsee}
                  />
                </motion.div>
              )}

              {currentFlow === "siamsee" && (
                <motion.div
                  key="siamsee"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <SiamseeFlow
                    formData={formData}
                    setFormData={setFormData}
                    siamseeNumber={siamseeNumber}
                    setSiamseeNumber={setSiamseeNumber}
                    onGoHome={handleGoHome}
                    skipRegistration={skipRegistration}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
