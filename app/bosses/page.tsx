"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Calendar, Skull } from "lucide-react"

// Mock boss data
const bosses = [
  {
    id: 1,
    name: "Kraken of the Deep",
    location: "North Atlantic",
    respawnTime: "06:00",
   
    rewards: "Kraken Tentacle, Deep Sea Pearls",
  },
  {
    id: 2,
    name: "Captain Blackheart",
    location: "Caribbean Sea",
    respawnTime: "12:00",
    difficulty: "Epic",
    rewards: "Blackheart's Cutlass, Gold Coins",
  },
  {
    id: 3,
    name: "Sea Serpent Leviathan",
    location: "Mediterranean",
    respawnTime: "18:00",
    difficulty: "Legendary",
    rewards: "Serpent Scale Armor, Ancient Scrolls",
  },
  {
    id: 4,
    name: "Ghost Ship Admiral",
    location: "Bermuda Triangle",
    respawnTime: "00:00",
    difficulty: "Mythic",
    rewards: "Spectral Cannon, Phantom Compass",
  },
  {
    id: 5,
    name: "Storm Lord Poseidon",
    location: "Pacific Ocean",
    respawnTime: "15:30",
    difficulty: "Mythic",
    rewards: "Trident of Storms, Lightning Crystals",
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
  { value: "EST", label: "Eastern Time (GMT-5)" },
  { value: "PST", label: "Pacific Time (GMT-8)" },
  { value: "CET", label: "Central European (GMT+1)" },
  { value: "JST", label: "Japan Standard (GMT+9)" },
  { value: "AEST", label: "Australian Eastern (GMT+10)" },
]

export default function BossesPage() {
  const [selectedTimezone, setSelectedTimezone] = useState("UTC")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
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
      case "EST":
        convertedHours = (hours - 5 + 24) % 24
        break
      case "PST":
        convertedHours = (hours - 8 + 24) % 24
        break
      case "CET":
        convertedHours = (hours + 1) % 24
        break
      case "JST":
        convertedHours = (hours + 9) % 24
        break
      case "AEST":
        convertedHours = (hours + 10) % 24
        break
    }

    return `${convertedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
  }

  const getTimeUntilRespawn = (respawnTime: string) => {
    const [hours, minutes] = respawnTime.split(":").map(Number)
    const now = new Date()
    const respawn = new Date()
    respawn.setHours(hours, minutes, 0, 0)

    if (respawn <= now) {
      respawn.setDate(respawn.getDate() + 1)
    }

    const diff = respawn.getTime() - now.getTime()
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60))
    const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hoursLeft}h ${minutesLeft}m`
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
          Current time: {currentTime.toLocaleTimeString()} ({selectedTimezone})
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
                  <span className="text-sm">Respawns at {convertTime(boss.respawnTime)}</span>
                </div>
                <div className="bg-slate-700 rounded-md p-3">
                  <p className="text-xs text-slate-400 mb-1">Time until respawn:</p>
                  <p className="text-lg font-bold text-amber-400">{getTimeUntilRespawn(boss.respawnTime)}</p>
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
      <div>
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
      </div>
    </div>
  )
}
