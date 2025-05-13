"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Download,
  Settings,
  Building,
  School,
  Hospital,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { EnergyFlowDiagram } from "@/components/charts/energy-flow-diagram"

export default function MonitorCommunityScreen() {
  const [activeTab, setActiveTab] = useState("daily")
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
          <h1 className="text-xl font-semibold text-slate-50">Community Monitoring</h1>
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#F59E0B]">N</span>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-slate-700">
        <div className="text-sm text-slate-300">May 13, 2025 - 14:32</div>
        <Badge className="bg-green-500 text-white">Operational</Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3">
            <h3 className="text-xs text-slate-400">Energy production</h3>
            <p className="text-lg font-semibold text-slate-50">12,460 kWh</p>
            <div className="h-10 mt-1">
              <LineChart
                data={[
                  { time: "00:00", value: 180 },
                  { time: "04:00", value: 150 },
                  { time: "08:00", value: 320 },
                  { time: "12:00", value: 580 },
                  { time: "16:00", value: 420 },
                  { time: "20:00", value: 280 },
                  { time: "23:00", value: 210 },
                ]}
                xKey="time"
                yKey="value"
                color="#10B981"
                hideAxis={true}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3">
            <h3 className="text-xs text-slate-400">Self-consumption</h3>
            <p className="text-lg font-semibold text-slate-50">82%</p>
            <div className="mt-2">
              <Progress value={82} className="h-2 bg-slate-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3">
            <h3 className="text-xs text-slate-400">Grid exchange</h3>
            <p className="text-lg font-semibold text-green-500">-240 kWh</p>
            <p className="text-xs text-slate-400">Export to grid</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3">
            <h3 className="text-xs text-slate-400">CO₂ avoided</h3>
            <p className="text-lg font-semibold text-slate-50">1.72 tonnes</p>
            <div className="flex items-center text-xs text-green-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 15L12 8L19 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>12% vs. last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Flow Diagram */}
      <div className="p-4">
        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-slate-50 mb-3">Real-time energy flow</h3>
            <div className="h-64">
              <EnergyFlowDiagram />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Component Status */}
      <div className="px-4">
        <h3 className="text-sm font-medium text-slate-50 mb-2">System component status</h3>

        <div className="space-y-3">
          {/* CHP Unit */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-slate-50">CHP Unit</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                    <div>
                      <p className="text-xs text-slate-400">Electrical output</p>
                      <p className="text-sm text-slate-50">185 kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Thermal output</p>
                      <p className="text-sm text-slate-50">296 kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Efficiency</p>
                      <p className="text-sm text-slate-50">87%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Operating hours</p>
                      <p className="text-sm text-slate-50">3,245 h</p>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">Normal</Badge>
              </div>
            </CardContent>
          </Card>

          {/* PV System */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-slate-50">PV System</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                    <div>
                      <p className="text-xs text-slate-400">Current output</p>
                      <p className="text-sm text-slate-50">143 kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Performance ratio</p>
                      <p className="text-sm text-slate-50">82%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Daily yield</p>
                      <p className="text-sm text-slate-50">4.7 kWh/kWp</p>
                    </div>
                  </div>
                  <div className="mt-1">
                    <p className="text-xs text-amber-400 flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Panel section A3 showing 12% reduced output
                    </p>
                  </div>
                </div>
                <Badge className="bg-amber-500 text-white">Warning</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Battery Storage */}
          <Card className="bg-slate-700 border-slate-600">
            <CardContent className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium text-slate-50">Battery Storage</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                    <div>
                      <p className="text-xs text-slate-400">State of charge</p>
                      <p className="text-sm text-slate-50">74%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Charge rate</p>
                      <p className="text-sm text-green-500">+24 kW</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Cycles completed</p>
                      <p className="text-sm text-slate-50">347</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Expected lifetime</p>
                      <p className="text-sm text-slate-50">92%</p>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">Normal</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-slate-50 mb-2">Alerts and notifications</h3>

        <Card className="bg-slate-700 border-slate-600 mb-3">
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-slate-50">PV panel section A3 showing 12% reduced output</h4>
                <p className="text-xs text-slate-400">Maintenance recommended</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs border-slate-600 text-slate-300">
                    Dismiss
                  </Button>
                  <Button size="sm" className="h-7 px-2 text-xs bg-amber-500 hover:bg-amber-600 text-white">
                    Schedule maintenance
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3 space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <h4 className="text-sm text-slate-300">Inverter efficiency drop - Resolved (May 11)</h4>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <h4 className="text-sm text-slate-300">Grid export limit reached - Automatically adjusted (May 10)</h4>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <h4 className="text-sm text-slate-300">Maintenance completed - CHP oil change (May 7)</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-slate-50">Performance metrics</h3>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="h-7 bg-slate-700">
              <TabsTrigger value="daily" className="h-5 px-2 text-xs">
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" className="h-5 px-2 text-xs">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="h-5 px-2 text-xs">
                Monthly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card className="bg-slate-700 border-slate-600 mb-3">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-slate-50">Daily savings</h4>
              <span className="text-lg font-semibold text-green-500">€247.80</span>
            </div>
            <div className="h-40">
              <BarChart
                data={[
                  { hour: "00:00", production: 180, consumption: 210 },
                  { hour: "03:00", production: 150, consumption: 190 },
                  { hour: "06:00", production: 210, consumption: 180 },
                  { hour: "09:00", production: 380, consumption: 320 },
                  { hour: "12:00", production: 580, consumption: 410 },
                  { hour: "15:00", production: 480, consumption: 390 },
                  { hour: "18:00", production: 320, consumption: 350 },
                  { hour: "21:00", production: 240, consumption: 280 },
                ]}
                xKey="hour"
                yKey={["production", "consumption"]}
                color={["#10B981", "#0EA5E9"]}
                stacked={false}
                showLegend={true}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-slate-50">CO₂ reduction progress</h4>
              <span className="text-sm text-slate-300">68.2% of annual target</span>
            </div>
            <Progress value={68.2} className="h-2 bg-slate-600" />
          </CardContent>
        </Card>
      </div>

      {/* Member Contribution */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-slate-50 mb-2">Member contribution</h3>

        <Card className="bg-slate-700 border-slate-600">
          <CardContent className="p-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#0EA5E9]" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-slate-50">Lazio Innova</h4>
                    <span className="text-sm text-slate-300">42%</span>
                  </div>
                  <Progress value={42} className="h-1.5 bg-slate-600" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-[#10B981]" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-slate-50">I.C. Parco della Vittoria</h4>
                    <span className="text-sm text-slate-300">18%</span>
                  </div>
                  <Progress value={18} className="h-1.5 bg-slate-600" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Hospital className="w-5 h-5 text-[#F59E0B]" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-slate-50">Ospedale Sant'Eugenio</h4>
                    <span className="text-sm text-slate-300">40%</span>
                  </div>
                  <Progress value={40} className="h-1.5 bg-slate-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Controls */}
      <div className="mt-auto px-4 pt-4 flex justify-between">
        <Button
          onClick={handleRefresh}
          variant="outline"
          className="border-slate-600 text-slate-300"
          disabled={isRefreshing}
        >
          {isRefreshing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10 border-slate-600">
            <Download className="h-4 w-4 text-slate-300" />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 border-slate-600">
            <Settings className="h-4 w-4 text-slate-300" />
          </Button>
        </div>
      </div>
    </div>
  )
}
