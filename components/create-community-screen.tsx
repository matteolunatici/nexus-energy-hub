"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Building, School, Hospital } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { EnergyFlowDiagram } from "@/components/charts/energy-flow-diagram"
import { MapView } from "@/components/map-view"

export default function CreateCommunityScreen() {
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(62)
  const [budget, setBudget] = useState(1500000)
  const [surfaceArea, setSurfaceArea] = useState(3000)
  const [selfSufficiency, setSelfSufficiency] = useState(70)
  const [useBenchmark, setUseBenchmark] = useState(true)
  const [selectedMembers, setSelectedMembers] = useState([true, false, false])

  const totalSteps = 6

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleMember = (index: number) => {
    const newSelectedMembers = [...selectedMembers]
    newSelectedMembers[index] = !newSelectedMembers[index]
    setSelectedMembers(newSelectedMembers)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 pb-6">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-800 shadow-md">
        <div className="flex items-center">
          <Link href="/" className="mr-3">
            <ArrowLeft className="w-6 h-6 text-slate-50" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-50">Create Community</h1>
        </div>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#10B981]">N</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-3">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2 bg-slate-700" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-50">Who are you?</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  defaultValue="Lazio Innova Headquarters, Tecnopolo - Via Giacomo Peroni 442/444, Rome"
                  className="bg-slate-700 border-slate-600 text-slate-50"
                />
              </div>

              <div>
                <Label htmlFor="org-type">Organization type</Label>
                <Select defaultValue="innovation-hub">
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-50">
                    <SelectValue placeholder="Select organization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="innovation-hub">Innovation Hub</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="public">Public Institution</SelectItem>
                    <SelectItem value="educational">Educational Institution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contact">Contact Email</Label>
                <Input
                  id="contact"
                  defaultValue="info@lazioinnova.it"
                  className="bg-slate-700 border-slate-600 text-slate-50"
                />
              </div>

              <div>
                <Label htmlFor="building-size">Building size</Label>
                <Input
                  id="building-size"
                  defaultValue="4,200 m²"
                  className="bg-slate-700 border-slate-600 text-slate-50"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-50">Energy Consumption Data</h2>

            <div className="flex items-center justify-between">
              <Label htmlFor="benchmark-switch">Use benchmark data</Label>
              <Switch id="benchmark-switch" checked={useBenchmark} onCheckedChange={setUseBenchmark} />
            </div>

            {useBenchmark && (
              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-300">Electricity</h3>
                    <p className="text-lg font-semibold text-slate-50">732,400 kWh/year (174.4 kWh/m²)</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-300">Heating</h3>
                    <p className="text-lg font-semibold text-slate-50">604,800 kWh/year (144 kWh/m²)</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-slate-300">Cooling</h3>
                    <p className="text-lg font-semibold text-slate-50">327,600 kWh/year (78 kWh/m²)</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-2">Monthly Distribution</h3>
              <div className="h-64 bg-slate-700 rounded-lg p-4">
                <BarChart
                  data={[
                    { month: "Jan", electricity: 68, heating: 95, cooling: 10 },
                    { month: "Feb", electricity: 65, heating: 90, cooling: 12 },
                    { month: "Mar", electricity: 62, heating: 70, cooling: 18 },
                    { month: "Apr", electricity: 60, heating: 45, cooling: 25 },
                    { month: "May", electricity: 65, heating: 20, cooling: 35 },
                    { month: "Jun", electricity: 72, heating: 5, cooling: 45 },
                    { month: "Jul", electricity: 78, heating: 0, cooling: 50 },
                    { month: "Aug", electricity: 80, heating: 0, cooling: 48 },
                    { month: "Sep", electricity: 70, heating: 10, cooling: 40 },
                    { month: "Oct", electricity: 65, heating: 30, cooling: 25 },
                    { month: "Nov", electricity: 68, heating: 60, cooling: 15 },
                    { month: "Dec", electricity: 70, heating: 85, cooling: 10 },
                  ]}
                  xKey="month"
                  yKey={["electricity", "heating", "cooling"]}
                  color={["#0EA5E9", "#F43F5E", "#10B981"]}
                  stacked={false}
                  showLegend={true}
                />
              </div>
            </div>

            <div>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300" disabled={!useBenchmark}>
                Upload Energy Bill
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-50">Find potential community members nearby</h2>

            <div className="h-64 bg-slate-700 rounded-lg overflow-hidden">
              <MapView
                center={[41.9028, 12.4964]}
                zoom={13}
                markers={[
                  { id: 1, lat: 41.9028, lng: 12.4964, name: "Lazio Innova", type: "current" },
                  { id: 2, lat: 41.9128, lng: 12.5064, name: "I.C. Parco della Vittoria", type: "school" },
                  { id: 3, lat: 41.8928, lng: 12.5164, name: "Ospedale Sant'Eugenio", type: "hospital" },
                ]}
              />
            </div>

            <div className="space-y-4">
              {/* Lazio Innova */}
              <Card
                className={`border-l-4 ${selectedMembers[0] ? "border-l-[#0EA5E9]" : "border-l-slate-600"} bg-slate-700 border-slate-600`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Building className="w-6 h-6 text-[#0EA5E9] mt-1" />
                      <div>
                        <h3 className="font-semibold text-slate-50">LAZIO INNOVA (YOUR LOCATION)</h3>
                        <p className="text-sm text-slate-300">Peak power: 300 kW</p>

                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-slate-400">Electricity profile</h4>
                          <div className="h-20 mt-1">
                            <LineChart
                              data={[
                                { time: "00:00", value: 45 },
                                { time: "04:00", value: 45 },
                                { time: "08:00", value: 120 },
                                { time: "10:00", value: 240 },
                                { time: "13:00", value: 275 },
                                { time: "16:00", value: 150 },
                                { time: "19:00", value: 45 },
                                { time: "23:00", value: 45 },
                              ]}
                              xKey="time"
                              yKey="value"
                              color="#0EA5E9"
                              hideAxis={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Checkbox checked={selectedMembers[0]} onCheckedChange={() => toggleMember(0)} className="mt-1" />
                  </div>
                </CardContent>
              </Card>

              {/* School */}
              <Card
                className={`border-l-4 ${selectedMembers[1] ? "border-l-[#10B981]" : "border-l-slate-600"} bg-slate-700 border-slate-600`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <School className="w-6 h-6 text-[#10B981] mt-1" />
                      <div>
                        <h3 className="font-semibold text-slate-50">LOCAL SCHOOL (1.2 KM AWAY)</h3>
                        <p className="text-sm text-slate-300">I.C. Parco della Vittoria</p>
                        <p className="text-sm text-slate-300">Via Vittoria 34, Rome</p>
                        <p className="text-sm text-slate-300">Peak power: 80 kW</p>

                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-slate-400">Electricity profile</h4>
                          <div className="h-20 mt-1">
                            <LineChart
                              data={[
                                { time: "00:00", value: 15 },
                                { time: "06:00", value: 15 },
                                { time: "08:00", value: 60 },
                                { time: "12:00", value: 75 },
                                { time: "14:00", value: 55 },
                                { time: "17:00", value: 40 },
                                { time: "19:00", value: 15 },
                                { time: "23:00", value: 15 },
                              ]}
                              xKey="time"
                              yKey="value"
                              color="#10B981"
                              hideAxis={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Checkbox checked={selectedMembers[1]} onCheckedChange={() => toggleMember(1)} className="mt-1" />
                  </div>
                </CardContent>
              </Card>

              {/* Hospital */}
              <Card
                className={`border-l-4 ${selectedMembers[2] ? "border-l-[#F59E0B]" : "border-l-slate-600"} bg-slate-700 border-slate-600`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Hospital className="w-6 h-6 text-[#F59E0B] mt-1" />
                      <div>
                        <h3 className="font-semibold text-slate-50">HOSPITAL (3.5 KM AWAY)</h3>
                        <p className="text-sm text-slate-300">Ospedale Sant'Eugenio</p>
                        <p className="text-sm text-slate-300">Piazzale dell'Umanesimo 10, Rome</p>
                        <p className="text-sm text-slate-300">Peak power: 2 MW (2,000 kW)</p>

                        <div className="mt-2">
                          <h4 className="text-xs font-medium text-slate-400">Electricity profile</h4>
                          <div className="h-20 mt-1">
                            <LineChart
                              data={[
                                { time: "00:00", value: 850 },
                                { time: "04:00", value: 800 },
                                { time: "08:00", value: 1200 },
                                { time: "12:00", value: 1800 },
                                { time: "16:00", value: 1500 },
                                { time: "20:00", value: 1100 },
                                { time: "23:00", value: 900 },
                              ]}
                              xKey="time"
                              yKey="value"
                              color="#F59E0B"
                              hideAxis={true}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Checkbox checked={selectedMembers[2]} onCheckedChange={() => toggleMember(2)} className="mt-1" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" className="border-slate-600 text-slate-300">
                Find more members
              </Button>
              <div className="text-sm text-slate-300">
                {selectedMembers.filter(Boolean).length} of {selectedMembers.length} members selected
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-50">Set Project Constraints</h2>

            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="budget-slider">Budget</Label>
                  <span className="text-slate-300">€{budget.toLocaleString()}</span>
                </div>
                <Slider
                  id="budget-slider"
                  min={100000}
                  max={5000000}
                  step={100000}
                  value={[budget]}
                  onValueChange={(value) => setBudget(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>€100k</span>
                  <span>€500k</span>
                  <span>€1M</span>
                  <span>€2M</span>
                  <span>€3M</span>
                  <span>€5M</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="area-slider">Available surface area</Label>
                  <span className="text-slate-300">{surfaceArea.toLocaleString()} m²</span>
                </div>
                <Slider
                  id="area-slider"
                  min={500}
                  max={10000}
                  step={100}
                  value={[surfaceArea]}
                  onValueChange={(value) => setSurfaceArea(value[0])}
                  className="py-4"
                />
                <div className="text-xs text-slate-400">For PV panels, equipment, etc.</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="self-sufficiency-slider">Self-sufficiency target</Label>
                  <span className="text-slate-300">{selfSufficiency}%</span>
                </div>
                <Slider
                  id="self-sufficiency-slider"
                  min={30}
                  max={100}
                  step={5}
                  value={[selfSufficiency]}
                  onValueChange={(value) => setSelfSufficiency(value[0])}
                  className="py-4"
                />
                <div className="text-xs text-slate-400">Higher targets may require more investment</div>
              </div>

              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-medium text-slate-50">Additional constraints</h3>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">Maximum payback period</span>
                    <span className="text-sm font-medium text-slate-50">8 years</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">CO₂ reduction target</span>
                    <span className="text-sm font-medium text-slate-50">60%</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">Noise restrictions</span>
                    <span className="text-sm font-medium text-slate-50">Medium</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-50">Finding Optimal Configuration</h2>

            <div className="flex justify-center py-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-slate-700 stroke-current"
                    strokeWidth="10"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-[#10B981] stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - progress / 100)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-50">{progress}%</span>
                </div>
              </div>
            </div>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-slate-50">Analyzing load profiles... complete</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-slate-50">Processing satellite data... complete</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-slate-50">Generating system configurations... complete</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-[#F59E0B] mr-2"></div>
                  <span className="text-sm text-slate-50">Optimizing for constraints... in progress</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-slate-500 mr-2"></div>
                  <span className="text-sm text-slate-400">Calculating economic parameters... pending</span>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-slate-500 mr-2"></div>
                  <span className="text-sm text-slate-400">Preparing visualization... pending</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-slate-300">Estimated time remaining: 1:24</div>

            <Button variant="outline" className="w-full border-slate-600 text-slate-300">
              Cancel
            </Button>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-50">Your Optimal Energy Community Solution</h2>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-slate-50">System type</h3>
                <p className="text-slate-300">Combined Heat & Power (CHP) Trigeneration + PV + Battery Storage</p>

                <h3 className="font-semibold text-slate-50">Total capacity</h3>
                <p className="text-slate-300">450 kW electrical / 520 kW thermal</p>

                <h3 className="font-semibold text-slate-50">Configuration</h3>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>CHP unit: 200 kW electrical / 320 kW thermal</li>
                  <li>PV array: 180 kWp (1,200 m²)</li>
                  <li>Battery storage: 250 kWh</li>
                  <li>Absorption chiller: 200 kW cooling</li>
                </ul>

                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-50">Self-sufficiency</h3>
                    <p className="text-[#10B981] font-medium">78%</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-50">CO₂ reduction</h3>
                    <p className="text-[#10B981] font-medium">62%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="h-64 bg-slate-700 rounded-lg p-4">
              <EnergyFlowDiagram />
            </div>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-slate-50">Investment breakdown</h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">CHP system</span>
                    <span className="text-sm font-medium text-slate-50">€630,000</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">PV system</span>
                    <span className="text-sm font-medium text-slate-50">€234,000</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">Battery storage</span>
                    <span className="text-sm font-medium text-slate-50">€175,000</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">Absorption chiller</span>
                    <span className="text-sm font-medium text-slate-50">€140,000</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">Balance of system</span>
                    <span className="text-sm font-medium text-slate-50">€180,000</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-300">Design and installation</span>
                    <span className="text-sm font-medium text-slate-50">€190,000</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-slate-600">
                    <span className="text-sm font-semibold text-slate-50">Total investment</span>
                    <span className="text-sm font-semibold text-slate-50">€1,549,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-slate-50">Economic comparison</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-2 text-slate-300 font-medium">Metric</th>
                        <th className="text-right py-2 text-[#10B981] font-medium">Community</th>
                        <th className="text-right py-2 text-slate-300 font-medium">Baseline</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-600">
                        <td className="py-2 text-slate-300">Payback Period</td>
                        <td className="py-2 text-right text-slate-50">5.3 years</td>
                        <td className="py-2 text-right text-slate-300">8.7 years</td>
                      </tr>
                      <tr className="border-b border-slate-600">
                        <td className="py-2 text-slate-300">Net Present Value</td>
                        <td className="py-2 text-right text-slate-50">€4,235,000</td>
                        <td className="py-2 text-right text-slate-300">€1,820,000</td>
                      </tr>
                      <tr className="border-b border-slate-600">
                        <td className="py-2 text-slate-300">Internal Rate of Return</td>
                        <td className="py-2 text-right text-slate-50">18.7%</td>
                        <td className="py-2 text-right text-slate-300">9.2%</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-slate-300">Levelized Cost of Energy</td>
                        <td className="py-2 text-right text-slate-50">€0.067/kWh</td>
                        <td className="py-2 text-right text-slate-300">€0.112/kWh</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-50">Download Report</Button>
              <Button className="flex-1 bg-[#10B981] hover:bg-emerald-600 text-white">Proceed to Implementation</Button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      {currentStep < 6 && (
        <div className="mt-auto px-4 pt-4 flex justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            className="border-slate-600 text-slate-300"
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button onClick={handleNext} className="bg-[#10B981] hover:bg-emerald-600 text-white">
            {currentStep === 5 ? "View Results" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
