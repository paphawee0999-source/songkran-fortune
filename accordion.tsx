"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, ChevronDown, Check, RefreshCw, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import html2canvas from "html2canvas"
import type { FormData } from "@/app/page"

const companies = [
  "บริษัท คอมเซเว่น จำกัด (มหาชน)",
  "บริษัท ดับเบิ้ลเซเว่น จำกัด",
  "บริษัท เอเดพท์ จำกัด",
  "บริษัท ซี โนว์ ฮาว จำกัด",
  "บริษัท ธันเดอร์ ฟินฟิน จำกัด",
  "บริษัท ดอกเตอร์ฟาร์มา เฮลธ์ เทคโนโลยี จำกัด",
  "บริษัท โฟร์พอส์ จำกัด",
  "บริษัท ออร์แกนนิค โซน จำกัด",
  "บริษัท ไอเทค ซอฟต์แวร์ จำกัด",
  "บริษัท ไพรม์ โซลูชั่น แอนด์เซอร์วิส จำกัด",
  "บริษัท ไอแคร์ประกันภัย จำกัด (มหาชน)",
  "บริษัท อินเตอร์วิชั่น บิสิเนสกรุ๊ป จำกัด",
  "บริษัท แบรกซ์3853 จำกัด",
  "บริษัท แบรกซ์แอนด์เบน จำกัด",
  "บริษัท ดับเบิ้ล แวลู จำกัด",
  "บริษัท ซักเซ่ซ มาร์ช จำกัด",
  "บริษัท คลับ ซักเซ่ซ จำกัด",
  "บริษัท โกลด์อินทิเกรท จำกัด",
]

const predictions = [
  { number: 1, text: "โชคดีที่สุด! ท่านจะพบกับความสำเร็จในทุกด้าน มีโชคลาภมากมาย ความรักสมหวัง สุขภาพแข็งแรง ขอให้สิ่งดีๆ เข้ามาในชีวิตตลอดปี", isVideo: true },
  { number: 2, text: "ท่านจะได้รับโชคลาภจากผู้ใหญ่ การงานเจริญก้าวหน้า มีผู้คอยช่วยเหลือ ความรักราบรื่น สุขภาพแข็งแรง", isVideo: false },
  { number: 3, text: "การเงินมั่นคง มีรายได้เข้ามาหลายทาง ครอบครัวอบอุ่น หมั่นทำบุญจะพบความสำเร็จ", isVideo: false },
  { number: 4, text: "ระวังเรื่องสุขภาพ ควรพักผ่อนให้เพียงพอ แต่โชคดีมีคนคอยดูแล การเงินพอใช้", isVideo: false },
  { number: 5, text: "โชคดีมากในเรื่องความรัก คนมีคู่จะรักกันมากขึ้น คนโสดจะได้พบรักแท้ในเร็ววัน", isVideo: false },
  { number: 6, text: "การงานรุ่งเรือง มีโอกาสได้เลื่อนตำแหน่ง หรือได้รับการยอมรับจากผู้บังคับบัญชา", isVideo: false },
  { number: 7, text: "โชคเลข 7 นำพาความสำเร็จ การลงทุนมีกำไร ระวังคนอิจฉา หมั่นทำบุญให้เทวดา", isVideo: false },
  { number: 8, text: "เลข 8 มงคล ความมั่งคั่งร่ำรวยจะมาถึง การค้าขายเจริญ ครอบครัวอยู่เย็นเป็นสุข", isVideo: false },
  { number: 9, text: "ก้าวหน้าในชีวิต การศึกษาเล่าเรียนดี สอบผ่านทุกอย่าง สมหวังในสิ่งที่ปรารถนา", isVideo: false },
  { number: 10, text: "ครบสิบสมบูรณ์ ชีวิตสมดุล มีทั้งงาน เงิน ความรัก และสุขภาพที่ดี", isVideo: false },
  { number: 11, text: "เลขคู่มงคล โชคดีเป็นสองเท่า มีข่าวดีเข้ามาติดๆ กัน ระวังใช้จ่ายฟุ่มเฟือย", isVideo: false },
  { number: 12, text: "ปีแห่งความสำเร็จ ทุกเดือนมีเรื่องดีเข้ามา ขอให้เชื่อมั่นในตัวเอง", isVideo: false },
  { number: 13, text: "อย่ากลัวเลข 13 เพราะเป็นตัวเลขแห่งการเปลี่ยนแปลงที่ดี ชีวิตจะดีขึ้นมาก", isVideo: false },
  { number: 14, text: "ความรักหวานชื่น คนมีคู่จะได้แต่งงาน คนโสดจะพบเนื้อคู่ มีความสุขในครอบครัว", isVideo: false },
  { number: 15, text: "กลางเดือนมงคล มีโชคลาภจากการเสี่ยงโชค ระวังสุขภาพช่วงเปลี่ยนฤดู", isVideo: false },
  { number: 16, text: "การเดินทางนำโชค อาจได้พบโอกาสใหม่ๆ ในต่างแดน การค้าขายระหว่างประเทศดี", isVideo: false },
  { number: 17, text: "ความอดทนนำพาความสำเร็จ อย่าท้อแท้ สิ่งดีๆ กำลังจะมาถึง", isVideo: false },
  { number: 18, text: "เลขมงคลแห่งความร่ำรวย การเงินคล่องตัว มีรายได้เสริมเข้ามา การลงทุนได้กำไร", isVideo: false },
  { number: 19, text: "ปีใหม่ที่สดใส อุปสรรคที่เคยมีจะหมดไป เริ่มต้นใหม่อย่างสวยงาม", isVideo: false },
  { number: 20, text: "ความสมบูรณ์พร้อม มีทั้งทรัพย์สินและชื่อเสียง ผู้คนนับถือ ครอบครัวอบอุ่น", isVideo: false },
  { number: 21, text: "บรรลุเป้าหมาย สิ่งที่วางแผนไว้จะสำเร็จ ขอให้มุ่งมั่นต่อไป", isVideo: false },
  { number: 22, text: "เลขคู่แห่งความสำเร็จ โชคดีเป็นพิเศษ มีคนคอยช่วยเหลือตลอด", isVideo: false },
  { number: 23, text: "การงานมั่นคง มีโอกาสได้ทำงานที่รัก รายได้ดี ชีวิตมีความสุข", isVideo: false },
  { number: 24, text: "ตลอดทั้งปีราบรื่น ไม่มีอุปสรรคใหญ่ ขอให้มีความสุขทุกวัน", isVideo: false },
  { number: 25, text: "ครึ่งทางแห่งความสำเร็จ ยังมีสิ่งดีๆ รออยู่ข้างหน้า อย่าหยุดพัฒนาตัวเอง", isVideo: false },
  { number: 26, text: "โชคลาภจากตัวเลข มีโอกาสได้รับรางวัล ระวังการใช้จ่ายเกินตัว", isVideo: false },
  { number: 27, text: "ใกล้ถึงความสำเร็จ อีกนิดเดียวจะสมหวัง ขอให้อดทนต่อไป", isVideo: false },
  { number: 28, text: "เลขสุดท้ายแห่งความโชคดี สิ่งดีๆ ที่สุดกำลังจะมาถึง ขอให้มีความสุขตลอดไป", isVideo: false },
]

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwR1-2m61TKFgBzuURzDR20a9lpyIVR-4b1fNFfoLSliAi8sHsEKlsqbY1PFc2Dh2dA/exec"

