"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Calendar, Skull } from "lucide-react"

// Global first appearance time for all bosses
const GLOBAL_FIRST_APPEARANCE = "00:00"

// Mock boss data with respawn intervals (in hours)
const bosses = [
  {
    id: 1,
    name: "Anubis",
    location: "Pyramid top level",
    respawnInterval: 3, // 3 hours
    difficulty: "Common",
    rewards: "...",
  },
  {
    id: 2,
    name: "Lost King",
    location: "Madeira Suburb",
    respawnInterval: 3, // 4 hours
    difficulty: "Epic",
    rewards: "...",
  },
]

// Mock events data
const events = [
  {
    id: 1,
    name: "Treasure Fleet Convoy",
    startTime: "08:00",
    duration: "2 hours",
    description: "Massive treasure convoy crosses the Atlantic",
  },
  {
    id: 2,
    name: "Pirate Festival",
    startTime: "20:00",
    duration: "4 hours",
    description: "Special event with increased loot and XP",
  },
  {
    id: 3,
    name: "Naval Battle Royale",
    startTime: "14:00",
    duration: "1 hour",
    description: "PvP event in the Caribbean waters",
  },
]

const timezones = [
  { value: "UTC", label: "UTC (GMT+0)" },
  { value: "GMT", label: "Greenwich Mean Time (GMT+0)" },
  { value: "EST", label: "Eastern Time (GMT-5)" },
  { value: "EDT", label: "Eastern Daylight Time (GMT-4)" },
  { value: "CST", label: "Central Time (GMT-6)" },
  { value: "CDT", label: "Central Daylight Time (GMT-5)" },
  { value: "MST", label: "Mountain Time (GMT-7)" },
  { value: "MDT", label: "Mountain Daylight Time (GMT-6)" },
  { value: "PST", label: "Pacific Time (GMT-8)" },
  { value: "PDT", label: "Pacific Daylight Time (GMT-7)" },
  { value: "AKST", label: "Alaska Time (GMT-9)" },
  { value: "HST", label: "Hawaii Time (GMT-10)" },
  { value: "CET", label: "Central European (GMT+1)" },
  { value: "CEST", label: "Central European Summer (GMT+2)" },
  { value: "EET", label: "Eastern European (GMT+2)" },
  { value: "EEST", label: "Eastern European Summer (GMT+3)" },
  { value: "GMT+1", label: "London (GMT+1)" },
  { value: "MSK", label: "Moscow Time (GMT+3)" },
  { value: "IST", label: "India Standard Time (GMT+5:30)" },
  { value: "CST-China", label: "China Standard Time (GMT+8)" },
  { value: "SGT", label: "Singapore Time (GMT+8)" },
  { value: "JST", label: "Japan Standard (GMT+9)" },
  { value: "KST", label: "Korea Standard Time (GMT+9)" },
  { value: "AEST", label: "Australian Eastern (GMT+10)" },
  { value: "AEDT", label: "Australian Eastern Daylight (GMT+11)" },
  { value: "ACST", label: "Australian Central (GMT+9:30)" },
  { value: "AWST", label: "Australian Western (GMT+8)" },
  { value: "NZST", label: "New Zealand Standard (GMT+12)" },
  { value: "BRT", label: "Brasilia Time (GMT-3)" },
  { value: "ART", label: "Argentina Time (GMT-3)" },
  { value: "CLT", label: "Chile Time (GMT-4)" },
  { value: "MEX", label: "Mexico City Time (GMT-6)" },
]

