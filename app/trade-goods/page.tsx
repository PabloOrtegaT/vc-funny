"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin } from "lucide-react"

// Mock trade goods data
const tradeGoods = [
  { name: "Almond", price: 25, weight: 3, cities: ["Suez"] },
  { name: "Aloe", price: 30, weight: 5, cities: ["Tourane", "Semarang", "San Diego"] },
  { name: "Amber", price: 100, weight: 7, cities: ["Accra", "Oslo"] },
  { name: "Banana", price: 25, weight: 1, cities: ["Athens"] },
  { name: "Bear Gallbladder", price: 40, weight: 6, cities: ["Hamburg"] },
  { name: "Beef", price: 25, weight: 2, cities: ["Tripoli", "Bordeaux", "London"] },
  { name: "Brandy", price: 80, weight: 4, cities: ["Bordeaux", "Lisbon"] },
  { name: "Cacao", price: 45, weight: 3, cities: ["Veracruz", "Caracas"] },
  { name: "Cinnamon", price: 120, weight: 2, cities: ["Ceylon", "Malacca"] },
  { name: "Coffee", price: 35, weight: 3, cities: ["Mocha", "Java", "Brazil"] },
  { name: "Cotton", price: 20, weight: 4, cities: ["Alexandria", "Charleston"] },
  { name: "Diamonds", price: 500, weight: 1, cities: ["Cape Town", "Antwerp"] },
  { name: "Ebony", price: 90, weight: 8, cities: ["Madagascar", "Ceylon"] },
  { name: "Furs", price: 60, weight: 5, cities: ["Quebec", "St. Petersburg"] },
  { name: "Gold", price: 300, weight: 10, cities: ["Lima", "Macao"] },
  { name: "Ivory", price: 150, weight: 6, cities: ["Luanda", "Zanzibar"] },
  { name: "Jade", price: 200, weight: 4, cities: ["Canton", "Nagasaki"] },
  { name: "Nutmeg", price: 180, weight: 2, cities: ["Banda", "Ternate"] },
  { name: "Opium", price: 250, weight: 3, cities: ["Calcutta", "Canton"] },
  { name: "Pearls", price: 400, weight: 1, cities: ["Bahrain", "Ceylon"] },
  { name: "Pepper", price: 90, weight: 3, cities: ["Calicut", "Malacca"] },
  { name: "Porcelain", price: 110, weight: 5, cities: ["Jingdezhen", "Canton"] },
  { name: "Rum", price: 50, weight: 4, cities: ["Jamaica", "Barbados"] },
  { name: "Silk", price: 160, weight: 2, cities: ["Constantinople", "Venice"] },
  { name: "Silver", price: 200, weight: 8, cities: ["Potosi", "Acapulco"] },
  { name: "Spices", price: 70, weight: 3, cities: ["Goa", "Hormuz"] },
  { name: "Sugar", price: 40, weight: 6, cities: ["Havana", "Recife"] },
  { name: "Tea", price: 55, weight: 2, cities: ["Canton", "Nagasaki"] },
  { name: "Tobacco", price: 30, weight: 4, cities: ["Virginia", "Havana"] },
  { name: "Wine", price: 35, weight: 5, cities: ["Bordeaux", "Porto"] },
]

export default function TradeGoodsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGoods = useMemo(() => {
    if (!searchTerm) return tradeGoods

    const term = searchTerm.toLowerCase()
    return tradeGoods.filter(
      (good) => good.name.toLowerCase().includes(term) || good.cities.some((city) => city.toLowerCase().includes(term)),
    )
  }, [searchTerm])

  // Group goods by first letter
  const groupedGoods = useMemo(() => {
    const groups: { [key: string]: typeof tradeGoods } = {}

    filteredGoods.forEach((good) => {
      const firstLetter = good.name[0].toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(good)
    })

    // Sort each group
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => a.name.localeCompare(b.name))
    })

    return groups
  }, [filteredGoods])

  const getProfitabilityColor = (price: number) => {
    if (price >= 200) return "text-green-400"
    if (price >= 100) return "text-yellow-400"
    if (price >= 50) return "text-orange-400"
    return "text-slate-300"
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-amber-100 mb-2">Trade Goods Directory</h1>
        <p className="text-slate-300">Complete catalog of trading goods and their locations</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search goods or cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-slate-300 placeholder-slate-400"
          />
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-slate-400">
            Found {filteredGoods.length} goods matching "{searchTerm}"
          </p>
        )}
      </div>

      {/* Trade Goods List */}
      <div className="space-y-8">
        {Object.keys(groupedGoods)
          .sort()
          .map((letter) => (
            <div key={letter}>
              <h2 className="text-3xl font-bold text-amber-400 mb-4 border-b border-slate-700 pb-2">{letter}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groupedGoods[letter].map((good, index) => (
                  <Card
                    key={`${good.name}-${index}`}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-amber-100 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          {good.name}
                        </CardTitle>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {good.weight} tons
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Base Price:</span>
                        <span className={`font-bold text-lg ${getProfitabilityColor(good.price)}`}>
                          {good.price} gold
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-400">Available in:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {good.cities.map((city, cityIndex) => (
                            <Badge key={cityIndex} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
                              {city}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-700">
                        <span className="text-xs text-slate-500">
                          Profit/Weight Ratio: {(good.price / good.weight).toFixed(1)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
      </div>

      {filteredGoods.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">No goods found</h3>
          <p className="text-slate-500">Try searching for a different good or city name.</p>
        </div>
      )}
    </div>
  )
}
