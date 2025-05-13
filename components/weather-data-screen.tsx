"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"

export default function WeatherDataScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-800 shadow-md">
        <div className="flex items-center">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-6 h-6 text-slate-50" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-50">Weather Data</h1>
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#0EA5E9]">N</span>
        </div>
      </div>

      {/* Badge */}
      <div className="px-4 py-2">
        <Badge className="bg-[#0EA5E9] text-white font-medium ml-auto block">Data from Copernicus-ESA</Badge>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-4">
        {/* Temperature Card */}
        <Card className="w-full overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 text-slate-900">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Temperature Trends - Rome</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-3xl font-bold mb-4">23.4°C</div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Daily Trend</h4>
              <div className="h-48">
                <LineChart
                  data={[
                    { time: "00:00", value: 18.5 },
                    { time: "03:00", value: 17.1 },
                    { time: "05:00", value: 16.2 },
                    { time: "07:00", value: 18.7 },
                    { time: "09:00", value: 21.5 },
                    { time: "11:00", value: 24.9 },
                    { time: "13:00", value: 27.2 },
                    { time: "14:00", value: 27.8 },
                    { time: "16:00", value: 26.5 },
                    { time: "18:00", value: 24.1 },
                    { time: "20:00", value: 21.8 },
                    { time: "22:00", value: 19.7 },
                  ]}
                  xKey="time"
                  yKey="value"
                  color="#0EA5E9"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Monthly Average</h4>
              <div className="h-32">
                <BarChart
                  data={[
                    { month: "Jan", value: 8.5 },
                    { month: "Feb", value: 9.7 },
                    { month: "Mar", value: 12.3 },
                    { month: "Apr", value: 16.1 },
                    { month: "May", value: 21.5 },
                    { month: "Jun", value: 25.3 },
                    { month: "Jul", value: 28.1 },
                    { month: "Aug", value: 27.9 },
                    { month: "Sep", value: 24.2 },
                    { month: "Oct", value: 19.7 },
                    { month: "Nov", value: 14.2 },
                    { month: "Dec", value: 9.8 },
                  ]}
                  xKey="month"
                  yKey="value"
                  color="#0EA5E9"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solar Radiation Card */}
        <Card className="w-full overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 text-slate-900">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Solar Radiation Intensity</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-3xl font-bold mb-4">874 W/m²</div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Daily Curve</h4>
              <div className="h-48">
                <LineChart
                  data={[
                    { time: "00:00", value: 0 },
                    { time: "05:00", value: 0 },
                    { time: "06:00", value: 50 },
                    { time: "08:00", value: 320 },
                    { time: "10:00", value: 780 },
                    { time: "12:00", value: 950 },
                    { time: "14:00", value: 920 },
                    { time: "16:00", value: 650 },
                    { time: "18:00", value: 280 },
                    { time: "20:00", value: 40 },
                    { time: "21:00", value: 0 },
                    { time: "23:00", value: 0 },
                  ]}
                  xKey="time"
                  yKey="value"
                  color="#F59E0B"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Monthly Average (MJ/m²)</h4>
              <div className="h-32">
                <BarChart
                  data={[
                    { month: "Jan", value: 2.0 },
                    { month: "Feb", value: 2.8 },
                    { month: "Mar", value: 4.2 },
                    { month: "Apr", value: 5.5 },
                    { month: "May", value: 6.7 },
                    { month: "Jun", value: 7.5 },
                    { month: "Jul", value: 8.0 },
                    { month: "Aug", value: 7.3 },
                    { month: "Sep", value: 5.8 },
                    { month: "Oct", value: 4.0 },
                    { month: "Nov", value: 2.7 },
                    { month: "Dec", value: 1.8 },
                  ]}
                  xKey="month"
                  yKey="value"
                  color="#F59E0B"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wind Speed Card */}
        <Card className="w-full overflow-hidden bg-gradient-to-r from-teal-50 to-teal-100 text-slate-900">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Wind Speed Conditions</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl font-bold">4.3 m/s</div>
              <div className="flex items-center gap-1 bg-slate-200 px-2 py-1 rounded-md">
                <span className="font-medium">NW</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 15L12 8L19 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Hourly Pattern</h4>
              <div className="h-48">
                <LineChart
                  data={[
                    { time: "00:00", value: 2.5 },
                    { time: "03:00", value: 2.1 },
                    { time: "06:00", value: 3.2 },
                    { time: "09:00", value: 4.7 },
                    { time: "12:00", value: 5.8 },
                    { time: "15:00", value: 5.2 },
                    { time: "18:00", value: 4.1 },
                    { time: "21:00", value: 3.3 },
                  ]}
                  xKey="time"
                  yKey="value"
                  color="#10B981"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Weekly Pattern</h4>
              <div className="h-32">
                <BarChart
                  data={[
                    { day: "Mon", value: 3.8 },
                    { day: "Tue", value: 4.2 },
                    { day: "Wed", value: 4.3 },
                    { day: "Thu", value: 3.9 },
                    { day: "Fri", value: 4.5 },
                    { day: "Sat", value: 5.1 },
                    { day: "Sun", value: 4.7 },
                  ]}
                  xKey="day"
                  yKey="value"
                  color="#10B981"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-auto px-4 pt-4 flex flex-col items-center">
        <div className="text-sm text-slate-400 mb-3">Last updated: May 13, 2025 - 14:32</div>
        <Button
          onClick={handleRefresh}
          className="w-full bg-[#0EA5E9] hover:bg-sky-600 text-white"
          disabled={isRefreshing}
        >
          {isRefreshing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh Data
        </Button>
      </div>
    </div>
  )
}