export default function BossesPage() {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC")
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const convertTime = (time: string) => {
    // Simple time conversion simulation
    const [hours, minutes] = time.split(":").map(Number)
    let convertedHours = hours

    switch (selectedTimezone) {
      case "UTC":
      case "GMT":
        convertedHours = hours
        break
      case "EST":
        convertedHours = (hours - 5 + 24) % 24
        break
      case "EDT":
        convertedHours = (hours - 4 + 24) % 24
        break
      case "CST":
        convertedHours = (hours - 6 + 24) % 24
        break
      case "CDT":
        convertedHours = (hours - 5 + 24) % 24
        break
      case "MST":
        convertedHours = (hours - 7 + 24) % 24
        break
      case "MDT":
        convertedHours = (hours - 6 + 24) % 24
        break
      case "PST":
        convertedHours = (hours - 8 + 24) % 24
        break
      case "PDT":
        convertedHours = (hours - 7 + 24) % 24
        break
      case "AKST":
        convertedHours = (hours - 9 + 24) % 24
        break
      case "HST":
        convertedHours = (hours - 10 + 24) % 24
        break
      case "CET":
        convertedHours = (hours + 1) % 24
        break
      case "CEST":
        convertedHours = (hours + 2) % 24
        break
      case "EET":
        convertedHours = (hours + 2) % 24
        break
      case "EEST":
        convertedHours = (hours + 3) % 24
        break
      case "GMT+1":
        convertedHours = (hours + 1) % 24
        break
      case "MSK":
        convertedHours = (hours + 3) % 24
        break
      case "IST":
        convertedHours = (hours + 5.5 + 24) % 24
        break
      case "CST-China":
      case "SGT":
      case "AWST":
        convertedHours = (hours + 8) % 24
        break
      case "JST":
      case "KST":
        convertedHours = (hours + 9) % 24
        break
      case "ACST":
        convertedHours = (hours + 9.5 + 24) % 24
        break
      case "AEST":
        convertedHours = (hours + 10) % 24
        break
      case "AEDT":
        convertedHours = (hours + 11) % 24
        break
      case "NZST":
        convertedHours = (hours + 12) % 24
        break
      case "BRT":
      case "ART":
        convertedHours = (hours - 3 + 24) % 24
        break
      case "CLT":
        convertedHours = (hours - 4 + 24) % 24
        break
      case "MEX":
        convertedHours = (hours - 6 + 24) % 24
        break
    }

    // Handle half-hour offsets
    if (selectedTimezone === "IST" || selectedTimezone === "ACST") {
      const convertedMinutes = minutes
      return `${Math.floor(convertedHours).toString().padStart(2, "0")}:${convertedMinutes.toString().padStart(2, "0")}`
    }

    return `${convertedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  const getNextRespawnTime = (firstAppearance: string, respawnInterval: number) => {
    const [hours, minutes] = firstAppearance.split(":").map(Number)
    const now = new Date()
    
    // Start from first appearance today
    let nextRespawn = new Date()
    nextRespawn.setHours(hours, minutes, 0, 0)
    
    // Keep adding the interval until we find a future time
    while (nextRespawn <= now) {
      nextRespawn.setTime(nextRespawn.getTime() + respawnInterval * 60 * 60 * 1000)
    }
    
    return nextRespawn
  }

  const getTimeUntilRespawn = (firstAppearance: string, respawnInterval: number) => {
    if (!mounted) return 'Loading...'
    
    const nextRespawn = getNextRespawnTime(firstAppearance, respawnInterval)
    const now = new Date()
    
    const diff = nextRespawn.getTime() - now.getTime()
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${hoursLeft}h ${minutesLeft}m`
  }

  const getNextRespawnTimeString = (firstAppearance: string, respawnInterval: number) => {
    if (!mounted) return '00:00'
    const nextRespawn = getNextRespawnTime(firstAppearance, respawnInterval)
    const hours = nextRespawn.getHours()
    const minutes = nextRespawn.getMinutes()
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-amber-100 mb-2">Boss Respawn & Events</h1>
        <p className="text-slate-300">Track boss respawn times and upcoming events</p>
      </div>

      {/* Timezone Selector */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <label className="text-slate-300 font-medium">Timezone:</label>
          <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
            <SelectTrigger className="w-64 bg-slate-800 border-slate-700 text-slate-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {timezones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value} className="text-slate-300 focus:bg-slate-700">
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-slate-400">
          Current time: {currentTime ? currentTime.toLocaleTimeString() : 'Loading...'} ({selectedTimezone})
        </p>
      </div>

      {/* Boss Respawns */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-2">
          <Skull className="h-6 w-6" />
          Boss Respawn Times
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bosses.map((boss) => (
            <Card key={boss.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-amber-100">{boss.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{boss.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Respawns every {boss.respawnInterval}h</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Next at {convertTime(getNextRespawnTimeString(GLOBAL_FIRST_APPEARANCE, boss.respawnInterval))}</span>
                </div>
                <div className="bg-slate-700 rounded-md p-3">
                  <p className="text-xs text-slate-400 mb-1">Time until respawn:</p>
                  <p className="text-lg font-bold text-amber-400">{getTimeUntilRespawn(GLOBAL_FIRST_APPEARANCE, boss.respawnInterval)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Rewards:</p>
                  <p className="text-sm text-slate-300">{boss.rewards}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Events */}
      {/* <div>
        <h2 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Scheduled Events
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg text-amber-100">{event.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Starts at {convertTime(event.startTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-sm">Duration: {event.duration}</span>
                </div>
                <p className="text-sm text-slate-300">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  )
}