interface SiamseeFlowProps {
  formData: FormData
  setFormData: (data: FormData) => void
  siamseeNumber: number | null
  setSiamseeNumber: (num: number | null) => void
  onGoHome: () => void
  skipRegistration?: boolean
}

export default function SiamseeFlow({ formData, setFormData, siamseeNumber, setSiamseeNumber, onGoHome, skipRegistration = false }: SiamseeFlowProps) {
  const [step, setStep] = useState<"form" | "shake" | "result">(skipRegistration ? "shake" : "form")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Update step when skipRegistration changes
  useEffect(() => {
    if (skipRegistration) {
      setStep("shake")
    }
  }, [skipRegistration])

  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectCompany = (company: string) => {
    setFormData({ ...formData, company })
    setIsDropdownOpen(false)
    setSearchQuery("")
  }

  const handleFormSubmit = () => {
    if (!formData.company || !formData.employeeId || !formData.fullName) {
      return
    }
    setStep("shake")
  }

  const handleShake = async () => {
    if (isShaking) return
    
    setIsShaking(true)
    setVideoEnded(false)

    // Shake for 2 seconds then show result
    setTimeout(async () => {
      const randomNum = Math.floor(Math.random() * 28) + 1
      setSiamseeNumber(randomNum)
      setIsShaking(false)
      
      // Send data to Google Sheets
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company: formData.company,
            employeeId: formData.employeeId,
            fullName: formData.fullName,
            amount: formData.amount || "0",
            siamseeNum: randomNum,
            status: formData.amount ? "donation+siamsee" : "siamsee-only",
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (error) {
        console.error("Error submitting to Google Sheets:", error)
      }
      
      setTimeout(() => setStep("result"), 300)
    }, 2000)
  }

  const handleRetry = () => {
    setSiamseeNumber(null)
    setVideoEnded(false)
    setStep("shake")
  }

  const handleVideoEnded = () => {
    setVideoEnded(true)
  }

  const handleSaveImage = useCallback(async () => {
    if (!resultRef.current) return

    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      })
      
      const link = document.createElement("a")
      link.download = `siamsee-${siamseeNumber}-com7-2569.png`
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error("Error saving image:", error)
    }
  }, [siamseeNumber])

  const currentPrediction = siamseeNumber ? predictions[siamseeNumber - 1] : null
  const isFormValid = formData.company && formData.employeeId && formData.fullName

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {/* Step 1: Registration Form */}
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/50"
          >
            <button
              onClick={onGoHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>กลับหน้าหลัก</span>
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              เซียมซีออนไลน์
            </h2>
            <p className="text-center text-gray-600 mb-6">กรอกข้อมูลเพื่อเสี่ยงทายเซียมซี</p>

            <div className="space-y-5">
              {/* Company Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  บริษัท <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 text-left bg-white border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-[#D4AF37] transition-colors"
                  >
                    <span className={formData.company ? "text-gray-900" : "text-gray-400"}>
                      {formData.company || "เลือกบริษัท"}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl overflow-hidden"
                      >
                        <div className="p-3 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="ค้นหาบริษัท..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        <div className="max-h-48 overflow-y-auto">
                          {filteredCompanies.map((company, index) => (
                            <button
                              key={index}
                              onClick={() => handleSelectCompany(company)}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-[#E0F2FE] flex items-center justify-between transition-colors"
                            >
                              <span className="text-gray-900">{company}</span>
                              {formData.company === company && (
                                <Check className="w-4 h-4 text-[#D4AF37]" />
                              )}
                            </button>
                          ))}
                          {filteredCompanies.length === 0 && (
                            <p className="px-4 py-3 text-sm text-gray-500">ไม่พบบริษัทที่ค้นหา</p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Employee ID */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  รหัสพนักงาน <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="กรอกรหัสพนักงาน"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="py-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                />
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="กรอกชื่อ-นามสกุล"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="py-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                />
              </div>

              {/* Submit Button */}
              <AnimatePresence>
                {isFormValid && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <Button
                      onClick={handleFormSubmit}
                      className="w-full py-6 text-lg font-bold rounded-xl text-white"
                      style={{
                        background: "linear-gradient(135deg, #FF8C00 0%, #FF6B00 50%, #E65100 100%)",
                      }}
                    >
                      เสี่ยงทายเซียมซี
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Step 2: Shake Animation */}
        {step === "shake" && (
          <motion.div
            key="shake"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/50"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              เสี่ยงทายเซียมซี
            </h2>
            <p className="text-center text-gray-600 mb-8">
              คลิกที่กระบอกไม้ไผ่เพื่อเสี่ยงทาย
            </p>

            {/* Bamboo Stick Cylinder */}
            <div className="flex justify-center mb-8">
              <motion.div
                className="cursor-pointer"
                animate={isShaking ? {
                  rotate: [-15, 15, -15, 15, -10, 10, -5, 5, 0],
                  x: [-8, 8, -8, 8, -5, 5, -2, 2, 0],
                } : {}}
                transition={{
                  duration: 0.5,
                  repeat: isShaking ? 4 : 0,
                }}
                onClick={handleShake}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative">
                  {/* 3D-like Bamboo cylinder */}
                  <svg width="140" height="220" viewBox="0 0 140 220">
                    {/* Shadow */}
                    <ellipse cx="70" cy="210" rx="55" ry="10" fill="rgba(0,0,0,0.2)" />
                    
                    {/* Cylinder body */}
                    <ellipse cx="70" cy="200" rx="55" ry="18" fill="#7A5D3A" />
                    <rect x="15" y="45" width="110" height="155" fill="url(#bamboo3DGradient)" />
                    <ellipse cx="70" cy="45" rx="55" ry="18" fill="#A68B5B" />
                    
                    {/* Inner hole */}
                    <ellipse cx="70" cy="45" rx="40" ry="12" fill="#5C4033" />
                    
                    {/* Bamboo texture lines */}
                    <line x1="30" y1="45" x2="30" y2="200" stroke="#6B4E35" strokeWidth="1.5" opacity="0.6" />
                    <line x1="50" y1="45" x2="50" y2="200" stroke="#6B4E35" strokeWidth="1.5" opacity="0.6" />
                    <line x1="70" y1="45" x2="70" y2="200" stroke="#6B4E35" strokeWidth="1.5" opacity="0.6" />
                    <line x1="90" y1="45" x2="90" y2="200" stroke="#6B4E35" strokeWidth="1.5" opacity="0.6" />
                    <line x1="110" y1="45" x2="110" y2="200" stroke="#6B4E35" strokeWidth="1.5" opacity="0.6" />
                    
                    {/* Horizontal rings */}
                    <ellipse cx="70" cy="80" rx="55" ry="10" fill="none" stroke="#8B7355" strokeWidth="3" opacity="0.7" />
                    <ellipse cx="70" cy="130" rx="55" ry="10" fill="none" stroke="#8B7355" strokeWidth="3" opacity="0.7" />
                    <ellipse cx="70" cy="170" rx="55" ry="10" fill="none" stroke="#8B7355" strokeWidth="3" opacity="0.7" />
                    
                    {/* Sticks peeking out with red tips */}
                    <rect x="45" y="10" width="5" height="50" fill="#D4AF37" rx="2" />
                    <rect x="45" y="10" width="5" height="8" fill="#C41E3A" rx="2" />
                    
                    <rect x="55" y="5" width="5" height="55" fill="#e8d48a" rx="2" />
                    <rect x="55" y="5" width="5" height="8" fill="#C41E3A" rx="2" />
                    
                    <rect x="65" y="8" width="5" height="52" fill="#D4AF37" rx="2" />
                    <rect x="65" y="8" width="5" height="8" fill="#C41E3A" rx="2" />
                    
                    <rect x="75" y="12" width="5" height="48" fill="#e8d48a" rx="2" />
                    <rect x="75" y="12" width="5" height="8" fill="#C41E3A" rx="2" />
                    
                    <rect x="85" y="6" width="5" height="54" fill="#D4AF37" rx="2" />
                    <rect x="85" y="6" width="5" height="8" fill="#C41E3A" rx="2" />
                    
                    <defs>
                      <linearGradient id="bamboo3DGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6B4E35" />
                        <stop offset="25%" stopColor="#8B7355" />
                        <stop offset="50%" stopColor="#A68B5B" />
                        <stop offset="75%" stopColor="#8B7355" />
                        <stop offset="100%" stopColor="#6B4E35" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Sparkle effect when shaking */}
                  <AnimatePresence>
                    {isShaking && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-3 h-3 bg-[#D4AF37] rounded-full"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                              x: (Math.random() - 0.5) * 120,
                              y: (Math.random() - 0.5) * 120,
                            }}
                            style={{
                              top: "50%",
                              left: "50%",
                            }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Loading State */}
            <AnimatePresence>
              {isShaking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center mb-6"
                >
                  <p className="text-[#D4AF37] font-semibold text-lg animate-pulse">กำลังเสี่ยงทาย...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {!isShaking && (
              <p className="text-center text-gray-500 text-sm">คลิกที่กระบอกเพื่อเริ่มเสี่ยงทาย</p>
            )}

            <Button
              onClick={onGoHome}
              variant="ghost"
              className="w-full mt-6 py-4 text-gray-600 hover:text-gray-900"
            >
              กลับหน้าหลัก
            </Button>
          </motion.div>
        )}

        {/* Step 3: Result */}
        {step === "result" && currentPrediction && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/50"
          >
            {/* Video for stick #1 - shown above the prediction card */}
            {currentPrediction.number === 1 && currentPrediction.isVideo && (
              <div className="mb-6">
                <video
                  ref={videoRef}
                  src="https://drive.google.com/uc?export=download&id=1uaNwvKmp8Z2EHQv8YjLSTvCfPrTJnLUj"
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  className="rounded-xl w-full max-h-56 object-cover shadow-lg"
                />
              </div>
            )}

            {/* Prediction Card - Only this part will be saved as image */}
            <div ref={resultRef} className="bg-gradient-to-br from-[#FFF8E7] to-[#FFF3D6] rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white rounded-full text-3xl font-bold mb-4 shadow-lg">
                  {currentPrediction.number}
                </div>
                <h3 className="text-xl font-bold text-[#D4AF37] mb-3">
                  เซียมซี หมายเลข {currentPrediction.number}
                </h3>
                <p className="text-gray-800 leading-relaxed text-lg">
                  {currentPrediction.text}
                </p>
                
                {/* Footer for saved image */}
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/30">
                  <p className="text-sm text-[#8B6914] font-medium">
                    COM7 สงกรานต์ชื่นบุญ 2569
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleSaveImage}
                className="w-full py-5 text-lg font-bold rounded-xl text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #FF8C00 0%, #FF6B00 50%, #E65100 100%)",
                }}
              >
                <Download className="w-5 h-5" />
                ดาวน์โหลดคำทำนาย
              </Button>
              
              <Button
                onClick={handleRetry}
                variant="outline"
                className="w-full py-5 text-lg font-bold rounded-xl border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#FFF8E7] flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                เสี่ยงทายอีกครั้ง
              </Button>

              <Button
                onClick={onGoHome}
                variant="ghost"
                className="w-full py-4 text-gray-600 hover:text-gray-900"
              >
                กลับหน้าหลัก
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
