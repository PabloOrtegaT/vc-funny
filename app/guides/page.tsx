"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, User, Calendar } from "lucide-react"

// Mock guides data
const landGuides = [
  {
    id: 1,
    title: "Complete Beginner's Guide to Land Combat",
    description: "Learn the basics of land-based combat, weapon selection, and tactical positioning for new players.",
    author: "CaptainRedbeard",
    date: "2024-12-15",
    format: "PDF",
    downloads: 1247,
  },
  {
    id: 2,
    title: "Advanced Trading Routes on Land",
    description: "Maximize your profits with these optimized land trading routes and market analysis techniques.",
    author: "MerchantMary",
    date: "2024-12-10",
    format: "PDF",
    downloads: 892,
  },
  {
    id: 3,
    title: "City Conquest Strategies",
    description: "Master the art of city sieges and territorial expansion with proven battle tactics.",
    author: "AdmiralStorm",
    date: "2024-12-05",
    format: "PDF",
    downloads: 634,
  },
  {
    id: 4,
    title: "Resource Management for Land Bases",
    description: "Efficiently manage your land-based resources, buildings, and production chains.",
    author: "BuilderBob",
    date: "2024-11-28",
    format: "PDF",
    downloads: 445,
  },
]

const seaGuides = [
  {
    id: 5,
    title: "Naval Combat Mastery Guide",
    description: "Complete guide to ship-to-ship combat, cannon positioning, and fleet management strategies.",
    author: "SeaWolfSarah",
    date: "2024-12-20",
    format: "PDF",
    downloads: 1856,
  },
  {
    id: 6,
    title: "Ship Building and Customization",
    description: "Learn how to build and customize ships for different purposes: trading, combat, and exploration.",
    author: "ShipwrightSam",
    date: "2024-12-12",
    format: "PDF",
    downloads: 1203,
  },
  {
    id: 7,
    title: "Ocean Trading Routes Map",
    description: "Detailed map of the most profitable sea trading routes with seasonal variations and tips.",
    author: "NavigatorNed",
    date: "2024-12-08",
    format: "Image",
    downloads: 967,
  },
  {
    id: 8,
    title: "Weather and Navigation Guide",
    description: "Master the seas by understanding weather patterns, wind directions, and navigation techniques.",
    author: "WeatherWise",
    date: "2024-11-30",
    format: "PDF",
    downloads: 723,
  },
  {
    id: 9,
    title: "Pirate Hunting Strategies",
    description: "Effective methods for hunting down AI pirates and player pirates for bounties and loot.",
    author: "BountyHunterBill",
    date: "2024-11-25",
    format: "PDF",
    downloads: 589,
  },
]

export default function GuidesPage() {
  const [activeTab, setActiveTab] = useState("land")

  const GuideCard = ({ guide }: { guide: any }) => (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg text-amber-100 mb-2">{guide.title}</CardTitle>
            <p className="text-slate-300 text-sm mb-3">{guide.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{guide.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{guide.date}</span>
              </div>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {guide.format}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">{guide.downloads} downloads</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-amber-100 mb-2">Player Guides</h1>
        <p className="text-slate-300">Comprehensive guides created by the VCFunny community</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800 border border-slate-700">
          <TabsTrigger
            value="land"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300"
          >
            Land Guides
          </TabsTrigger>
          <TabsTrigger
            value="sea"
            className="data-[state=active]:bg-amber-600 data-[state=active]:text-white text-slate-300"
          >
            Sea Guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="land" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {landGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sea" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            {seaGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
