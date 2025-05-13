"use client"

import Link from "next/link"
import { QrCode, Cloud, Users, BarChart3 } from "lucide-react"

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full px-6 py-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="mt-6 mb-4">
        <QrCode className="w-32 h-32 text-slate-50" />
      </div>

      <h1 className="text-[28px] font-bold text-[#F8FAFC] text-center mb-2">WELCOME TO NEXUS ENERGY HUB</h1>

      <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] flex items-center justify-center mb-4">
        <span className="text-[#F8FAFC] text-6xl font-bold">N</span>
      </div>

      <p className="text-[16px] font-normal text-[#F8FAFC] tracking-[1.5px] text-center mb-8">
        Accelerating Renewable Energy Communities through Space Data
      </p>

      <div className="flex flex-col items-center w-full gap-4 mb-8">
        <Link
          href="/weather-data"
          className="flex items-center justify-center h-16 w-[85%] bg-[#0EA5E9] rounded-xl shadow-md hover:bg-sky-600 transition-colors"
        >
          <Cloud className="w-5 h-5 mr-2 text-[#F8FAFC]" />
          <span className="text-[18px] font-semibold text-[#F8FAFC]">Weather Data</span>
        </Link>

        <Link
          href="/create-community"
          className="flex items-center justify-center h-16 w-[85%] bg-[#10B981] rounded-xl shadow-md hover:bg-emerald-600 transition-colors"
        >
          <Users className="w-5 h-5 mr-2 text-[#F8FAFC]" />
          <span className="text-[18px] font-semibold text-[#F8FAFC]">Create Community</span>
        </Link>

        <Link
          href="/monitor-community"
          className="flex items-center justify-center h-16 w-[85%] bg-[#F59E0B] rounded-xl shadow-md hover:bg-amber-600 transition-colors"
        >
          <BarChart3 className="w-5 h-5 mr-2 text-[#F8FAFC]" />
          <span className="text-[18px] font-semibold text-[#F8FAFC]">Monitor Community</span>
        </Link>
      </div>

      <div className="mt-auto pb-6">
        <p className="text-[14px] text-[#94A3B8]">Powered by Copernicus-ESA data</p>
      </div>
    </div>
  )
}
