"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, ChevronDown, Check, Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
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

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwR1-2m61TKFgBzuURzDR20a9lpyIVR-4b1fNFfoLSliAi8sHsEKlsqbY1PFc2Dh2dA/exec"

interface DonationFlowProps {
  formData: FormData
  setFormData: (data: FormData) => void
  onGoHome: () => void
  onGoToSiamsee: () => void
}

export default function DonationFlow({ formData, setFormData, onGoHome, onGoToSiamsee }: DonationFlowProps) {
  const [step, setStep] = useState<"form" | "loading" | "confirm">("form")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [slipPreview, setSlipPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectCompany = (company: string) => {
    setFormData({ ...formData, company })
    setIsDropdownOpen(false)
    setSearchQuery("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, slipFile: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setSlipPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveFile = () => {
    setFormData({ ...formData, slipFile: null })
    setSlipPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async () => {
    if (!formData.company || !formData.employeeId || !formData.fullName || !formData.amount) {
      return
    }
    
    setStep("loading")
    
    try {
      // Convert file to base64 if exists
      let slipBase64 = ""
      if (formData.slipFile) {
        const reader = new FileReader()
        slipBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(formData.slipFile as File)
        })
      }

      // Send data to Google Sheets
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
          amount: formData.amount,
          slipImage: slipBase64,
          siamseeNum: "",
          status: "donation",
          timestamp: new Date().toISOString(),
        }),
      })

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error)
    }
    
    setStep("confirm")
  }

  const handleConfirmYes = () => {
    onGoToSiamsee()
  }

  const handleConfirmNo = () => {
    onGoHome()
  }

  const isFormValid = formData.company && formData.employeeId && formData.fullName && formData.amount

  // Generate short company name for summary
  const getShortCompanyName = (company: string) => {
    if (!company) return ""
    // Extract company name without prefix/suffix
    const match = company.match(/บริษัท (.+?) จำกัด/)
    return match ? match[1] : company
  }

  return (
    <div className="max-w-lg mx-auto">
      <AnimatePresence mode="wait">
        {/* Single Card Form with QR + Inputs + Summary + Slip Upload */}
        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/85 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-2xl border border-white/50"
          >
            {/* Return to Home - Small button at top left */}
            <button
              onClick={onGoHome}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </button>

            {/* QR Code Section at Top */}
            <div className="flex justify-center mb-5">
              <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
                <Image
                  src="/images/donation-qr.jpg"
                  alt="QR Code สำหรับบริจาค"
                  width={200}
                  height={200}
                  className="w-48 h-48 md:w-56 md:h-56 object-contain"
                />
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 mb-5">
              สแกน QR Code เพื่อโอนเงินบริจาค
            </p>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Company Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  บริษัท <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 text-left bg-white border-2 border-gray-200 rounded-xl flex items-center justify-between hover:border-[#D4AF37] focus:border-[#D4AF37] focus:outline-none transition-colors"
                  >
                    <span className={formData.company ? "text-gray-900 text-sm" : "text-gray-400 text-sm"}>
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
                        {/* Search Input */}
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

                        {/* Company List */}
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
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  รหัสพนักงาน <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="กรอกรหัสพนักงาน"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  className="py-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-0 focus:ring-offset-0 text-sm"
                />
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  ชื่อ-นามสกุล <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="กรอกชื่อ-นามสกุล"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="py-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-0 focus:ring-offset-0 text-sm"
                />
              </div>

              {/* Donation Amount */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  จำนวนเงินบริจาค (บาท) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="กรอกจำนวนเงิน"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="py-3 border-2 border-gray-200 rounded-xl focus:border-[#D4AF37] focus:ring-0 focus:ring-offset-0 text-sm"
                />
              </div>

              {/* Dynamic Summary */}
              <AnimatePresence>
                {(formData.company || formData.employeeId || formData.amount) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-[#FFF8E7] to-[#FFF3D6] rounded-xl p-4 border border-[#D4AF37]/30">
                      <p className="text-sm text-[#8B6914] font-medium">
                        สรุป: {formData.company ? getShortCompanyName(formData.company) : "..."}, 
                        รหัส {formData.employeeId || "..."}, 
                        จำนวน {formData.amount ? `${Number(formData.amount).toLocaleString()} บาท` : "..."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Slip Upload */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  แนบสลิปการโอนเงิน
                </label>
                
                {slipPreview ? (
                  <div className="relative">
                    <img
                      src={slipPreview}
                      alt="Slip preview"
                      className="w-full h-32 object-contain bg-gray-50 rounded-xl border-2 border-gray-200"
                    />
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-[#D4AF37] hover:bg-[#FFF8E7]/30 transition-all"
                  >
                    <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1.5" />
                    <p className="text-sm text-gray-500">คลิกเพื่ออัปโหลดสลิป</p>
                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG (สูงสุด 5MB)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full py-5 text-base font-bold rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                style={{
                  background: isFormValid 
                    ? "linear-gradient(135deg, #FF8C00 0%, #FF6B00 50%, #E65100 100%)"
                    : "linear-gradient(135deg, #ccc 0%, #aaa 100%)",
                }}
              >
                ส่งข้อมูลและอนุโมทนาบุญ
              </Button>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {step === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl text-center border border-white/50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6"
            >
              <Loader2 className="w-16 h-16 text-[#D4AF37]" />
            </motion.div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              กำลังบันทึกข้อมูลบุญ...
            </h2>
            <p className="text-gray-600 text-sm">
              กรุณารอสักครู่
            </p>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Confirmation Dialog */}
        {step === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl text-center border border-white/50"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Check className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              อนุโมทนาบุญ
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              ขอบคุณที่ร่วมทำบุญกับ COM7
            </p>

            <div className="bg-[#FFF8E7] border-2 border-[#D4AF37] rounded-xl p-5 mb-6">
              <p className="text-base font-medium text-gray-900">
                ท่านต้องการเสี่ยงทายเซียมซีต่อหรือไม่?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleConfirmYes}
                className="flex-1 py-4 text-base font-bold rounded-xl text-white"
                style={{
                  background: "linear-gradient(135deg, #FF8C00 0%, #FF6B00 50%, #E65100 100%)",
                }}
              >
                ใช่ เสี่ยงทายเซียมซี
              </Button>
              <Button
                onClick={handleConfirmNo}
                variant="outline"
                className="flex-1 py-4 text-base font-bold rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                ไม่ กลับหน้าหลัก
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
